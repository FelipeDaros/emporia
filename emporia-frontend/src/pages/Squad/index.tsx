import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";

import { DefaultGrid } from "../../components/Grid";

export function Squad() {
  const navigate = useNavigate();

  async function handleDelete(id: number) {
    try {
      await api.delete(`/centro-de-custo/${id}`);
    } catch (error) {

    }
  }

  return (
    <div className="flex justify-center">
      <DefaultGrid 
        title="Squad"
        subTitle="Abaixo estão cadastrados os squads na plataforma"
        endPoint="/squad"
        onDelete={() => {}}
        onEdit={(id: number) => navigate('/squad-form', {
          state: {
            id
          }
        })}
        routeCreated="/squad-form"
      />
    </div>
  )
}