import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input } from "@material-tailwind/react";
import { api } from "../../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ButtonDefault } from "../../components/Button";
import { useToast } from "../../context/ToastContext";
import axios from "axios";

const schemaJobs = z.object({
  nome: z.string().max(60, 'Tamanho máximo de caracteres é de 60').nonempty('Campo obrigatório'),
  status: z.string().default('ATIVO'), // Adiciona o campo status com valor padrão
});

type schema = z.infer<typeof schemaJobs>;

export function FormSetores() {
  const { addToast } = useToast();
  const { state } = useLocation();

  const navigate = useNavigate();
  const {
    register: registerCliente,
    handleSubmit: handleSubmitCentroDeCustos,
    setValue,
    formState: { errors: errorsCliente },
  } = useForm<schema>({
    resolver: zodResolver(schemaJobs),
    defaultValues: {
      status: 'ATIVO', // Define o valor padrão para status
    },
  });

  const onSubmitCliente: SubmitHandler<schema> = async (data) => {
    try {
      const responseData = state?.id ? await api.put(`/setor/${state.id}`, data) : await api.post('/setor', data);
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
      const { data } = await api.get(`/setor/${state.id}`);
      setValue('nome', data.body.nome);
      setValue('status', data.body.status); // Define o valor de status caso exista, senão usa o padrão
    } catch (error) {
      // Handle error
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
            {/* <label className="block mb-1">Nome</label> */}
            <Input crossOrigin={undefined} label="Nome" placeholder="Nome" {...registerCliente("nome")} className="p-2 border border-gray-300 w-full" />
            {errorsCliente.nome && <p className="text-red-500 text-sm">{errorsCliente.nome.message}</p>}
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
          <ButtonDefault
            size="lg"
            className="p-2 w-3/12 mt-8 bg-red-500 text-white cursor-pointer"
            onClick={() => navigate(-1)}
          >
            Voltar
          </ButtonDefault>
        </div>
      </form>
    </div>
  );
}
