import { z } from 'zod';

export const ExamId = z.enum(['psm1', 'pspo1', 'psm2', 'pspo2']);
export const Stage = z.enum(['story', 'text', 'exam']);

const SourceRef = z.object({
  doc: z.enum(['ScrumGuide2020', 'NexusGuide', 'EBMGuide', 'KanbanGuide', 'ScrumPass']),
  note: z.string().max(500).optional(),
});

const Item = z.object({
  id: z.string().min(1),
  kind: z.enum(['single', 'multi', 'tf', 'recall']),
  stems: z.object({ story: z.string().optional(), text: z.string().optional(), exam: z.string().min(1) }),
  options: z.array(z.string()).optional(),
  correct: z.array(z.number().int().nonnegative()).min(1),
  hint: z.string().min(1),
  explanation: z.string().min(1),
  termIds: z.array(z.string()),
  source: SourceRef,
});

const Chapter = z.object({
  id: z.string().min(1),
  act: z.number().int().min(1).max(4),
  exam: ExamId,
  title: z.string().min(1),
  order: z.number().int().nonnegative(),
  items: z.array(Item),
});

export const ExamPack = z.object({
  schemaVersion: z.literal(1),
  exam: ExamId,
  version: z.number().int().positive(),
  contentHash: z.string().regex(/^[a-f0-9]{64}$/i),
  chapters: z.array(Chapter).min(1),
}).superRefine((pack, ctx) => {
  const chapterIds = new Set<string>();
  const itemIds = new Set<string>();
  for (const chapter of pack.chapters) {
    if (chapter.exam !== pack.exam) ctx.addIssue({ code: 'custom', path: ['chapters', chapter.id, 'exam'], message: 'Chapter exam must match its pack.' });
    if (chapterIds.has(chapter.id)) ctx.addIssue({ code: 'custom', path: ['chapters', chapter.id], message: 'Chapter IDs must be unique within a pack.' });
    chapterIds.add(chapter.id);
    for (const item of chapter.items) {
      if (itemIds.has(item.id)) ctx.addIssue({ code: 'custom', path: ['chapters', chapter.id, 'items', item.id], message: 'Item IDs must be unique within an exam pack.' });
      itemIds.add(item.id);
      if (item.kind === 'single' && item.correct.length !== 1) ctx.addIssue({ code: 'custom', path: ['chapters', chapter.id, 'items', item.id, 'correct'], message: 'Single choice items require exactly one answer.' });
      if (item.kind === 'multi' && item.correct.length < 2) ctx.addIssue({ code: 'custom', path: ['chapters', chapter.id, 'items', item.id, 'correct'], message: 'Multi-select items require at least two answers.' });
      if (item.kind !== 'recall' && !item.options?.length) ctx.addIssue({ code: 'custom', path: ['chapters', chapter.id, 'items', item.id, 'options'], message: 'Choice questions require answer options.' });
      if (item.options && item.correct.some((index) => index >= item.options!.length)) ctx.addIssue({ code: 'custom', path: ['chapters', chapter.id, 'items', item.id, 'correct'], message: 'Correct answer index must refer to an existing option.' });
    }
  }
});

export type ExamPack = z.infer<typeof ExamPack>;
