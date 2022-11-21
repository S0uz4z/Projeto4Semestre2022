import axios from "axios";
import { useQuery } from "react-query";
import Button from "../components/Button";

async function getItems() {
  var config = {
    method: "get",
    url: "http://localhost:4000/inventario",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    let response = await axios(config);
    let responseData = await response.data.result;
    return responseData;
  } catch (err) {
    console.log(err);
  }
}

function renderList(data: any) {
  if (data)
    return data.map((item: any, index: any) => {
      return (
        <div
          key={index}
          className="flex flex-row list-none bg-[#10543c] h-10 text-white items-center font-bold relative my-1"
        >
          <a href="#">
            <i
              className="fa fa-pencil text-white inline absolute left-0 top-0 p-3"
              aria-hidden="true"
            ></i>
            <i
              className="fa-solid fa-trash text-white inline absolute left-12 top-0 p-3"
              aria-hidden="true"
            ></i>
          </a>
          <li className="w-[50%]">{item.nome}</li>
          <li className="w-[50%]">{item.quantidade}</li>
          <li className="w-[50%]">{item.quantidade}</li>{/* mudar para senha mascarada*/}{/* mudar para microservico de usuario*/}
        </div>
      );
    });
}

export default function ManutencaoUsuario() {
  const { data: items, isLoading } = useQuery("getItems", getItems, {
    refetchOnWindowFocus: false,
  });

  return (
    <div className="w-full h-screen mt-10">
      <div className="w-[50%] min-h-[50%] border-black border-2 border-solid m-auto text-center relative">
        <span className="font-bold text-4xl text-black">Usuários</span>
        <div className="px-5">
          <div className="flex flex-row list-none font-bold">
            <span className="w-[50%]">Nome</span>
            <span className="w-[50%]">Email</span>
            <span className="w-[50%]">Senha</span>
          </div>
          <ul>{renderList(items)}</ul>
        </div>
        <div className="flex flex-row absolute bottom-0 p-5">
          <div className="w-12 h-12 bg-[#10543c] rounded-full text-white flex mx-2 cursor-pointer">
            <i className="fa fa-plus block m-auto text-2xl" aria-hidden="true"></i>
          </div>
        </div>
        <div className="absolute right-0 bottom-0">
          <Button text="Sair"></Button>
        </div>
      </div>
    </div>
  );
}
