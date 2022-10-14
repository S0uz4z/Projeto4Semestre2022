import React, { MouseEventHandler } from 'react';

interface ButtonProps {
    text: string,
    function?: MouseEventHandler<HTMLButtonElement>
}

export default function Button(props: ButtonProps) {
    return (
        <div className="m-5">
            <button type='button' className="bg-[#10543c] px-10 py-3 text-white font-semibold text-2xl" onClick={props.function}>{props.text}</button>
        </div>
    )
}