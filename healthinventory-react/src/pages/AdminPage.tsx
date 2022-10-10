import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AdminPage() {
    return (
        <div>
            <Navbar text="Olá Administrador!"></Navbar>
            <div className="w-full h-8 bg-[#d9d9d9] flex flex-row justify-center items-center">
                <span className="text-black font-bold text-base mr-4 cursor-pointer hover:text-white transition-all">Manutenção de Inventário</span>
                <span className="text-black font-bold text-base cursor-pointer hover:text-white transition-all">Manutenção de Usuários</span>
            </div>
            <Outlet></Outlet>
        </div>
    )
}