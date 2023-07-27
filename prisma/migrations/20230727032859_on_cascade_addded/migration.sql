-- DropForeignKey
ALTER TABLE "publications" DROP CONSTRAINT "publications_userId_fkey";

-- AddForeignKey
ALTER TABLE "publications" ADD CONSTRAINT "publications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
