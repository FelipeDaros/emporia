/*
  Warnings:

  - Added the required column `id_usuario` to the `codigos_recuperacao_senha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "codigos_recuperacao_senha" ADD COLUMN     "id_usuario" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "codigos_recuperacao_senha" ADD CONSTRAINT "codigos_recuperacao_senha_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
