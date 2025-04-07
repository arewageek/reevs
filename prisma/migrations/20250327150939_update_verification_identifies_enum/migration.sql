/*
  Warnings:

  - Made the column `identifier` on table `VerificationRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VerificationRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "VerificationRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_VerificationRequest" ("createdAt", "expires", "id", "identifier", "token", "updatedAt", "userId") SELECT "createdAt", "expires", "id", "identifier", "token", "updatedAt", "userId" FROM "VerificationRequest";
DROP TABLE "VerificationRequest";
ALTER TABLE "new_VerificationRequest" RENAME TO "VerificationRequest";
CREATE UNIQUE INDEX "VerificationRequest_token_key" ON "VerificationRequest"("token");
CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON "VerificationRequest"("identifier", "token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
