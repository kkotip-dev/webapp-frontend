import React, { useEffect, useState } from "react";

import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "antd";

export function DaySelector({ value, onChange }: { value: Date, onChange: (date: Date) => void }) {
    const [selectedMonth, setSelectedMonth] = useState<Dayjs>(dayjs(value).startOf("month"));
    const [selectedWeek, setSelectedWeek] = useState<number>(() => {
        let week = 0;
        const today = dayjs();

        let date = today.startOf("month");
        while (!date.isSame(today, "week")) {
            week++;
            date = date.add(1, "week");
        }

        return week + 1;
    });
    const [selectedDay, setSelectedDay] = useState<number>(dayjs(value).day());

    const weeks = (() => {
        if (selectedMonth === null) return;

        let date = selectedMonth.clone();
        let weeks = 0;

        while (date.isSame(selectedMonth, "month")) {
            weeks++;
            date = date.endOf("week").add(1, "second");
        }

        return weeks;
    })();

    const days = (() => {
        if (selectedWeek === undefined) return;

        let date = selectedMonth?.clone();
        let days: Dayjs[] = [];

        date = date?.add(selectedWeek - 1, "weeks").startOf("week");

        const weekDate = date?.clone();

        while (date?.isSame(weekDate, "week")) {
            days.push(date.clone());
            date = date.endOf("day").add(1, "second");
        }

        days.pop();
        days.pop();

        return days;
    })();

    useEffect(() => {
        onChange(new Date(selectedMonth.year(), selectedMonth.month(), days?.[selectedDay - 1].date()));
    }, [selectedMonth, selectedWeek, selectedDay]);

    return (
        <>
            <div className="week-selector-container">
                <DatePicker
                    picker="month"
                    format={{ format: "MMMM YYYY" }}
                    value={selectedMonth}
                    onChange={(date) => {
                        setSelectedMonth(date?.startOf("month"));
                    }}
                    style={{
                        width: "80%",
                        borderRadius: "var(--var-border-radius)",
                        fontSize: "16px"
                    }}
                />
                <select
                    key="week-selector"
                    value={selectedWeek}
                    onChange={(event) => {
                        console.log(event.currentTarget.selectedIndex);
                        setSelectedWeek(event.currentTarget.selectedIndex + 1);
                    }}
                >
                    {
                        Array.from({ length: weeks ?? 0 }, (_, i) => i + 1).map((week) => {
                            return (
                                <>
                                    <option key={"week-selector-" + week} value={week}>Неделя {week}</option>
                                </>
                            )
                        })
                    }
                </select>
            </div>
            <div className="day-selector-container">
                {
                    days?.map((day, i) => {
                        return (
                            <>
                                <div
                                    key={day.format("[d]ay-selector-dd-MMMM")}
                                    className={"day-select " + (day.day() === selectedDay ? "day-selected" : "")}
                                    onClick={() => {
                                        setSelectedDay(i + 1);
                                    }}
                                >
                                    <h4>{day.format("DD MMMM")}</h4>
                                    <h5>{day.format("dd")}</h5>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    );
}