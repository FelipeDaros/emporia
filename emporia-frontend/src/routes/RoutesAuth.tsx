import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../layout/DefaultLayout";
import { FormJob } from "../pages/Jobs/form";
import { Clientes } from "../pages/Clientes";
import { FormClientes } from "../pages/Clientes/form";
import { CentroDeCustos } from "../pages/CentroDeCustos";
import { FormCentroDeCustos } from "../pages/CentroDeCustos/form";
import { ItemsDeServico } from "../pages/ItemsDeServico";
import { FormItemsDeServico } from "../pages/ItemsDeServico/form";
import { Jobs } from "../pages/Jobs";
import { CondicaoDePagamento } from "../pages/CondicaoDePagamento";
import { FormCondicaoDePagamento } from "../pages/CondicaoDePagamento/form";

export function RoutesAuth() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<FormJob />} />
        <Route path="/clientes" element={<Clientes />}/>
        <Route path="/clientes-form" element={<FormClientes />}/>
        <Route path="/centro-de-custos" element={<CentroDeCustos />}/>
        <Route path="/centro-de-custos-form" element={<FormCentroDeCustos />}/>
        <Route path="/items-de-servico" element={<ItemsDeServico />}/>
        <Route path="/items-de-servico-form" element={<FormItemsDeServico />}/>
        <Route path="/jobs" element={<Jobs />}/>
        <Route path="/jobs-form" element={<FormJob />}/>
        <Route path="/condicao-de-pagamento" element={<CondicaoDePagamento />}/>
        <Route path="/condicao-de-pagamento-form" element={<FormCondicaoDePagamento />}/>
      </Route>
    </Routes>
  )
}
