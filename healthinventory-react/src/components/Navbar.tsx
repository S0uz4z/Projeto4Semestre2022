interface NavbarProps {
    text: string
}

export default function Navbar(props: NavbarProps) {
    return (
        <div className="w-full h-16 bg-[#10543c] flex flex-row items-center justify-center relative">
            <i className="fa-solid fa-clipboard text-5xl text-white inline absolute left-0 top-0 p-2"></i>
            <span className="text-white font-bold text-2xl">{props.text}</span>
        </div>
    )
}