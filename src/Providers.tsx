import React from "react";

import { ConfigProvider, theme } from "antd";
import ruRU from "antd/locale/ru_RU";

import { AuthProvider } from "./auth/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
    const { token } = theme.useToken();

    return (
        <>
            <ConfigProvider
                locale={ruRU}
                theme={{
                    cssVar: true,
                    token: {
                        colorPrimary: cssVar("--var-primary-color"),
                        colorTextTertiary: token.colorTextQuaternary,
                        colorTextQuaternary: cssVar("--var-outline-color"),
                        borderRadius: 16,
                        borderRadiusLG: 16,
                    },
                    components: {
                        Segmented: {
                            trackBg: cssVar("--var-background-color"),
                            trackPadding: "4px",
                            itemSelectedBg: cssVar("--var-primary-color"),
                            itemSelectedColor: cssVar("--var-background-color"),
                        },
                        Button: {
                            primaryColor: cssVar("--var-button-text-color"),
                            paddingBlockLG: 16,
                            paddingInlineLG: 16,
                        },
                        Input: {
                            paddingBlock: 8,
                            paddingInline: 16,
                        },
                        Switch: {
                            handleSize: 28,
                            handleShadow: "0px 2px 3px 0px rgba(7, 64, 92, 0.16)",
                            trackPadding: -3,

                        }
                    }
                }}
            >
                <AuthProvider>
                    {children}
                </AuthProvider>
            </ConfigProvider >
        </>
    )
}

function cssVar(variableName: string): string {
    const rootStyles: CSSStyleDeclaration = getComputedStyle(document.documentElement);
    const colorValue: string = rootStyles.getPropertyValue(variableName).trim();
    return colorValue
}