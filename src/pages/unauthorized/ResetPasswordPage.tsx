import React, { useState } from "react";
import { NavLink } from "react-router";

import { Button, Flex, Input, Space, Statistic } from "antd";
import { MdOutlineMailOutline } from "react-icons/md";

import { betterFetch } from "../../utils/BetterFetch";
import { BACKEND_URL } from "../../AppConsts";
import { FormState, getStateClassname } from "../../utils/FormState";
import { InlineLabelInput } from "../../components/InlineLabelInput";

enum ResetPasswordStage {
    EnterLogin,
    EnterCode,
    EnterNewPassword,
};

export function ResetPasswordPage({ }: {}) {
    const [state, setState] = useState<FormState>(FormState.DEFAULT);
    const [stage, setStage] = useState<ResetPasswordStage>(ResetPasswordStage.EnterLogin);

    const [resetToken, setResetToken] = useState<string | undefined>(undefined);
    const [newPasswordToken, setNewPasswordToken] = useState<string | undefined>(undefined);

    const [nextResendTime, setNextResendTime] = useState<number | undefined>(undefined);
    const [resendAllowed, setResendAllowed] = useState(false);

    const inputClassname = getStateClassname(state);

    const currentStageElement = (() => {
        switch (stage) {
            case ResetPasswordStage.EnterLogin:
                return (
                    <>
                        <h6>Введите привязанную к аккаунту электронную почту для восстановления пароля</h6>
                        <iframe
                            name="dummy-iframe"
                            id="dummy-iframe"
                            style={{
                                display: "none"
                            }} />
                        <form
                            id="enter-email-form"
                            target="dummy-iframe"
                            onSubmit={(event) => {
                                event.preventDefault();

                                const form = event.currentTarget;

                                if (!form.checkValidity()) {
                                    setState(FormState.ERROR);
                                    return;
                                }

                                const email = (document.getElementById("email-input") as HTMLInputElement).value;
                                setState(FormState.LOADING);

                                initiatePasswordReset(email)
                                    .then((resetToken) => {
                                        setResetToken(resetToken);
                                        setState(FormState.DEFAULT);
                                        setStage(ResetPasswordStage.EnterCode);
                                        setNextResendTime(Date.now() + 5 * 60 * 1000);
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                        setState(FormState.ERROR);
                                    });

                            }}
                        >
                            <InlineLabelInput
                                id="email-input"
                                type="email"
                                name="email"
                                placeholder="Введите привязанную эл. почту"
                                inputClassName={inputClassname}
                                label={
                                    <>
                                        <MdOutlineMailOutline />
                                        <span>Электронная почта</span>
                                    </>
                                }
                            />
                            <span className="divider"></span>
                            <button type="submit"><h3>Продолжить</h3></button>
                        </form>
                    </>
                )
            case ResetPasswordStage.EnterCode:
                return (
                    <>
                        <h6>Введите код из письма, отправленного на почту</h6>
                        <iframe
                            name="dummy-iframe"
                            id="dummy-iframe"
                            style={{
                                display: "none"
                            }} />
                        <form
                            id="enter-code-form"
                            target="dummy-iframe"
                            onSubmit={(event) => {

                            }}
                        >
                            <Flex align="center" justify="center">
                                <Input.OTP
                                    type="tel"
                                    length={4}
                                    onChange={(value) => {
                                        if (resetToken === undefined) {
                                            console.error("No reset token");
                                            setStage(ResetPasswordStage.EnterLogin);
                                            return;
                                        }

                                        setState(FormState.LOADING);
                                        confirmPasswordReset(resetToken, value).then((token) => {
                                            setState(FormState.DEFAULT);
                                            setStage(ResetPasswordStage.EnterNewPassword);
                                            setNewPasswordToken(token);
                                        })
                                            .catch((error) => {
                                                console.error(error);
                                                setState(FormState.ERROR);
                                            })
                                    }}
                                />
                            </Flex>
                            {
                                !resendAllowed &&
                                <>
                                    <Flex
                                        align="center"
                                        justify="center"
                                        gap={4}
                                    >
                                        <h5>Повторно отправить код через</h5>
                                        <Statistic.Timer
                                            type="countdown"
                                            format="mm:ss"
                                            value={nextResendTime}
                                            style={{
                                                alignContent: "center",
                                                justifyContent: "center",
                                            }}
                                            valueStyle={{
                                                display: "flex",
                                                justifyContent: "center"
                                            }}
                                            onFinish={() => {
                                                setResendAllowed(true);
                                            }}
                                        />
                                    </Flex>
                                </>
                            }
                            {
                                resendAllowed &&
                                <>
                                    <Flex
                                        align="center"
                                        justify="center"
                                        gap={4}
                                    >
                                        <h5>Не пришел код?</h5>
                                        <Button
                                            variant="text"
                                            color="primary"
                                            style={{
                                                fontWeight: 500,
                                                padding: 0
                                            }}
                                            onClick={() => {
                                                console.log("SEND");
                                            }}
                                        >
                                            Отправить повторно
                                        </Button>
                                    </Flex>
                                </>
                            }
                        </form >
                    </>
                );

            default:
                break;
        }
    })();

    return (
        <>
            <h1>Восстановление</h1>
            {currentStageElement}
            <NavLink
                to="/"
            >
                <span>Назад</span>
            </NavLink>
        </>
    );
}

async function initiatePasswordReset(email: string): Promise<string> {
    const params = new URLSearchParams();
    params.append("email", email);
    return betterFetch(`${BACKEND_URL}/api/reset-password?${params}`)
        .then((response) => {
            return response.text();
        });
}

async function confirmPasswordReset(resetToken: string, code: string): Promise<string> {
    const params = new URLSearchParams();
    params.append("token", resetToken);
    params.append("code", code);
    return betterFetch(`${BACKEND_URL}/api/reset-password?${params}`)
        .then((response) => {
            return response.text();
        });
}