import React from "react";

import { Link, NavLink, Outlet } from "react-router";
import { MdChecklist, MdLogout, MdPerson } from "react-icons/md";

import { useAuth } from "../../auth/AuthContext";

import LogoSvg from "jsx:../../svg/logo.svg";
import LogoGraySvg from "jsx:../../svg/logo-gray.svg";

export function MainPage({ }: {}) {
    const auth = useAuth();

    return (
        <>
            <div className="navbar-container"><LogoSvg /><h3>ККОТиП</h3></div>
            <div className="main-page-container">
                <div className="tabs-container">
                    <NavLink className={({ isActive }) => isActive ? "inline-icon active" : "inline-icon"} to="/"><LogoGraySvg /><span>Расписание</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? "inline-icon active" : "inline-icon"} to="/journal"><MdChecklist /><span>Дневник</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? "inline-icon active" : "inline-icon"} to="/profile"><MdPerson /><span style={{ lineHeight: 1.2 }}>Профиль</span></NavLink>
                    <div className="flex-divider mobile-hidden" />
                    <Link className="inline-icon mobile-hidden" to="/" onClick={() => {
                        auth.logout();
                    }}><MdLogout /><span>Выход</span></Link>
                </div>
                <div className="outlet-container">
                    <div className="page-container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}