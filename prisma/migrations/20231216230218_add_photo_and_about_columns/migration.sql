/*
  Warnings:

  - Added the required column `about` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover_photo` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `about` TEXT NOT NULL,
    ADD COLUMN `cover_photo` TEXT NOT NULL,
    ADD COLUMN `photo` TEXT NOT NULL,
    ADD COLUMN `username` VARCHAR(155) NOT NULL;
