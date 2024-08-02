import { useNavigate } from "react-router-dom";
import { DefaultGrid } from "../../components/Grid";
import { api } from "../../config/api";

export function CondicaoDePagamento() {
  const navigate = useNavigate();

  async function handleDelete(id: number, fetchData: () => void) {
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
        endPoint="/condicao-de-pagamento"
        onDelete={(id: number, fetchData: () => void) => handleDelete(id, fetchData)}
        onEdit={(id: number) => navigate('/condicao-de-pagamento-form', {
          state: {
            id
          }
        })}
        routeCreated="/condicao-de-pagamento-form"
        title="Condições"
        subTitle="Abaixo estão cadastrados as condições de pagamentos na plataforma"
      />
    </div>
  );
}
