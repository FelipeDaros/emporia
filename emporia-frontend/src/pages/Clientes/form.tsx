import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import { IContatos } from "../../interfaces/IContatos";
import { TrashIcon } from "@heroicons/react/24/outline";
import { api } from "../../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import { ICentroDeCusto } from "../../interfaces/ICentroDeCusto";

const schemaCliente = z.object({
  nome: z.string().nonempty('Campo obrigatório'),
  documento: z.string().nonempty('Campo obrigatório'),
  uf: z.string().nonempty('Campo obrigatório'),
  cidade: z.string().nonempty('Campo obrigatório'),
  rua: z.string().nonempty('Campo obrigatório'),
  bairro: z.string().nonempty('Campo obrigatório'),
  numero: z.string().nonempty('Campo obrigatório'),
  observacao: z.string().nonempty('Campo obrigatório'),
  id_centro_de_custo: z.preprocess((val) => Number(val), z.number().min(1, 'Centro de custo obrigatório'))
});

const schemaContato = z.object({
  nome: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  telefone: z.string().optional(),
});

type ClienteSchema = z.infer<typeof schemaCliente>;
type ContatoSchema = z.infer<typeof schemaContato>;

const TABLE_HEAD = ["Nome", "Email", "Telefone", "Ações"];

export function FormClientes() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register: registerCliente,
    handleSubmit: handleSubmitCliente,
    setValue,
    formState: { errors: errorsCliente },
  } = useForm<ClienteSchema>({
    resolver: zodResolver(schemaCliente),
  });

  const {
    register: registerContato,
    handleSubmit: handleSubmitContato,
    reset,
    formState: { errors: errorsContato },
  } = useForm<ContatoSchema>({
    resolver: zodResolver(schemaContato),
  });

  const [contatos, setContatos] = useState<IContatos[]>([]);
  const [centroDeCustos, setCentroDeCustos] = useState<ICentroDeCusto[]>([]);

  const onSubmitCliente: SubmitHandler<ClienteSchema> = async (data) => {
    try {
      const payload = {
        ...data,
        contatos
      }

      state?.id ? await api.put(`/clientes/${state.id}`, payload) : await api.post('/clientes', payload);
    } catch (error) {
      console.log(error)
    }
  };

  const onSubmitContato: SubmitHandler<ContatoSchema> = (data) => {
    // @ts-ignore
    handleAddContato(data);
    reset();
  };

  const handleAddContato = (contato: IContatos) => {
    const contatoExiste = contatos.some(item => item.nome === contato.nome || item.email === contato.email);

    if (contatoExiste) {
      return;
    }

    setContatos((state) => [...state, contato]);
  };

  const handleExcluirContato = (email: string) => {
    const contatosFiltrados = contatos.filter(item => item.email !== email);
    setContatos(contatosFiltrados);
  }

  async function fetchCentroDeCusto() {
    try {
      const { data } = await api.get('/centro-de-custo');
      setCentroDeCustos(data.body);
    } catch (error) {

    }
  }

  async function fetchData() {
    try {
      const { data } = await api.get(`/clientes/${state.id}`);
      Object.keys(schemaCliente.shape).forEach((field) => {
        if (data.body[field] !== undefined) {
          // @ts-ignore
          setValue(field, data.body[field]);
        }
      });
      setContatos(data.body.contatos);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCentroDeCusto();

    if (state?.id) {
      fetchData();
    }
  }, []);

  return (
    <div className="flex-1 justify-center p-4">
      <form onSubmit={handleSubmitCliente(onSubmitCliente)} className="flex flex-col gap-4 w-full max-w-8xl">
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="flex-1">
            <label className="block mb-1">Nome</label>
            <input {...registerCliente("nome")} className="p-2 border border-gray-300 w-full" />
            {errorsCliente.nome && <p className="text-red-500 text-sm">{errorsCliente.nome.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block mb-1">Documento</label>
            <input {...registerCliente("documento")} className="p-2 border border-gray-300 w-full" />
            {errorsCliente.documento && <p className="text-red-500 text-sm">{errorsCliente.documento.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="flex-1">
            <label className="block mb-1">UF</label>
            <input {...registerCliente("uf")} className="p-2 border border-gray-300 w-full" />
            {errorsCliente.uf && <p className="text-red-500 text-sm">{errorsCliente.uf.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block mb-1">Cidade</label>
            <input {...registerCliente("cidade")} className="p-2 border border-gray-300 w-full" />
            {errorsCliente.cidade && <p className="text-red-500 text-sm">{errorsCliente.cidade.message}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="flex-1">
            <label className="block mb-1">Rua</label>
            <input {...registerCliente("rua")} className="p-2 border border-gray-300 w-full" />
            {errorsCliente.rua && <p className="text-red-500 text-sm">{errorsCliente.rua.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block mb-1">Bairro</label>
            <input {...registerCliente("bairro")} className="p-2 border border-gray-300 w-full" />
            {errorsCliente.bairro && <p className="text-red-500 text-sm">{errorsCliente.bairro.message}</p>}
          </div>
          <div className="flex-1">
            <label className="block mb-1">Número</label>
            <input {...registerCliente("numero")} className="p-2 border border-gray-300 w-full" />
            {errorsCliente.numero && <p className="text-red-500 text-sm">{errorsCliente.numero.message}</p>}
          </div>
        </div>
        <div className="flex-1">
          <label className="block mb-1">Observação</label>
          <input {...registerCliente("observacao")} className="p-2 border border-gray-300 w-full" />
          {errorsCliente.observacao && <p className="text-red-500 text-sm">{errorsCliente.observacao.message}</p>}
        </div>
        <div className="flex-1">
          <label className="block mb-1">Centro de custo</label>
          <select {...registerCliente("id_centro_de_custo")} onChange={e => setValue('id_centro_de_custo', Number(e.target.value))} className="p-2 border border-gray-300 w-full">
            <option value="">Selecione um centro de custo</option>
            {centroDeCustos.map((centro) => (
              <option key={centro.id} value={centro.id}>
                {centro.nome}
              </option>
            ))}
          </select>
          {errorsCliente.id_centro_de_custo && <p className="text-red-500 text-sm">{errorsCliente.id_centro_de_custo.message}</p>}
        </div>
      </form>

      <Card className="w-full mt-8">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de contatos
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Abaixo estão cadastrados os contatos do cliente
              </Typography>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmitContato(onSubmitContato)} className="p-4">
          <div className="flex flex-col gap-4">
            <label className="block mb-1">Nome</label>
            <input {...registerContato("nome")} className="p-2 border border-gray-300 w-full" />
            {errorsContato.nome && <p className="text-red-500 text-sm">{errorsContato.nome.message}</p>}

            <label className="block mb-1">Email</label>
            <input {...registerContato("email")} className="p-2 border border-gray-300 w-full" />
            {errorsContato.email && <p className="text-red-500 text-sm">{errorsContato.email.message}</p>}

            <label className="block mb-1">Telefone</label>
            <input {...registerContato("telefone")} className="p-2 border border-gray-300 w-full" />
            {errorsContato.telefone && <p className="text-red-500 text-sm">{errorsContato.telefone.message}</p>}
          </div>

          <div className="mt-8 text-right">
            <Button size="lg" className="p-2 bg-blue-500 text-white cursor-pointer" type="submit">
              Adicionar Contato
            </Button>
          </div>
        </form>
        <table className="min-w-max table-auto text-left mt-8">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contatos.map(({ email, nome, telefone }, index) => {
              const isLast = index === contatos.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={email}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {nome}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {telefone}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      <TrashIcon onClick={() => handleExcluirContato(email)} className="size-6 text-red-400" />
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <div className="flex flex-row gap-3">
        <Button
          size="lg"
          className="p-2 w-3/12 mt-8 bg-blue-500 text-white cursor-pointer"
          type="submit"
          onClick={handleSubmitCliente(onSubmitCliente)}
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
    </div>
  );
}
