import Button from '../components/Button'
import InputText from '../components/InputText'

export default function Login() {
    return (
        <div className="App flex">
            <div className="w-[40%] h-screen flex flex-col bg-[#10543c]">
                <div className="w-[40%] m-auto text-white text-center flex flex-col">
                    <i className="fa-solid fa-clipboard text-9xl py-3"></i>
                    <span>HEALTHINVENTORY</span>
                </div>
            </div>
            <div className="w-[60%] bg-white flex">
                <div className="m-auto text-center">
                    <span className="font-extrabold text-5xl text-[#10543c] block mb-12">Login</span>
                    <InputText placeholder='Usuário'></InputText>
                    <InputText placeholder='Senha' password={true}></InputText>
                    <div className='m-8'>
                        <Button text='Entrar'></Button>
                    </div>
                    <a href='#'>
                        <span className="font-medium text-[#10543c] underline">Esqueceu sua senha?</span>
                    </a>
                </div>
            </div>
        </div>
    )
}