-- CreateTable
CREATE TABLE "Squad" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "logo" TEXT NOT NULL,

    CONSTRAINT "Squad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SquadIntegrantes" (
    "id" SERIAL NOT NULL,
    "id_squad" INTEGER NOT NULL,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "SquadIntegrantes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SquadIntegrantes" ADD CONSTRAINT "SquadIntegrantes_id_squad_fkey" FOREIGN KEY ("id_squad") REFERENCES "Squad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SquadIntegrantes" ADD CONSTRAINT "SquadIntegrantes_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
