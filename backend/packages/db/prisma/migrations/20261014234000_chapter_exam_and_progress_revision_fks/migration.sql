ALTER TABLE "Chapter"
    ADD CONSTRAINT "Chapter_examId_fkey"
    FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "ProgressEvent"
    ADD CONSTRAINT "ProgressEvent_chapterRevisionId_fkey"
    FOREIGN KEY ("chapterRevisionId") REFERENCES "ChapterRevision"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
