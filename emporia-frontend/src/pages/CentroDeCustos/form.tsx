import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@material-tailwind/react";
import { api } from "../../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useToast } from "../../context/ToastContext";

const schemaCentroDeCustos = z.object({
  nome: z.string().nonempty('Campo obrigatório'),
  descricao: z.string().nonempty('Campo obrigatório'),
});

type CentroDeCustoSchema = z.infer<typeof schemaCentroDeCustos>;

export function FormCentroDeCustos() {
  const { addToast } = useToast();
  const { state } = useLocation();

  const navigate = useNavigate();
  const {
    register: registerCliente,
    handleSubmit: handleSubmitCentroDeCustos,
    setValue,
    formState: { errors: errorsCliente },
  } = useForm<CentroDeCustoSchema>({
    resolver: zodResolver(schemaCentroDeCustos),
  });

  const onSubmitCliente: SubmitHandler<CentroDeCustoSchema> = async (data) => {
    try {
      const responseData = state?.id ? await api.put(`/centro-de-custo/${state.id}`, data) : await api.post('/centro-de-custo', data);
      addToast(responseData.data.message, 'success');
      navigate(-1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return addToast(error.response?.data.error, 'error');
      }
    }
  };

  async function fetchData() {
    try {
      const { data } = await api.get(`/centro-de-custo/${state.id}`);
      setValue('nome', data.body.nome)
      setValue('descricao', data.body.descricao)
    } catch (error) {

    }
  }

  useEffect(() => {
    if (state?.id) {
      fetchData();
    }
  }, []);

  return (
    <div className="flex-1 justify-center p-4">
      <form onSubmit={handleSubmitCentroDeCustos(onSubmitCliente)} className="flex flex-col gap-4 w-full max-w-8xl">
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="flex-1">
            <label className="block mb-1">Nome</label>
            <input {...registerCliente("nome")} className="p-2 border border-gray-300 w-full" />
            {errorsCliente.nome && <p className="text-red-500 text-sm">{errorsCliente.nome.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block mb-1">Descrição</label>
            <input {...registerCliente("descricao")} className="p-2 border border-gray-300 w-full" />
            {errorsCliente.descricao && <p className="text-red-500 text-sm">{errorsCliente.descricao.message}</p>}
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Button
            size="lg"
            className="p-2 w-3/12 mt-8 bg-blue-500 text-white cursor-pointer"
            type="submit"
            onClick={handleSubmitCentroDeCustos(onSubmitCliente)}
          >
            Enviar
          </Button>
          <Button
            size="lg"
            className="p-2 w-3/12 mt-8 bg-red-500 text-white cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </div>
      </form>
    </div>
  );
}
