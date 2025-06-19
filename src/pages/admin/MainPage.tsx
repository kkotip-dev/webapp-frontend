import React from "react";
import { Link, NavLink, Outlet } from "react-router";

import { MdLogout, MdOutlineAssignment, MdOutlineGroup, MdOutlineGroups } from "react-icons/md";

import { useAuth } from "../../auth/AuthContext";
import LogoSvg from "jsx:../../svg/logo.svg";
import LogoGraySvg from "jsx:../../svg/logo-gray.svg";
import { Flex } from "antd";

export function MainPage({ }: {}) {
    const auth = useAuth();

    return (
        <>
            <div className="navbar-container"><LogoSvg /><h3>ККОТиП</h3></div>
            <div className="main-page-container">
                <div className="tabs-container tabs-container-minimized">
                    <NavLink className={({ isActive }) => isActive ? "inline-icon active" : "inline-icon"} to="/"><MdOutlineGroups /><span style={{ lineHeight: 1.2 }}>Группы</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? "inline-icon active" : "inline-icon"} to="/teachers"><MdOutlineGroup /><span style={{ lineHeight: 1.2 }}>Преподаватели</span></NavLink>
                    <NavLink className={({ isActive }) => isActive ? "inline-icon active" : "inline-icon"} to="/schedule"><MdOutlineAssignment /><span style={{ lineHeight: 1.2 }}>Расписание</span></NavLink>
                    <div className="flex-divider mobile-hidden" />
                    <Link className="inline-icon mobile-hidden" to="/" onClick={() => {
                        auth.logout();
                    }}><MdLogout /><span>Выход</span></Link>
                </div>
                <div className="outlet-container">
                    <div className="page-container page-container-fullscreen">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}