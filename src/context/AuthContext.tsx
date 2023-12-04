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
import { Cookies } from "react-cookie";

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

const cookies = new Cookies();

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const cookie = new Cookies().get("jwt");
  useEffect(() => {
    if (cookie) {
      axios
        .get(
          "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/auth",
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          err.response.status === 500 && setUser(null);
        });
    }
  }, [cookie]);

  const logout = () => {
    axios.post(
      "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/logout",
      {},
      {
        withCredentials: true,
      }
    );
    localStorage.removeItem("user");
    window.location.href = "/";
    cookies.remove("jwt");
  };

  const login = (email: string, password: string) => {
    axios
      .post(
        "https://port-0-blog-server-5mk12alpaukt9j.sel5.cloudtype.app/user/login",
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
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res.data.data._id,
            email: res.data.data.email,
            name: res.data.data.name,
          })
        );
        window.location.href = "/admin";
        cookies.set("jwt", res.data.token, { path: "/" });
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
