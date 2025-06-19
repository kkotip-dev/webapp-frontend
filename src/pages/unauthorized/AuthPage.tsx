import React, { FormEvent, useState } from "react";
import { NavLink } from "react-router";

import { MdPerson, MdLock } from "react-icons/md";

import { useAuth } from "../../auth/AuthContext";
import { authenticatedFetch } from "../../auth/AuthenticatedFetch";
import { LoginStatus } from "../../types/LoginStatus";
import { BACKEND_URL } from "../../AppConsts";
import { FormState, getStateClassname } from "../../utils/FormState";
import { InlineLabelInput } from "../../components/InlineLabelInput";

export function AuthPage() {
    const auth = useAuth();

    const [state, setState] = useState(FormState.DEFAULT);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    function SubmitSignin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;

        if (!form.checkValidity()) {
            setState(FormState.ERROR);
            return;
        }

        const login = (document.getElementById("login-input") as HTMLInputElement).value;
        const password = (document.getElementById("password-input") as HTMLInputElement).value;

        setState(FormState.LOADING);

        logIn(login, password)
            .then((status) => {
                if (!status.success || status.token === undefined) {
                    setState(FormState.ERROR);
                    setErrorMessage(status.errorMessage);
                    return;
                }
                auth.login(status.token);
                window.location.href = "/";
            }).catch((error) => {
                console.error(error);
                error.response.json().then((status: LoginStatus) => {
                    console.error(status);
                    setState(FormState.ERROR);
                    setErrorMessage(status.errorMessage);
                });
            });
    }

    const inputClassname = getStateClassname(state);

    return (
        <>
            <h1>Авторизация</h1>
            <h6>Войдите в свою учетную запись, через логин и пароль выданный администратором</h6>
            {/* Пустой iframe, чтобы форма не перенаправляла на /api/login */}
            <iframe
                name="dummy-login-iframe"
                id="dummy-login-iframe"
                style={{
                    display: "none"
                }}
            />
            {
                errorMessage !== undefined &&
                // <Typography.Text type="danger">{errorMessage}</Typography.Text>
                <h4 className="error-text">{errorMessage}</h4>
            }
            <form id="auth-form" target="dummy-login-iframe" onSubmit={SubmitSignin}>
                <InlineLabelInput
                    id="login-input"
                    name="login"
                    type="text"
                    placeholder="Введите логин"
                    inputClassName={inputClassname}
                    label={(
                        <>
                            <MdPerson />
                            <span>Логин / Почта</span>
                        </>
                    )}
                />
                <InlineLabelInput
                    id="password-input"
                    name="password"
                    type="password"
                    placeholder="Введите пароль"
                    inputClassName={inputClassname}
                    label={(
                        <>
                            <MdLock />
                            <span>Пароль</span>
                        </>
                    )}
                />
                <span className="divider"></span>
                <button type="submit"><h3>Продолжить</h3></button>
                <div className="col">
                    <span>Не помните пароль</span>
                    <span><NavLink to="/reset-password">Восстановить</NavLink></span>
                </div>
            </form>
        </>
    );
}

function logIn(login: string, password: string): Promise<LoginStatus> {
    return authenticatedFetch(`${BACKEND_URL}/api/login`, {
        method: "POST",
        body: new URLSearchParams({
            login: login,
            password: password
        })
    }).then((response) => {
        return response.json();
    });

}
