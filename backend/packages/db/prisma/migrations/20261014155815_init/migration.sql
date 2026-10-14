-- CreateEnum
CREATE TYPE "RevisionStatus" AS ENUM ('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'RETIRED');

-- CreateEnum
CREATE TYPE "ProgressEventKind" AS ENUM ('ANSWER_GRADED', 'MISSION_COMPLETED', 'GAME_COMPLETED', 'CHEST_CLAIMED');

-- CreateTable
CREATE TABLE "Learner" (
    "id" UUID NOT NULL,
    "authSubject" TEXT,
    "epoch" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Learner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "examId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChapterRevision" (
    "id" UUID NOT NULL,
    "chapterId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "status" "RevisionStatus" NOT NULL DEFAULT 'DRAFT',
    "authorId" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "contentHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "ChapterRevision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamPack" (
    "id" UUID NOT NULL,
    "examId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "contentHash" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgressEvent" (
    "id" UUID NOT NULL,
    "learnerId" UUID NOT NULL,
    "clientEventId" UUID NOT NULL,
    "epoch" INTEGER NOT NULL,
    "serverSequence" BIGINT,
    "kind" "ProgressEventKind" NOT NULL,
    "sessionId" UUID,
    "itemId" TEXT,
    "chapterRevisionId" UUID,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "payload" JSONB NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProgressEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearnerState" (
    "learnerId" UUID NOT NULL,
    "epoch" INTEGER NOT NULL DEFAULT 0,
    "sequence" BIGINT NOT NULL DEFAULT 0,
    "state" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LearnerState_pkey" PRIMARY KEY ("learnerId")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL,
    "actorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Learner_authSubject_key" ON "Learner"("authSubject");

-- CreateIndex
CREATE INDEX "ChapterRevision_chapterId_status_idx" ON "ChapterRevision"("chapterId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ChapterRevision_chapterId_version_key" ON "ChapterRevision"("chapterId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "ExamPack_examId_version_key" ON "ExamPack"("examId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "ExamPack_examId_contentHash_key" ON "ExamPack"("examId", "contentHash");

-- CreateIndex
CREATE INDEX "ProgressEvent_learnerId_epoch_acceptedAt_idx" ON "ProgressEvent"("learnerId", "epoch", "acceptedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressEvent_learnerId_clientEventId_key" ON "ProgressEvent"("learnerId", "clientEventId");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressEvent_learnerId_serverSequence_key" ON "ProgressEvent"("learnerId", "serverSequence");

-- CreateIndex
CREATE INDEX "AuditLog_targetType_targetId_createdAt_idx" ON "AuditLog"("targetType", "targetId", "createdAt");

-- AddForeignKey
ALTER TABLE "ChapterRevision" ADD CONSTRAINT "ChapterRevision_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressEvent" ADD CONSTRAINT "ProgressEvent_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LearnerState" ADD CONSTRAINT "LearnerState_learnerId_fkey" FOREIGN KEY ("learnerId") REFERENCES "Learner"("id") ON DELETE CASCADE ON UPDATE CASCADE;
