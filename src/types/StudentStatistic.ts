import { TagProps } from "antd";

import { EnumMap } from "../utils/EnumUtils";

export interface StudentStatistic {
    id: number;
    name: string;
    email: string;
    lastScores: number[];
    visits: Visits;
}

export enum Visits {
    None,
    Bad,
    Partial,
    Full
}

export const VISITS_DESCRIPTION: EnumMap<Visits, string> = {
    [Visits.None]: "",
    [Visits.Bad]: "ПЛОХАЯ",
    [Visits.Partial]: "ЧАСТИЧНАЯ",
    [Visits.Full]: "ПОЛНАЯ"
}

export const VISTIS_COLOR: EnumMap<Visits, TagProps["color"]> = {
    [Visits.None]: undefined,
    [Visits.Bad]: "volcano",
    [Visits.Partial]: "orange",
    [Visits.Full]: "green"
} 