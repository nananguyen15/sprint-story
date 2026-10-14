import { describe, expect, it } from 'vitest';
import { gradeItem, type ItemState } from '../src/index';

const item: ItemState = {
  box: 5,
  dueAt: 0,
  stage: 'text',
  right: 2,
  wrong: 1,
  lastSeen: 0,
};

describe('gradeItem', () => {
  it('advances an easy answer by two boxes, capped at six, and promotes one stage', () => {
    expect(gradeItem(item, 2, 100)).toEqual({
      ...item,
      box: 6,
      dueAt: 100 + 90 * 86_400_000,
      stage: 'exam',
      right: 3,
      lastSeen: 100,
    });
  });

  it('resets a miss to box zero without demoting the exam stage', () => {
    expect(gradeItem({ ...item, stage: 'exam' }, 0, 200)).toMatchObject({
      box: 0,
      dueAt: 200 + 10 * 60_000,
      stage: 'exam',
      right: 2,
      wrong: 2,
      lastSeen: 200,
    });
  });
});
