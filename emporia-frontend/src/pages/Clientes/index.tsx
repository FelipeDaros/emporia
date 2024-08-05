import { useNavigate } from "react-router-dom";
import { DefaultGrid } from "../../components/Grid";
import { api } from "../../config/api";
import { useToast } from "../../context/ToastContext";
import axios from "axios";

export function Clientes() {
  const { addToast } = useToast();
  const navigate = useNavigate();

  async function handleDelete(id: number, fetchData: () => void) {
    try {
      const { data } = await api.delete(`/clientes/${id}`);
      addToast(data.message, 'success');
      fetchData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        addToast(error?.response?.data.message, 'error');
      }
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