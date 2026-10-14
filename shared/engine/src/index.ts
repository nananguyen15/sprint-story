export type Stage = 'story' | 'text' | 'exam';
export type SelfGrade = 0 | 1 | 2;

export interface ItemState {
  box: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  dueAt: number;
  stage: Stage;
  right: number;
  wrong: number;
  lastSeen: number;
}

const MINUTE = 60_000;
const DAY = 86_400_000;
const INTERVALS = [10 * MINUTE, DAY, 3 * DAY, 7 * DAY, 16 * DAY, 35 * DAY, 90 * DAY] as const;
const NEXT_STAGE: Record<Stage, Stage> = { story: 'text', text: 'exam', exam: 'exam' };

export function gradeItem(state: ItemState, grade: SelfGrade, now: number): ItemState {
  const box = grade === 0 ? 0 : Math.min(6, state.box + grade) as ItemState['box'];
  return {
    ...state,
    box,
    dueAt: now + INTERVALS[box],
    stage: grade === 0 ? state.stage : NEXT_STAGE[state.stage],
    right: state.right + Number(grade > 0),
    wrong: state.wrong + Number(grade === 0),
    lastSeen: now,
  };
}
