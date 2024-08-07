import { useNavigate } from "react-router-dom";
import { DefaultGrid } from "../../components/Grid";

export function Projetos(){
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <DefaultGrid
        endPoint="/projeto"
        onDelete={(id: number) => console.log(id)}
        onEdit={(id: number) => navigate('/projetos-form', {
          state: {
            id
          }
        })}
        routeCreated="/projetos-form"
        title="Projetos"
        subTitle="Abaixo estão cadastrados os projetos na plataforma"
      />
    </div>
  )
}