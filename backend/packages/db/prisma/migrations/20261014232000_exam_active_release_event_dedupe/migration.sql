CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "currentPackId" UUID,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Exam_currentPackId_key" ON "Exam"("currentPackId");

ALTER TABLE "ExamPack"
    ADD CONSTRAINT "ExamPack_examId_fkey"
    FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Exam" ADD CONSTRAINT "Exam_currentPackId_fkey"
    FOREIGN KEY ("currentPackId") REFERENCES "ExamPack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ProgressEvent" ADD COLUMN "dedupeKey" TEXT;

CREATE UNIQUE INDEX "ProgressEvent_learnerId_epoch_dedupeKey_key"
    ON "ProgressEvent"("learnerId", "epoch", "dedupeKey");
