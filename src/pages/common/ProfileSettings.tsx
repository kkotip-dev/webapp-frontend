import React, { useState } from "react";

import { Button, Flex, Input, Switch } from "antd";
import { MdHelpOutline, MdKey, MdKeyboardArrowRight, MdOutlineNotifications } from "react-icons/md";

import { FlexDivider } from "../../components/FlexDivider";

export function ProfileSettings({ }: {}) {
    const [notifications, setNotifications] = useState(false);

    return (
        <>
            <Flex gap="var(--var-flex-gap)" vertical>
                <h2 style={{ textAlign: "center" }}>Настройки</h2>
                <FlexDivider />
                <SettingEntry label="Уведомления">
                    <IconWrapper icon={<MdOutlineNotifications size={24} />} />
                    <h5 style={{ whiteSpace: "nowrap", width: "100%", color: "#101520" }}>Push-уведомления</h5>
                    <Switch style={{ width: "64px" }} checked={notifications} onChange={setNotifications} />
                </SettingEntry>
                <FlexDivider />
                <SettingEntry label="Пароль">
                    <Flex gap="var(--var-flex-gap)" style={{ width: "100%" }} vertical>
                        <Input prefix={<MdKey color={"var(--var-outline-color)"} />} placeholder="Пароль" type="password" />
                        <Button type="primary" size="large" style={{ fontWeight: "600" }}>Изменить пароль</Button>
                    </Flex>
                </SettingEntry>
                <FlexDivider />
                <SettingEntry label="Поддержка">
                    <Button style={{ width: "100%", justifyContent: "normal", padding: 0, borderRadius: "1000px" }} type="text" size="large">
                        <IconWrapper icon={<MdHelpOutline size={24} />} />
                        <h5
                            style={{
                                whiteSpace: "nowrap",
                                width: "100%",
                                textAlign: "start",
                                color: "#101520"
                            }}
                        >
                            Помощь
                        </h5>
                        <MdKeyboardArrowRight size={28} />
                    </Button>
                </SettingEntry>
            </Flex>
        </>
    );
}

function SettingEntry({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <Flex gap="var(--var-flex-gap)" vertical>
            <h4>{label}</h4>
            <Flex gap="var(--var-flex-gap)" align="center">
                {children}
            </Flex>
        </Flex>
    )
}

function IconWrapper({ icon }: { icon: React.ReactNode }) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            padding: "6px",
            borderRadius: "10000px",
            backgroundColor: "var(--var-settings-icons-circle-background-color)",
            color: "var(--var-settings-icons-circle-color)"
        }}>
            {icon}
        </div>
    );
}