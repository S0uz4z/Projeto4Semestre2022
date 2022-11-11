import Navbar from "../components/Navbar";
import AdminContainer from "./AdminContainer";

const usuario = {
    id: 1,
    nome: "João Silva",
    tipo: { valor: "admin", label: "Administrador" }
}

interface Usuario {
    id: number
    nome: string
    tipo: Tipo
}

interface Tipo {
    valor: string
    label: string
}

const renderMenu = (usuario: Usuario) => {
    if (usuario.tipo.valor === "admin") {
        return (<AdminContainer></AdminContainer>)
    } else {
        // return(<UsuarioContainer></UsuarioContainer>)
    }
}

export default function Menu() {
    return (
        <div>
            <Navbar text={`Olá ${usuario.tipo.label}!`}></Navbar>
            {renderMenu(usuario)}
        </div>
    )
}