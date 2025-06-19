import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";

import { AuthType, useAuth } from "./auth/AuthContext";
import { LayoutPage as UnauthorizedLayoutPage } from "./pages/unauthorized/LayoutPage";
import { AuthPage } from "./pages/unauthorized/AuthPage";
import { ResetPasswordPage } from "./pages/unauthorized/ResetPasswordPage";

import { MainPage as StudentMainPage } from "./pages/student/MainPage";
import { SchedulePage as StudentSchedulePage } from "./pages/student/SchedulePage";
import { JournalPage as StudentJournalPage } from "./pages/student/JournalPage";
import { ProfilePage as StudentProfilePage } from "./pages/student/ProfilePage";

import { MainPage as TeacherMainPage } from "./pages/teacher/MainPage";
import { SchedulePage as TeacherSchedulePage } from "./pages/teacher/SchedulePage";
import { JournalPage as TeacherJournalPage } from "./pages/teacher/JournalPage";
import { ProfilePage as TeacherProfilePage } from "./pages/teacher/ProfilePage";

import { MainPage as AdminMainPage } from "./pages/admin/MainPage";
import { GroupManagamentPage as AdminGroupManagementPage } from "./pages/admin/GroupManagementPage";
import { TeachersManagementPage as AdminTeachersManagementPage } from "./pages/admin/TeachersManagementPage";
import { SchedulePage as AdminSchedulePage } from "./pages/admin/SchedulePage";

export function Router({ }: {}) {
    const auth = useAuth();

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {
                        auth.type === AuthType.None &&
                        <Route path="/" element={<UnauthorizedLayoutPage />}>
                            <Route index element={<AuthPage />} />
                            <Route path="/reset-password" element={<ResetPasswordPage />} />
                        </Route>
                    }
                    {
                        auth.type === AuthType.Student &&
                        <Route path="/" element={<StudentMainPage />} >
                            <Route index element={<StudentSchedulePage />} />
                            <Route path="/journal" element={<StudentJournalPage />} />
                            <Route path="/profile" element={<StudentProfilePage />} />
                        </Route>
                    }
                    {
                        auth.type === AuthType.Teacher &&
                        <Route path="/" element={<TeacherMainPage />}>
                            <Route index element={<TeacherSchedulePage />} />
                            <Route path="/journal" element={<TeacherJournalPage />} />
                            <Route path="/profile" element={<TeacherProfilePage />} />
                        </Route>
                    }
                    {
                        auth.type === AuthType.Administrator &&
                        <Route path="/" element={<AdminMainPage />}>
                            <Route index element={<AdminGroupManagementPage />} />
                            <Route path="/teachers" element={<AdminTeachersManagementPage />} />
                            <Route path="/schedule" element={<AdminSchedulePage />} />
                        </Route>
                    }
                </Routes>
            </BrowserRouter>
        </>
    );
}