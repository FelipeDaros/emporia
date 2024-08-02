import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"

const schema = z.object({
  usuario: z.string(),
  senha: z.string(),
})

type Schema = z.infer<typeof schema>

export function Login() {
  const { signIn } = useAuth();
  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async ({ senha, usuario }: Schema) => {
    try {
      await signIn(usuario, senha);
    } catch (error) {

    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center flex-col">
        <div className="flex flex-col sm:flex-row w-4/5 sm:w-1/5 items-center justify-between mb-10">
          <label className="w-full sm:w-auto">Usuário</label>
          <input {...register("usuario")} className="p-2 border border-gray-300 w-full sm:w-auto mt-2 sm:mt-0" />
        </div>
        <div className="flex flex-col sm:flex-row w-4/5 sm:w-1/5 items-center justify-between mb-10">
          <label className="w-full sm:w-auto">Senha</label>
          <input {...register("senha")} type="password" className="p-2 border border-gray-300 w-full sm:w-auto mt-2 sm:mt-0" />
        </div>
        <Link to="/recuperar-senha" className="text-black mb-10">Esqueceu a senha ?</Link>
        <button type="submit" className="p-2 w-4/5 sm:w-1/6 bg-blue-500 text-white cursor-pointer">Entrar</button>
      </form>
    </div>
  )
}
