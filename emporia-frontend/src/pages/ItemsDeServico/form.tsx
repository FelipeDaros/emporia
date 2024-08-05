import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@material-tailwind/react";
import { api } from "../../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "../../context/ToastContext";
import axios from "axios";

const schemaItemsDeServico = z.object({
  descricao: z.string().nonempty('Campo obrigatório'),
  valor: z.number().min(0, 'Valor deve ser maior ou igual a zero')
});

type ItemsDeServicoSchema = z.infer<typeof schemaItemsDeServico>;

export function FormItemsDeServico() {
  const { addToast } = useToast();
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ItemsDeServicoSchema>({
    resolver: zodResolver(schemaItemsDeServico),
    defaultValues: {
      descricao: '',
      valor: 0,
    }
  });

  const onSubmit: SubmitHandler<ItemsDeServicoSchema> = async (data) => {
    try {
      // Valor should be a number already
      const formattedData = {
        ...data,
        valor: parseFloat(data.valor.toString()) // Ensure valor is a number
      };
      const responseData =  state?.id ?  await api.put(`/items/${state.id}`, formattedData) : await api.post('/items', formattedData);
      addToast(responseData.data.message, 'success');
      navigate(-1);
    } catch (error) {
      if(axios.isAxiosError(error)){
        return addToast(error.response?.data.error, 'error');
      }
    }
  };

  async function fetchData() {
    try {
      const { data } = await api.get(`/items/${state.id}`);
      setValue('descricao', data.body.descricao);
      setValue('valor', parseFloat(data.body.valor)); // Ensure valor is a number
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (state?.id) {
      fetchData();
    }
  }, [state?.id]);

  return (
    <div className="flex-1 justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-8xl">
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="flex-1">
            <label className="block mb-1">Descrição</label>
            <input {...register("descricao")} className="p-2 border border-gray-300 w-full" />
            {errors.descricao && <p className="text-red-500 text-sm">{errors.descricao.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block mb-1">Valor</label>
            <input
              {...register("valor", { valueAsNumber: true })}
              className="p-2 border border-gray-300 w-full"
            />
            {errors.valor && <p className="text-red-500 text-sm">{errors.valor.message}</p>}
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Button
            size="lg"
            className="p-2 w-3/12 mt-8 bg-blue-500 text-white cursor-pointer"
            type="submit"
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