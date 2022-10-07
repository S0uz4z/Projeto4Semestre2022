import '../src/styles/main.css'
import InputText from './components/InputText';
import Button from './components/Button';

function App() {
  return (
    <div className="App flex">
      <div className="w-[40%] h-screen flex flex-col bg-[#10543c]">
        <div className="w-[40%] m-auto text-white text-center">
          <i class="fa-solid fa-clipboard text-9xl py-3"></i>
          <span>HEALTHINVENTORY</span>
        </div>
      </div>
      <div className="w-[60%] bg-white flex">
        <div className="m-auto text-center">
          <span className="font-extrabold text-5xl text-[#10543c] block mb-12">Login</span>
          <InputText placeholder='Usuário'></InputText>
          <InputText placeholder='Senha' password={true}></InputText>
          <Button text='Entrar'></Button>
          <a href='#'>
            <span className="font-medium text-[#10543c] underline">Esqueceu sua senha?</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
