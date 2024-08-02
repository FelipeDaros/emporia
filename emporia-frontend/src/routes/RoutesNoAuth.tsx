import { Navigate, Route, Routes } from "react-router-dom";
import { RecuperarSenha } from "../pages/Login/recuperarSenha";
import { NovaSenha } from "../pages/Login/novaSenha";
import { Login } from "../pages/Login";

export function RoutesNoAuth() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/nova-senha/:codigo" element={<NovaSenha />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}