import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Card, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { api } from "../../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ISquadIntegrantes } from "../../interfaces/ISquadIntegrantes";

const schemaSquad = z.object({
  nome: z.string().nonempty('Campo obrigatório'),
});

type SquadSchema = z.infer<typeof schemaSquad>;

const TABLE_HEAD = ["", "Nome", "Email", "Ações"];

export function FormSquad() {
  const { state } = useLocation();
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [usuariosSelecionados, setUsuariosSelecionados] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SquadSchema>({
    resolver: zodResolver(schemaSquad),
  });

  const onSubmit: SubmitHandler<SquadSchema> = async (data) => {
    const formData = new FormData();
    formData.append("nome", data.nome);

    if (selectedImage) {
      formData.append("foto", selectedImage);
    }

    formData.append("ids_usuarios", JSON.stringify(usuariosSelecionados));

    try {
      if (state?.id) {
        await api.put(`/squad/${state.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await api.post('/squad', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchData() {
    try {
      const { data } = await api.get(`/squad/${state.id}`);
      setValue('nome', data.body.nome);
      setImageURL(data.body.logo);
      setUsuariosSelecionados(data.body.squadIntegrantes.map((item: ISquadIntegrantes) => item.id_usuario));
    } catch (error) {
      console.log(error);
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImageURL(URL.createObjectURL(file));
    }
  }

  function handleSelect(id: string) {
    setUsuariosSelecionados((prev) => {
      if (prev.includes(id)) {
        return prev.filter((userId) => userId !== id);
      } else {
        return [...prev, id];
      }
    });
  }
  
  async function fetchUsuarios() {
    try {
      const { data } = await api.get('/usuarios');
      setUsuarios(data.body);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (state?.id) {
      fetchData();
    }
    fetchUsuarios();
  }, [state?.id]);

  return (
    <div className="flex-1 justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-8xl">
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="flex-1">
            <label className="block mb-1">Nome</label>
            <input {...register("nome")} className="p-2 border border-gray-300 w-full" />
            {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
          <div className="flex-1">
            <label className="block mb-1">Foto</label>
            <input type="file" onChange={handleFileChange} className="p-2 border border-gray-300 w-full" />
            {imageURL && (
              <div className="mt-2">
                <img src={imageURL} alt="Pré-visualização" className="h-48 w-48 object-cover" />
              </div>
            )}
          </div>
        </div>
        <Card className="w-full mt-8">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Lista de usuários
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Abaixo estão cadastrados os usuários
                </Typography>
              </div>
            </div>
          </CardHeader>
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
              {usuarios.map(({ id, email, nome }, index) => {
                const isLast = index === usuarios.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <IconButton className="bg-white" onClick={() => handleSelect(id)}>
                        {usuariosSelecionados.includes(id) ? (
                          <CheckIcon className="h-6 w-6 text-green-500" />
                        ) : (
                          <CheckIcon className="h-6 w-6 text-gray-500" />
                        )}
                      </IconButton>
                    </td>
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
