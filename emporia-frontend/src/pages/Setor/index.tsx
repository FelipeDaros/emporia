import { useNavigate } from "react-router-dom";
import { DefaultGrid } from "../../components/Grid";

export function Setores(){
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <DefaultGrid
        endPoint="/setor"
        onDelete={(id: number) => console.log(id)}
        onEdit={(id: number) => navigate('/setores-form', {
          state: {
            id
          }
        })}
        routeCreated="/setores-form"
        title="Setores"
        subTitle="Abaixo estão cadastrados os setores na plataforma"
      />
    </div>
  )
}