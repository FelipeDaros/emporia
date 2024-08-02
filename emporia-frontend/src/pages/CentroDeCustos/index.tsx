import { Button, Card, CardHeader, Typography } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICentroDeCusto } from "../../interfaces/ICentroDeCusto";
import { api } from "../../config/api";

import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

const TABLE_HEAD = ["ID", "Nome", "Status", "Ações"];


export function CentroDeCustos() {
  const navigate = useNavigate();
  const [centroDeCustos, setCentroDeCustos] = useState<ICentroDeCusto[]>([]);

  async function fetchData() {
    try {
      const { data } = await api.get('/centro-de-custo');
      setCentroDeCustos(data.body)
    } catch (error) {

    }
  }

  async function handleDelete(id: number) {
    try {
      await api.delete(`/centro-de-custo/${id}`);
      await fetchData()
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center">
      <Card className="h-full w-full overflow-scroll">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Lista de centro de custos
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Abaixo estão cadastrados os centros de custos na plataforma
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="sm" onClick={() => navigate('/centro-de-custos-form')}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Cadastrar
              </Button>
            </div>
          </div>
        </CardHeader>
        <table className="w-full min-w-max table-auto text-left">
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
            {centroDeCustos.map(({ id, nome, descricao, status }, index) => {
              const isLast = index === centroDeCustos.length - 1;
              const classes = isLast ? "p-4" : "p-2 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {id}
                    </Typography>
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
                      {status}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-row">
                      <PencilIcon onClick={() => navigate('/centro-de-custos-form', {
                        state: {
                          id
                        }
                      })} className="size-6 text-black hover:cursor-pointer" />
                      <TrashIcon onClick={() => handleDelete(id)} className="size-6 text-red-400 hover:cursor-pointer" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}