import { useNavigate } from "react-router-dom";
import { DefaultGrid } from "../../components/Grid";

export function Jobs(){
  const navigate = useNavigate();

  return (
    <div className="flex justify-center">
      <DefaultGrid
        endPoint="/jobs"
        onDelete={(id: number) => console.log(id)}
        onEdit={(id: number) => navigate('/jobs-form', {
          state: {
            id
          }
        })}
        routeCreated="/jobs-form"
        title="Jobs"
        subTitle="Abaixo estão cadastrados os jobs na plataforma"
      />
    </div>
  )
}