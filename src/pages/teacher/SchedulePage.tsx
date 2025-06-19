import React, { useState } from "react";

import { DaySelector } from "../../components/DaySelector";
import { SchedulePairEntry } from "../../types/Schedule";

export function SchedulePage({ }: {}) {
    const [scheduleEntries, setScheduleEntries] = useState<SchedulePairEntry[] | undefined>(undefined);
    const [date, setDate] = useState(new Date());

    return (
        <>
            <DaySelector value={date} onChange={(date) => { setDate(date); }} />
            <div className="schedule-day-lessons-container">
                {
                    scheduleEntries?.map((entry) => {
                        return <SchedulePairEntry pair={entry} />
                    })
                }
            </div>
        </>
    );
}

function SchedulePairEntry({ pair }: { pair: SchedulePairEntry }) {
    const lessonElements = pair.lessons.map((lesson) => {
        if (lesson === null) return <></>;

        return (
            <>
                <div key={lesson.callNumber} className="schedule-lesson row">
                    <h2 className="lesson-call-number">{lesson.callNumber}</h2>
                    <div className="schedule-lesson-info">
                        {/* @ts-ignore */}
                        <h4 className="mobile-column"><span>{lesson.lessonName}</span> <span className="non-mobile-separate">{lesson.name}</span></h4>
                        <h5 className="mobile-column"><span>{lesson.location}</span></h5>
                    </div>
                    <div className="flex-divider" />
                    <div className="schedule-lesson-time">
                        <h5>{lesson.callTime}</h5>
                    </div>
                </div>
            </>
        )
    })

    return (
        <>
            <div className={"schedule-lessons-container " + (pair.current ? "lesson-current" : "")}>
                {lessonElements}
            </div>
        </>
    );
}