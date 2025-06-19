import React, { useEffect, useState } from "react";

import { Flex, Segmented, Spin, Splitter } from "antd";
import { MdAdd } from "react-icons/md";

import { authenticatedFetch } from "../../auth/AuthenticatedFetch";
import { BACKEND_URL } from "../../AppConsts";

export function TeachersManagementPage({ }: {}) {
    const [teachers, setTeachers] = useState<string[] | undefined>(undefined);
    const [selectedTeacher, setSelectedTeacher] = useState<string | undefined>(undefined);

    const rightPanelElement = (() => {
        if (selectedTeacher === undefined) {
            return (
                <AddTeacherPanel />
            );
        }
        return (
            <TeacherInfoPanel teacher={selectedTeacher} />
        );
    })();

    useEffect(() => {
        getTeachers()
            .then((teachers) => {
                setTeachers(teachers);
            });
    }, []);

    return (
        <>
            <Splitter key="teacher-management-page-splitter">
                <Splitter.Panel
                    min="15%"
                    max="25%"
                    defaultSize="15%"
                    style={{
                        padding: "8px"
                    }}
                >
                    {
                        teachers === undefined &&
                        <Flex
                            justify="center"
                            align="center"
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <Spin />
                        </Flex>
                    }
                    {
                        teachers !== undefined &&
                        <Segmented
                            key="teacher-selector-segmented"
                            vertical
                            size="large"
                            style={{
                                width: "100%",
                                padding: "0",
                            }}
                            value={selectedTeacher}
                            onChange={(value) => {
                                if (value === undefined) {
                                    console.error(value);
                                    return;
                                }
                                setSelectedTeacher(value);
                            }}
                            options={(() => {
                                return teachers?.map((teacher) => {
                                    return {
                                        label: (
                                            <>
                                                <div
                                                    key={teacher === undefined ? "add-teacher-item" : `teacher-${teacher}`}
                                                    className={teacher === undefined ? "add-teacher-segmented" : undefined}
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignContent: "center",
                                                        padding: "8px",
                                                    }}
                                                >
                                                    {
                                                        teacher === undefined &&
                                                        <MdAdd size={18} style={{ paddingBottom: "1px" }} />
                                                    }
                                                    <span>{teacher ?? "Новая группа"}</span>
                                                </div>
                                            </>
                                        ),
                                        value: teacher ?? "add-new-teacher"
                                    }
                                })
                                    ?? [undefined]
                            })()}
                        />
                    }
                </Splitter.Panel>
                <Splitter.Panel style={{ padding: "8px" }}>
                    {
                        teachers === undefined &&
                        <Flex
                            align="center"
                            justify="center"
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        >
                            <Spin />
                        </Flex>
                    }

                    {
                        teachers !== undefined &&
                        rightPanelElement
                    }
                </Splitter.Panel>
            </Splitter >
        </>
    );
}

function TeacherInfoPanel({ teacher }: { teacher: string }) {
    return (
        <></>
    );
}

function AddTeacherPanel({ }: {}) {
    return (
        <></>
    );
}

async function getTeachers(): Promise<string[] | undefined> {
    return authenticatedFetch(`${BACKEND_URL}/api/teachers`)
        .then((response) => {
            return response.json();
        })
}