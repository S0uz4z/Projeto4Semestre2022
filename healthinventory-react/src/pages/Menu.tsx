import Navbar from "../components/Navbar";
import AdminContainer from "./AdminContainer";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

interface Usuario {
  id: number;
  nome: string;
  tipo: Tipo;
}

interface Tipo {
  valor: string;
  label: string;
}

const renderMenu = (usuario: Usuario) => {
  if (usuario?.tipo?.valor === "admin") {
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
      <Navbar text={`Olá ${usuarioLogado?.usuarioLogado?.tipo?.label}!`}></Navbar>
      {renderMenu(usuarioLogado?.usuarioLogado)}
    </div>
  );
}
