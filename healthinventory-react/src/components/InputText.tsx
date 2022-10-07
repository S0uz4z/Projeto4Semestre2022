interface InputTextProps {
    placeholder: string,
    password?: boolean,
}

export default function InputText(props: InputTextProps) {
    return (
        <div className="m-5">
            <input type={props.password ? "password" : "text"} placeholder={props.placeholder} className="border-spacing-0 p-3 text-base bg-[#d9d9d9] text-[#8c8c8c]
            focus: outline-none" />
        </div>
    )
}