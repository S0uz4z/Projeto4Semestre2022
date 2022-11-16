import Navbar from "../components/Navbar";
import AdminContainer from "./AdminContainer";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface Usuario {
  id: number;
  nome: string;
  tipo: string;
}

const labelTipoUsuario: any = {
  admin: "Administrador",
  user: "Usuário"
}

const renderMenu = (usuario: Usuario) => {
  if (usuario?.tipo === "admin") {
    return <AdminContainer></AdminContainer>;
  } else {
    // return(<UsuarioContainer></UsuarioContainer>)
  }
};

export default function Menu() {
  const usuarioSelector = useSelector((state: any) => state.usuarioLogado);
  const [usuarioLogado, setUsuarioLogado] = useState<any>();

  useEffect(() => {
    setUsuarioLogado(usuarioSelector);
  }, [usuarioLogado]);

  return (
    <div>
      <Navbar
        text={`Olá ${labelTipoUsuario[usuarioLogado?.usuarioLogado?.tipo]}!`}
      ></Navbar>
      {renderMenu(usuarioLogado?.usuarioLogado)}
    </div>
  );
}
