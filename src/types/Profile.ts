export interface Profile {
    avatarUrl: string;
    lastName: string;
    firstName: string;
    middleName: string;
    type: ProfileType;

    group: string;
    averageScore: number;

    averageScores: LessonScore[];
    lastScores: LessonScore[];
}

export interface LessonScore {
    lesson: string;
    score: number;
}

export enum ProfileType {
    Student,
    Teacher,
    Administrator
}

export const ProfileTypeDescription: { [key in ProfileType]: string } = {
    [ProfileType.Student]: "Студент",
    [ProfileType.Teacher]: "Преподаватель",
    [ProfileType.Administrator]: "Администратор"
};