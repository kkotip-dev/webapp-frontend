import React, { useEffect, useState } from "react";

import { SchedulePairEntry } from "../../types/Schedule";
import { DaySelector } from "../../components/DaySelector";
import { FlexDivider } from "../../components/FlexDivider";
import { authenticatedFetch } from "../../auth/AuthenticatedFetch";
import { BACKEND_URL } from "../../AppConsts";
import { Spin } from "antd";

export function SchedulePage({ }: {}) {
    const [date, setDate] = useState(new Date());

    const [schedule, setSchedule] = useState<SchedulePairEntry[] | undefined>(undefined);

    const updateSchedule = () => {
        getSchedule(date).then((schedule) => {
            setSchedule(schedule);
        })
    };

    useEffect(() => {
        updateSchedule();
    }, []);

    useEffect(() => {
        updateSchedule();
    }, [date]);

    return (
        <>
            <div className="call-schedule-container">
                <h2>Расписание звонков</h2>
                <button>Открыть</button>
            </div>
            <FlexDivider />
            <DaySelector value={date} onChange={(date) => { setDate(date) }} />
            <br />
            {
                !schedule &&
                <Spin />
            }
            {
                schedule &&
                <div key="schedule-day-lessons" className="schedule-day-lessons-container">
                    {
                        schedule.map((pair) => {
                            return (
                                <>
                                    <SchedulePairEntry pair={pair} />
                                </>
                            )
                        })
                    }
                </div>
            }
        </>
    );
}

function SchedulePairEntry({ pair }: { pair: SchedulePairEntry }) {
    const lessonElements = pair.lessons.map((lesson) => {
        if (lesson === null) return <></>;

        return (
            <>
                <div key={"schedule-lesson-" + lesson.callNumber} className="schedule-lesson row">
                    <h2 className="lesson-call-number">{lesson.callNumber}</h2>
                    <div className="schedule-lesson-info">
                        <h5 className="mobile-column"><span>{lesson.location}</span></h5>
                        {/* @ts-ignore */}
                        <h4 className="mobile-column"><span>{lesson.lessonName}</span> <span className="non-mobile-separate">{lesson.name}</span></h4>
                    </div>
                    <div className="flex-divider" />
                    <div className="schedule-lesson-time">
                        <h5>{lesson.callTime}</h5>
                    </div>
                </div >
            </>
        )
    })

    return (
        <>
            <div key={"schedule-lessons-" + pair.lessons[0]?.callNumber} className={"schedule-lessons-container " + (pair.current ? "lesson-current" : "")}>
                {lessonElements}
            </div>
        </>
    );
}

async function getSchedule(date: Date): Promise<SchedulePairEntry[]> {
    return authenticatedFetch(`${BACKEND_URL}/api/schedule/${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`)
        .then((response) => {
            return response.json();
        });
}