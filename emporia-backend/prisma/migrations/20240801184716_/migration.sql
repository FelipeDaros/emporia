/*
  Warnings:

  - You are about to alter the column `codigo` on the `codigos_recuperacao_senha` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "codigos_recuperacao_senha" ALTER COLUMN "codigo" SET DATA TYPE INTEGER;
