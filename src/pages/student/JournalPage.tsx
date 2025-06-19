import React, { useEffect, useState } from "react";

import { MdSchedule } from "react-icons/md";

import { DaySelector } from "../../components/DaySelector";
import { JournalEntry } from "../../types/Journal";
import { FlexDivider } from "../../components/FlexDivider";
import { authenticatedFetch } from "../../auth/AuthenticatedFetch";
import { BACKEND_URL } from "../../AppConsts";
import { Spin } from "antd";

export function JournalPage({ }: {}) {
    const [error, setError] = useState(false);

    const [journalEntries, setJournalEntries] = useState<JournalEntry[] | undefined>(undefined);

    const [date, setDate] = useState<Date>(new Date());

    const updateJournal = () => {
        getJournalEntries(date).then((journalEntries) => {
            setJournalEntries(journalEntries);
        });
    }

    useEffect(() => {
        updateJournal();
    }, []);

    useEffect(() => {
        updateJournal();
    }, [date]);

    return (
        <>
            <DaySelector value={date} onChange={(date) => {
                setDate(date);
            }} />
            <FlexDivider />
            {
                !journalEntries &&
                <Spin />
            }
            {
                journalEntries &&
                <div className="journal-entries-container">
                    {
                        journalEntries.map((entry) => {
                            return <JournalEntry entry={entry} />
                        })
                    }
                </div>
            }
        </>
    );
}

function JournalEntry({ entry }: { entry: JournalEntry }) {
    return (
        <>
            <div key={entry.lesson + entry.teacher + entry.lessonDate} className="journal-entry-container">
                <h3>{entry.lesson} - {entry.teacher}</h3>
                <span><MdSchedule size={24} /> {new Date(entry.lessonDate).toLocaleDateString()}</span>
                <p>{entry.description.split('\n').map((line) => <>{line}<br /></>)}</p>
            </div>
        </>
    );
}

async function getJournalEntries(date: Date): Promise<JournalEntry[]> {
    return authenticatedFetch(`${BACKEND_URL}/api/journal/${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`)
        .then((response) => {
            return response.json();
        });
}