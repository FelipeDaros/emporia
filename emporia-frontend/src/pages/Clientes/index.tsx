import { useNavigate } from "react-router-dom";
import { DefaultGrid } from "../../components/Grid";
import { api } from "../../config/api";

export function Clientes() {
  const navigate = useNavigate();

  async function handleDelete(id: number, fetchData: () => void){
    try {
      await api.delete(`/condicao-de-pagamento/${id}`);
      fetchData(); // Chame fetchData após deletar
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center">
      <DefaultGrid
        title="Clientes"
        subTitle="Abaixo estão cadastrados os clientes da plataforma"
        endPoint="/clientes"
        onDelete={(id: number, fetchData: () => void) => handleDelete(id, fetchData)}
        onEdit={(id) => navigate('/clientes-form', {
          state: {
            id
          }
        })}
        routeCreated="/clientes-form"
      />
    </div>
  )
}