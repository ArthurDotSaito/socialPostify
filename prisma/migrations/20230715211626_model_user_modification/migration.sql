/*
  Warnings:

  - The primary key for the `publications` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "publications" DROP CONSTRAINT "publications_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "publications_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "publications_id_seq";
