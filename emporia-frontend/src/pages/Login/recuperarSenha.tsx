import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "../../config/api";
import { useState } from "react";
import { ButtonDefault } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string({
    required_error: 'Campo obrigatório'
  }).nonempty('Campo obrigatório'),
});

type Schema = z.infer<typeof schema>;

export function RecuperarSenha() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    try {
      setLoading(true);
      api.post('/usuarios/gerar-codigo-recuperar-senha', data);
      setTimeout(() => {
        navigate('/');
      }, 2000)
    } catch (error) {
      
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full items-center">
        <div className="w-4/5 sm:w-1/3 mb-10">
          <label className="block mb-2 text-center text-xl">Para recuperar a senha de acesso, informe seu email de acesso para receber as instruções.</label>
          <input
            {...register("email")}
            className="p-2 border border-gray-300 w-full mt-2"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <ButtonDefault size="lg" loading={loading} type="submit" className="p-2 w-4/5 sm:w-1/3 bg-blue-500 text-white cursor-pointer">
          Recuperar senha
        </ButtonDefault>
      </form>
    </div>
  );
}