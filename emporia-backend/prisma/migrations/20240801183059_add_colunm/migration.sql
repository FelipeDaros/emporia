-- CreateTable
CREATE TABLE "codigos_recuperacao_senha" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "codigos_recuperacao_senha_pkey" PRIMARY KEY ("id")
);
