interface ButtonProps {
    text: string
}

export default function Button(props: ButtonProps) {
    return (
        <div className="m-8">
            <button className="bg-[#10543c] px-10 py-3 text-white font-semibold text-2xl">{props.text}</button>
        </div>
    )
}