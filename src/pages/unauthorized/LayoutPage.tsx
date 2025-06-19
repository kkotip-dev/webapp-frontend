import React from "react";
import { Outlet } from "react-router";

import LogoSvg from "jsx:../../svg/logo.svg";

export function LayoutPage({ }: {}) {
    document.addEventListener("DOMContentLoaded", () => {
        const pageContainer = document.querySelector(".signin-page-container") as HTMLDivElement;
        pageContainer.style.top = `calc(50% - ${pageContainer.offsetHeight / 2})`;
    })

    return (
        <>
            <div className="signin-page-background"></div>
            <div className="signin-page-container">
                <div className="signin-page-logo-container">
                    <div className="icon-outlined">
                        <LogoSvg />
                    </div>
                    <h2 style={{ color: "var(--var-background-color)" }}>ККОТиП</h2>
                </div>
                <div className="signin-container">
                    <Outlet />
                </div>
            </div>
        </>
    )
}