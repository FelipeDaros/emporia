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
import { Squad } from "../pages/Squad";
import { FormSquad } from "../pages/Squad/form";
import { Projetos } from "../pages/Projetos";
import { FormProjeto } from "../pages/Projetos/form";
import { Usuarios } from "../pages/Usuarios";
import { FormUsuarios } from "../pages/Usuarios/form.";
import { Setores } from "../pages/Setor";
import { FormSetores } from "../pages/Setor/form";

export function RoutesAuth() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<FormJob />} />
        <Route path="/usuarios" element={<Usuarios />}/>
        <Route path="/usuarios-form" element={<FormUsuarios />}/>
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
        <Route path="/squad" element={<Squad />}/>
        <Route path="/squad-form" element={<FormSquad />}/>
        <Route path="/projetos" element={<Projetos />}/>
        <Route path="/projetos-form" element={<FormProjeto />}/>
        <Route path="/setores" element={<Setores />}/>
        <Route path="/setores-form" element={<FormSetores />}/>
      </Route>
    </Routes>
  )
}
