import React, { StrictMode } from "react";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/ru";

import { Providers } from "./Providers";
import { Router } from "./Router";

import '@ant-design/v5-patch-for-react-19';

dayjs.locale("ru");
dayjs.extend(updateLocale);
dayjs.updateLocale("ru", {
    months: [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
    ]
});

export function App() {
    return (
        <>
            <StrictMode>
                <Providers>
                    <Router />
                </Providers>
            </StrictMode>
        </>
    );
}