/*
  Warnings:

  - You are about to drop the `Squad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SquadIntegrantes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SquadIntegrantes" DROP CONSTRAINT "SquadIntegrantes_id_squad_fkey";

-- DropForeignKey
ALTER TABLE "SquadIntegrantes" DROP CONSTRAINT "SquadIntegrantes_id_usuario_fkey";

-- DropTable
DROP TABLE "Squad";

-- DropTable
DROP TABLE "SquadIntegrantes";

-- CreateTable
CREATE TABLE "squad" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "status" "Status" DEFAULT 'ATIVO',

    CONSTRAINT "squad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "squad_integrantes" (
    "id" SERIAL NOT NULL,
    "id_squad" INTEGER NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "squad_integrantes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "squad_integrantes_id_squad_id_usuario_idx" ON "squad_integrantes"("id_squad", "id_usuario");

-- AddForeignKey
ALTER TABLE "squad_integrantes" ADD CONSTRAINT "squad_integrantes_id_squad_fkey" FOREIGN KEY ("id_squad") REFERENCES "squad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "squad_integrantes" ADD CONSTRAINT "squad_integrantes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
