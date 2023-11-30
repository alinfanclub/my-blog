"use client";

import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  _id?: string;
  email?: string;
  name?: string;
};

type ContextPorps = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  logout: () => void;
  login: (email: string, password: string) => void;
};
const AuthContext = createContext<ContextPorps>({
  user: {},
  setUser: (): User | null => null,
  logout: () => {},
  login: (email: string, password: string) => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    axios
      .get(
        "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/auth",
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = () => {
    axios.post(
      "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setUser(null);
  };

  const login = (email: string, password: string) => {
    axios
      .post(
        " https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.data._id);
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <AuthContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
