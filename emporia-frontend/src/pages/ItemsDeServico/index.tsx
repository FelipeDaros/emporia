import { useNavigate } from "react-router-dom";
import { DefaultGrid } from "../../components/Grid";

export function ItemsDeServico() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <DefaultGrid
        endPoint="/items"
        onDelete={(id: number) => console.log(id)}
        onEdit={(id: number) => navigate('/items-de-servico-form', {
          state: {
            id
          }
        })}
        routeCreated="/items-de-servico-form"
        title="Items de serviço"
        subTitle="Abaixo estão cadastrados os items de serviço na plataforma"
      />
    </div>
  )
}