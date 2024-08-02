import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { api } from "../../config/api";
import { useParams } from "react-router-dom";
import { ButtonDefault } from "../../components/Button";

const schema = z.object({
  senha: z.string({
    required_error: 'Campo obrigatório'
  }).nonempty('Campo obrigatório').min(8, 'A senha deve ter pelo menos 8 caracteres'),
  confirmarSenha: z.string({
    required_error: 'Campo obrigatório'
  }).nonempty('Campo obrigatório')
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas devem coincidir",
  path: ["confirmarSenha"]
});

type Schema = z.infer<typeof schema>;

export function NovaSenha() {
  const { codigo } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const [disabled, setDisabled] = useState(true);

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  async function fetchCodigo(){
    try {
      await api.get(`/usuarios/verificar-codigo-recuperacao-senha/${codigo}`);
      setDisabled(false);
    } catch (error) {
      setDisabled(true);
    }
  }

  useEffect(() => {
    fetchCodigo()
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center">
        <div className="w-4/5 sm:w-1/3 mb-10">
          <label className="block mb-2 text-center text-xl">Nova senha</label>
          <input
            {...register("senha")}
            type="password"
            className="p-2 border border-gray-300 w-full mt-2"
          />
          {errors.senha && (
            <p className="text-red-500 mt-1">{errors.senha.message}</p>
          )}
        </div>
        <div className="w-4/5 sm:w-1/3 mb-10">
          <label className="block mb-2 text-center text-xl">Confirmar nova senha</label>
          <input
            {...register("confirmarSenha")}
            type="password"
            className="p-2 border border-gray-300 w-full mt-2"
          />
          {errors.confirmarSenha && (
            <p className="text-red-500 mt-1">{errors.confirmarSenha.message}</p>
          )}
        </div>
        <ButtonDefault disabled={disabled} type="submit" className="p-2 w-4/5 sm:w-1/3 bg-blue-500 text-white cursor-pointer">
          Alterar
        </ButtonDefault>
      </form>
    </div>
  );
}