-- CreateTable
CREATE TABLE "projeto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "id_job" INTEGER NOT NULL,
    "id_usuario" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projeto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "projeto" ADD CONSTRAINT "projeto_id_job_fkey" FOREIGN KEY ("id_job") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projeto" ADD CONSTRAINT "projeto_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
