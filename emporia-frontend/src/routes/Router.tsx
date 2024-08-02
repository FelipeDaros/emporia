import { BrowserRouter } from "react-router-dom";
import { RoutesAuth } from "./RoutesAuth";
import { useAuth } from "../context/AuthContext";
import { RoutesNoAuth } from "./RoutesNoAuth";

export function Router() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      {!user ? <RoutesNoAuth /> : <RoutesAuth />}
    </BrowserRouter>
  )
}