import { useNavigate } from "react-router-dom";
import { api } from "../../config/api";

import { useToast } from "../../context/ToastContext";
import { DefaultGrid } from "../../components/Grid";
import axios from "axios";

export function CentroDeCustos() {
  const { addToast } = useToast();
  const navigate = useNavigate();

  async function handleDelete(id: number, fetchData: () => void) {
    try {
      const { data } = await api.delete(`/centro-de-custo//${id}`);
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
        endPoint="/centro-de-custo"
        title="Centro de custos"
        subTitle="Abaixo estão cadastrados os centros de custo da plataforma"
        routeCreated="/centro-de-custos-form"
        onEdit={(id) => navigate('/centro-de-custos-form', {
          state: {
            id
          }
        })}
        onDelete={(id: number, fetchData: () => void) => handleDelete(id, fetchData)}
      />
    </div>
  )
}