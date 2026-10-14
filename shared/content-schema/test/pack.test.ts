import { describe, expect, it } from 'vitest';
import { ExamPack } from '../src/index.js';

const pack = {
  schemaVersion: 1 as const,
  exam: 'psm1' as const,
  version: 1,
  contentHash: 'a'.repeat(64),
  chapters: [{
    id: 'chapter-1', act: 1, exam: 'psm1' as const, title: 'Foundations', order: 0,
    items: [{
      id: 'item-1', kind: 'single' as const,
      stems: { exam: 'Which statement is accurate?' }, options: ['A', 'B'], correct: [0],
      hint: 'Review the Scrum Guide.', explanation: 'The Guide defines the accountabilities.',
      termIds: [], source: { doc: 'ScrumGuide2020' as const },
    }],
  }],
};

describe('ExamPack', () => {
  it('accepts a sourced PSM I chapter with one valid single-choice answer', () => {
    expect(ExamPack.safeParse(pack).success).toBe(true);
  });

  it('rejects missing source, out-of-range answers, and duplicate item IDs', () => {
    expect(ExamPack.safeParse({ ...pack, chapters: [{
      ...pack.chapters[0], items: [{ ...pack.chapters[0].items[0], correct: [4], source: undefined }, pack.chapters[0].items[0]],
    }] }).success).toBe(false);
  });
});
