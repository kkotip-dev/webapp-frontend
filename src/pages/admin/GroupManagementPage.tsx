import React, { useEffect, useReducer, useState } from "react";

import { Button, DatePicker, Flex, Form, Input, InputNumber, Radio, Segmented, Select, Space, Spin, Splitter, Table, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import { MdAdd } from "react-icons/md";

import * as dayjs from "dayjs";

import { authenticatedFetch } from "../../auth/AuthenticatedFetch";
import { BACKEND_URL } from "../../AppConsts";
import { StudentStatistic, VISTIS_COLOR as VISITS_COLOR, VISITS_DESCRIPTION } from "../../types/StudentStatistic";
import { NewStudent } from "../../types/NewStudent";
import useNotification from "antd/es/notification/useNotification";

export function GroupManagamentPage({ }: {}) {
    const [loading, setLoading] = useState(true);

    const [groups, setGroups] = useState<(string | undefined)[] | undefined>(undefined);

    const [selectedGroup, setSelectedGroup] = useState<string | undefined>(groups?.[1]);

    const rightPanelElement = (() => {
        if (selectedGroup === "add-new-group") {
            return <AddGroupPanel />
        }
        else {
            return <ShowGroupPanel key={`group-info-${selectedGroup}`} group={selectedGroup!} />
        }
    })();

    useEffect(() => {
        getGroupsList()
            .then((groups) => {
                setGroups([undefined, ...groups]);
                setSelectedGroup(groups[0]);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Splitter key="group-management-page-splitter">
                <Splitter.Panel
                    min="15%"
                    max="25%"
                    defaultSize="15%"
                    style={{
                        padding: "8px"
                    }}
                >
                    {
                        loading &&
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
                        !loading &&
                        <Segmented
                            key="group-selector-segmented"
                            vertical
                            size="large"
                            style={{
                                width: "100%",
                                padding: "0",
                            }}
                            value={selectedGroup}
                            onChange={(value) => {
                                if (value === undefined) {
                                    console.error(value);
                                    return;
                                }
                                setSelectedGroup(value);
                            }}
                            options={(() => {
                                return groups?.map((group) => {
                                    return {
                                        label: (
                                            <>
                                                <div
                                                    key={group === undefined ? "add-group-item" : `group-item-${group}`}
                                                    className={group === undefined ? "add-group-segmented" : undefined}
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignContent: "center",
                                                        padding: "8px",
                                                    }}
                                                >
                                                    {
                                                        group === undefined &&
                                                        <MdAdd size={18} style={{ paddingBottom: "1px" }} />
                                                    }
                                                    <span>{group ?? "Новая группа"}</span>
                                                </div>
                                            </>
                                        ),
                                        value: group ?? "add-new-group"
                                    }
                                })
                                    ?? [undefined]
                            })()}
                        />
                    }
                </Splitter.Panel>
                <Splitter.Panel style={{ padding: "8px" }}>
                    {
                        loading &&
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
                        !loading &&
                        rightPanelElement
                    }
                </Splitter.Panel>
            </Splitter >
        </>
    );
}

function ShowGroupPanel({ group }: { group: string }) {
    enum State {
        Info,
        AddStudent
    };
    const [state, setState] = useState<State>(State.Info);
    const [notificationApi, notificationContextHolder] = useNotification();

    const [addStudentForm] = useForm();

    const [students, setStudents] = useState<StudentStatistic[] | undefined>(undefined);
    const [studentsReloaded, reloadStudents] = useReducer(x => x + 1, 0);


    useEffect(() => {
        getStudentStatistic(group)
            .then((statistics) => {
                setStudents(statistics);
            })
    }, [studentsReloaded]);


    if (state === State.Info) {
        if (students === undefined) {
            return (
                <>
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
                </>
            )
        }

        return (
            <>
                <Space
                    direction="vertical"
                    style={{
                        width: "100%"
                    }}
                >
                    <Button
                        variant="solid"
                        color="primary"
                        icon={<MdAdd size={24} />}
                        onClick={() => {
                            setState(State.AddStudent);
                        }}
                    >
                        Добавить студента
                    </Button>
                    <Table
                        bordered
                        dataSource={students?.map(x => { return { key: x.id, ...x } })}
                        pagination={false}
                    >
                        <Table.Column
                            key="name"
                            dataIndex="name"
                            title="Имя"
                        />
                        <Table.Column
                            key="contacts"
                            dataIndex="email"
                            title="Контакты"
                        />
                        <Table.Column
                            key="lastScores"
                            dataIndex="lastScores"
                            title="Успеваемость"
                            render={(value) => {
                                return (
                                    <Flex gap="4px">
                                        {
                                            // TODO: цвета оценок
                                            value.map((score, i) => {
                                                return (
                                                    <div
                                                        key={`score-${value.key}-${i}-${score}`}
                                                        style={{
                                                            padding: "4px 8px",
                                                            borderRadius: "1000px",
                                                            backgroundColor: "var(--var-primary-color)",
                                                            color: "var(--var-background-color)"
                                                        }}
                                                    >
                                                        {score}
                                                    </div>
                                                )
                                            })
                                        }
                                    </Flex>
                                );
                            }}
                        />
                        <Table.Column
                            key="visits"
                            dataIndex="visits"
                            title="Посещаемость"
                            render={(value) => {
                                return (
                                    <Tag color={VISITS_COLOR[value]} key={value}>
                                        {VISITS_DESCRIPTION[value]}
                                    </Tag>
                                )
                            }}
                        />
                    </Table>
                </Space>
            </>
        );
    }
    else if (state === State.AddStudent) {
        return (
            <>
                {notificationContextHolder}
                <div
                    style={{
                        display: "block",
                        maxWidth: "700px",
                        margin: "auto"
                    }}
                >
                    <Form
                        form={addStudentForm}
                        size="large"
                        layout="vertical"
                        onFinish={(values) => {
                            addStudent({
                                ...values,
                                birthDate: dayjs(values.birthDate).format("YYYY-MM-DD"),
                                groupId: 1
                            })
                                .then(() => {
                                    notificationApi.success({
                                        message: "Успешно!",
                                        description: "Студент добавлен в группу"
                                    });
                                    reloadStudents();
                                })
                                .catch((error) => {
                                    console.error(error);
                                    notificationApi.error({
                                        message: "Ошибка!",
                                        description: "Произошла ошибка при добавлении студента, проверьте данные"
                                    });
                                });
                        }}
                    >
                        <Flex
                            gap="8px"
                            style={{
                                width: "100%"
                            }}
                        >
                            <Form.Item
                                label="Фамилия"
                                name="lastName"
                                rules={[{ required: true, message: "Введите фамилию!" }]}
                                className="flex-even"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Имя"
                                name="firstName"
                                rules={[{ required: true, message: "Введите фамилию!" }]}
                                className="flex-even"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Отчество"
                                name="middleName"
                                className="flex-even"
                            >
                                <Input />
                            </Form.Item>
                        </Flex>
                        <Flex
                            gap="8px"
                            style={{
                                width: "100%"
                            }}
                        >
                            <Form.Item
                                label="Дата рождения"
                                name="birthDate"
                                rules={[{ required: true, message: "Введите фамилию!" }]}
                                className="flex-even"
                            >
                                <DatePicker
                                    format="DD.MM.YYYY"
                                    style={{
                                        width: "100%"
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="E-Mail"
                                name="email"
                                className="flex-even"
                                rules={[{ required: true, message: "Введите E-Mail!" }]}
                            >
                                <Input inputMode="email" />
                            </Form.Item>
                        </Flex>
                        <Form.Item>
                            <Space>
                                <Button
                                    variant="solid"
                                    color="primary"
                                    htmlType="submit"
                                >
                                    Добавить
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="danger"
                                    htmlType="button"
                                    onClick={() => {
                                        addStudentForm.resetFields();
                                    }}
                                >
                                    Очистить
                                </Button>
                                <Button
                                    variant="outlined"
                                    htmlType="button"
                                    onClick={() => {
                                        setState(State.Info);
                                    }}
                                >
                                    Назад
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>

                </div >
            </>
        );
    }
}

function AddGroupPanel({ }: {}) {
    const [form] = useForm();

    const [teachers, setTeachers] = useState<string[] | undefined>(undefined);

    useEffect(() => {
        getTeachers()
            .then((teachers) => {
                setTeachers(teachers);
            })
    }, []);

    return (
        <>
            <div
                style={{
                    display: "block",
                    maxWidth: "700px",
                    margin: "auto",

                }}
            >
                <Form
                    form={form}
                    size="large"
                    layout="vertical"
                >
                    <Form.Item
                        label="Название"
                        name="name"
                        rules={[{ required: true, message: "Введите название группы!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Space size="middle">
                        <Form.Item
                            label="Период обучения"
                            name="period"
                            rules={[{ required: true, message: "Введите период обучения!" }]}
                        >
                            <DatePicker.RangePicker format="DD.MM.YYYY" />
                        </Form.Item>
                        <Form.Item
                            label="Тип обучения"
                            name="type"
                            rules={[{ required: true, message: "Укажите тип обучения!" }]}
                        >
                            <Radio.Group
                                options={[
                                    { label: "Очное", value: "fulltime" },
                                    { label: "Заочное", value: "correspondance" },
                                ]}
                            />
                        </Form.Item>
                    </Space>
                    <Form.Item
                        label="Куратор"
                        name="curator"
                        rules={[{ required: true, message: "Укажите куратора!" }]}
                    >
                        <Select
                            showSearch
                            loading={teachers === undefined}
                            options={teachers?.map((teacher) => {
                                return {
                                    label: teacher,
                                    value: teacher
                                }
                            })}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button variant="solid" color="primary" htmlType="submit">
                                Добавить
                            </Button>
                            <Button variant="outlined" color="danger" htmlType="button" onClick={() => {
                                form.resetFields();
                            }}>
                                Очистить
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

async function getGroupsList(): Promise<string[]> {
    return authenticatedFetch(`${BACKEND_URL}/api/groups`)
        .then((response) => {
            return response.json();
        });
}

async function getStudentStatistic(groupName: string): Promise<StudentStatistic[]> {
    return authenticatedFetch(`${BACKEND_URL}/api/group/${groupName}`)
        .then((response) => {
            return response.json();
        })
}

async function getTeachers(): Promise<string[] | undefined> {
    return authenticatedFetch(`${BACKEND_URL}/api/teachers`)
        .then((response) => {
            return response.json();
        })
}

async function addStudent(student: NewStudent): Promise<void> {
    return authenticatedFetch(`${BACKEND_URL}/api/student`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    }).then(() => {
        return;
    })
}