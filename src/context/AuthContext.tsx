import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../api";

export type User = {
  id: number;
  nome: string;
  email: string;
  admin: boolean;
  ra?: string;
  turma?: string;
  curso?: string;
}

type AuthContextData = {
  signed: boolean;
  user: User | null;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

type AuthProvider = {
  children: ReactNode;
}

type AuthResponse = {
  usuario: {
    id: number;
    nome: string;
    email: string;
    admin: boolean;
    ra?: string;
    turma?: string;
    curso?: string;
  },
  token: string;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider(props: AuthProvider) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const toast = useToast();

  async function signIn(email: string, senha: string) {
    await api.post<AuthResponse>('/usuarios/login', {
      email,
      senha
    })
    .then((res) => {
      const { usuario, token } = res.data;

      localStorage.setItem('@bibliotecaonline:token', token);

      api.defaults.headers.common.authorization = `Bearer ${token}`;

      setUser(usuario);

      router.push('/home');
    })
    .catch(() => {
      toast({
        position: 'top-right',
        title: 'Erro',
        description: "E-mail e/ou Senha incorreto(s)!",
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    })
  }

  function signOut() {
    router.push('/');

    setUser(null);

    localStorage.removeItem('@bibliotecaonline:token');
  }

  useEffect(() => {
    const token = localStorage.getItem('@bibliotecaonline:token');

    if(token && token !== 'undefined') {
      api.get('/usuarios', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(res => {
        setUser(res.data);
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), user, error, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }