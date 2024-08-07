import { useNavigate } from "react-router-dom";
import { DefaultGrid } from "../../components/Grid";

export function Usuarios(){
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <DefaultGrid
        endPoint="/usuarios"
        onDelete={(id: number) => console.log(id)}
        onEdit={(id: number) => navigate('/usuarios-form', {
          state: {
            id
          }
        })}
        routeCreated="/usuarios-form"
        title="Usuários"
        subTitle="Abaixo estão cadastrados os usuários na plataforma"
      />
    </div>
  )
}