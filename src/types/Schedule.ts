export interface ScheduleEntry {
    callNumber: number;

    location: string;
    lessonName: string;
    name: string;

    callTime: string;
}

export interface SchedulePairEntry {
    lessons: (ScheduleEntry | null)[];
    current: boolean;
}