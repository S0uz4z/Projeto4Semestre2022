import { CSSProperties, useState } from "react"
import ManutencaoInventario from "./ManutencaoInventario";
import ManutencaoUsuario from "./ManutencaoUsuario";
import Solicitacoes from "./Solicitacoes";

export default function AdminContainer() {
    const opcoesAdmin = {
        manutencaoInventario: "manutInvent",
        manutencaoUsuario: "manutUsu"
    }
    const [selected, setSelected] = useState(opcoesAdmin.manutencaoInventario);

    const spanSelectedStyle : CSSProperties = {
        color: "#10543c",
        borderBottom: 2,
        borderBottomColor: "#10543c",
        borderBottomStyle: "solid"
    }

    const renderOpcoesAdmin = () => {
        switch (selected) {
            case opcoesAdmin.manutencaoInventario:
                return (
                    <ManutencaoInventario></ManutencaoInventario>
                )
                break;
            case opcoesAdmin.manutencaoUsuario:
                return (
                    <ManutencaoUsuario></ManutencaoUsuario>
                )
                break;
        }
    }

    return (
        <div>
            <div className="w-full h-8 bg-[#d9d9d9] flex flex-row justify-between items-center text-center">
                <div className="w-[50%]">
                    <span style={selected == opcoesAdmin.manutencaoInventario ? spanSelectedStyle : { color: "black" }} onClick={() => { setSelected(opcoesAdmin.manutencaoInventario) }} className="text-black font-bold text-base mx-10 cursor-pointer hover:text-white transition-all">Manutenção de Inventário</span>
                </div>
                <div className="w-[50%]">
                    <span style={selected == opcoesAdmin.manutencaoUsuario ? spanSelectedStyle : { color: "black" }} onClick={() => { setSelected(opcoesAdmin.manutencaoUsuario) }} className="text-black font-bold text-base mx-10 cursor-pointer hover:text-white transition-all">Manutenção de Usuários</span>
                </div>
            </div>
            {renderOpcoesAdmin()}
        </div>
    )
}