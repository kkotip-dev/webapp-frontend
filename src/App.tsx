import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { MainPage } from "./pages/MainPage";

export function App() {
    return (
        <>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
          </BrowserRouter>  
        </>
    );
}