import Button from "../components/Button"

const items = [{ id: 1, nome: 'Lápis', quantidade: 5 }]

function renderList(data: Array<any>) {
    return data.map((item, index) => {
        return (
            <div key={index} className="flex flex-row list-none bg-[#10543c] h-10 text-white items-center font-bold relative">
                <a href="#"><i className="fa fa-pencil text-white inline absolute left-0 top-0 p-3" aria-hidden="true"></i></a>
                <li className="w-[50%]">{item.nome}</li>
                <li className="w-[50%]">{item.quantidade}</li>
            </div>)
    })
}

export default function ManutencaoInventario() {
    return (
        <div className="w-full h-screen mt-10">
            <div className="w-[50%] min-h-[50%] border-black border-2 border-solid m-auto text-center relative">
                <span className="font-bold text-4xl text-black">Inventário</span>
                <div className="px-5">
                    <div className="flex flex-row list-none font-bold">
                        <span className="w-[50%]">Item</span>
                        <span className="w-[50%]">Quantidade</span>
                    </div>
                    <ul>
                        {renderList(items)}
                    </ul>
                </div>
                <div className="flex flex-row absolute bottom-0 p-5">
                    <div className="w-12 h-12 bg-[#10543c] rounded-full text-white flex mx-2 cursor-pointer">
                        <i className="fa fa-plus block m-auto text-2xl" aria-hidden="true"></i>
                    </div>
                    <div className="w-12 h-12 bg-[#ff1616] rounded-full text-white flex cursor-pointer">
                        <i className="fa fa-minus block m-auto text-2xl" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="absolute right-0 bottom-0">
                    <Button text="Sair"></Button>
                </div>
            </div>
        </div>
    )
}