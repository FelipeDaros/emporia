import React, { createContext, useContext, useEffect, useState } from "react"
import { api } from "../config/api";
import { DefaultLoading } from "../components/Loading";

type AuthContextDataProps = {
  user: any;
  loading: boolean;
  signIn(nome: string, senha: string): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

type AuthContextProviderProps = {
  children: React.ReactNode // Modifique a tipagem para aceitar qualquer nó React
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      setLoading(true)
      const storagedUser = localStorage.getItem("@EMPORIA:user")

      if (storagedUser) {
        const userParsed = JSON.parse(storagedUser);

        api.defaults.headers["Authorization"] = `Bearer ${userParsed.access_token}`;
        setUser(userParsed)
      }
    }

    loadStoragedData().finally(() => {
      setLoading(false);
    })
  }, [])

  async function signOut() {
    localStorage.clear()
    setUser(null);
    window.location.reload();
  }

  async function signIn(usuario: string, senha: string) {
    try {
      const { data } = await api.post("/auth", {
        usuario,
        senha,
      });

      api.defaults.headers["Authorization"] = `Bearer ${data.access_token}`;

      if (data) {
        const user = {
          ...data,
          foto: null
        };
        
        localStorage.setItem("@EMPORIA:user", JSON.stringify(user));
        setUser(data);
      }

      return;
    } catch (error) {
      throw error;
    }
  }

  if (loading) return <DefaultLoading />

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { useAuth, AuthContextProvider }
