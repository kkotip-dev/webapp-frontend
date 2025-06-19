import React from "react";

export function InlineLabelInput({ id, type, name, placeholder, label, inputClassName, children }:
    {
        id: string,
        type: React.HTMLInputTypeAttribute,
        name: string,
        placeholder: string,
        label: React.ReactNode,
        inputClassName: string,
        children: React.ReactNode
    }) {
    return (
        <>
            <div className="row inline-label">
                <label htmlFor={id}>
                    {label}
                </label>
                {
                    children !== undefined &&
                    children
                }
                {
                    children === undefined &&
                    <input
                        required
                        id={id}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        className={inputClassName}
                    />
                }
            </div>
        </>
    );
}

InlineLabelInput.defaultProps = {
    id: undefined,
    type: undefined,
    placeholder: undefined,
    inputClassName: undefined,
    children: undefined
};