import { useState } from "react"
import ManutencaoInventario from "./ManutencaoInventario";

export default function AdminContainer() {
    const opcoesAdmin = {
        manutencaoInventario: "manutInvent",
        manutencaoUsuario: "manutUsu"
    }
    const [selected, setSelected] = useState(opcoesAdmin.manutencaoInventario);

    const renderOpcoesAdmin = () => {
        if (selected == opcoesAdmin.manutencaoInventario) {
            return (
                <ManutencaoInventario></ManutencaoInventario>
            )
        } else {
            // return (
            //     <ManutencaoUsuario></ManutencaoUsuario>
            // )
        }
    }

    return (
        <div>
            <div className="w-full h-8 bg-[#d9d9d9] flex flex-row justify-center items-center">
                <span style={{ color: selected == opcoesAdmin.manutencaoInventario ? "white" : "black" }} onClick={() => { setSelected(opcoesAdmin.manutencaoInventario) }} className="text-black font-bold text-base mr-4 cursor-pointer hover:text-white transition-all">Manutenção de Inventário</span>
                <span style={{ color: selected == opcoesAdmin.manutencaoUsuario ? "white" : "black" }} onClick={() => { setSelected(opcoesAdmin.manutencaoUsuario) }} className="text-black font-bold text-base cursor-pointer hover:text-white transition-all">Manutenção de Usuários</span>
            </div>
            {renderOpcoesAdmin()}
        </div>
    )
}