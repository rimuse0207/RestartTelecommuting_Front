import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Axios_Get_Moduls, Axios_Post_Moduls, request } from '../../../../API/indexs';
import Toggle from './Toggle/Toggle';
import Select from 'react-select';
import { UserAccess_Table_State_Types, User_Option_Array_Types } from './UserAccessTable';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { IoClose, IoAddOutline } from 'react-icons/io5';
import { toast } from '../../../../ToastMessage/ToastManager';

const UserAccessTableMainDivBox = styled.div`
    font-size: 0.8em;
    table.type09 {
        border: none !important;
        width: 100%;
        font-size: 0.8em;
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        tr {
            :hover {
                cursor: pointer;
                background-color: #f3f6f7;
            }
        }
    }
    thead {
        font-size: 1.1em;
    }
    table.type09 thead th {
        padding: 5px;
        font-weight: bold;
        vertical-align: center;
        color: #369;
        border: none;
        background-color: #fff;
        border-bottom: 3px solid #036;
        font-size: 1em;
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: center;
        border: none;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
        font-size: 0.8em;
    }
    table.type09 td {
        width: 300px;
        padding: 10px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 0.9em;
    }
    .User_Select_Box_Container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        .Not_Include_Team {
            width: 40%;
            border: 1px solid lightgray;
            min-height: 40vh;
        }
        .Include_Team {
            width: 40%;
            border: 1px solid lightgray;
            min-height: 40vh;
        }
        h3 {
            margin-bottom: 20px;
            text-align: center;
        }
        .Department_Container {
            display: flex;
            padding: 10px;
            min-width: 100px;
            border: 1px dashed lightgray;
            font-weight: bolder;
            justify-content: space-between;
            .Department_Icons {
                color: red;
                font-size: 1.2em;
                :hover {
                    cursor: pointer;
                }
            }
        }
    }
`;

type User_Department_Access_Table_State = {
    id: string;
    show_teams: string;
};

type Now_Team_List_Types = {
    indexs: number;
    team_name: string;
};

const UserDepartmentAccessTable = () => {
    const [User_Department_Access_Table_State, setUser_Department_Access_Table_State] = useState<User_Department_Access_Table_State[]>([]);
    const [User_Option_Array, setUser_Option_Array] = useState<User_Option_Array_Types[]>([]);
    const [Select_Id, setSelect_Id] = useState<User_Option_Array_Types | null>(null);
    const [Now_Team_List, setNow_Team_List] = useState<Now_Team_List_Types[]>([
        {
            indexs: 1,
            team_name: '경영지원',
        },
        {
            indexs: 2,
            team_name: 'GRINDER',
        },
        {
            indexs: 3,
            team_name: 'DICER',
        },
        {
            indexs: 4,
            team_name: 'LASER',
        },
        {
            indexs: 5,
            team_name: '아산CE',
        },
        {
            indexs: 6,
            team_name: '장비영업',
        },
        {
            indexs: 7,
            team_name: '영업기술',
        },
        {
            indexs: 8,
            team_name: '부품소재',
        },
        {
            indexs: 9,
            team_name: 'OEM',
        },
        {
            indexs: 10,
            team_name: 'CE지원팀',
        },
    ]);

    // 부서 권한 등록
    const HandleAddDepartmentAdmin = async (data: Now_Team_List_Types) => {
        try {
            const HandleAddDepartmentAdmin_Axios = await Axios_Post_Moduls('/users/HandleAddDepartmentAdmin', {
                data,
                Select_Id,
            });
            if (HandleAddDepartmentAdmin_Axios) {
                setUser_Department_Access_Table_State(User_Department_Access_Table_State.concat(HandleAddDepartmentAdmin_Axios));
                toast.show({
                    title: '부서권한 등록 처리 완료 ',
                    content: '부서권한을 등록 처리 하였습니다.',
                    duration: 6000,
                    DataSuccess: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // 부서 권한 삭제
    const HandleDeleteDepartmentAdmin = async (data: User_Department_Access_Table_State) => {
        try {
            const HandleDeleteDepartmentAdmin_Axios = await Axios_Post_Moduls('/users/HandleDeleteDepartmentAdmin', {
                data,
            });
            if (HandleDeleteDepartmentAdmin_Axios) {
                setUser_Department_Access_Table_State(
                    User_Department_Access_Table_State.filter(item => (item.show_teams === data.show_teams ? '' : item))
                );
                toast.show({
                    title: '부서권한 삭제 처리 완료 ',
                    content: '등록된 부서권한을 삭제 처리 하였습니다.',
                    duration: 6000,
                    DataSuccess: true,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Getting_User_Options_Array = async () => {
        try {
            const Getting_User_Options_Array_Axios = await Axios_Get_Moduls('/users/Getting_User_Options_Array', {});
            if (Getting_User_Options_Array_Axios) {
                setUser_Option_Array(Getting_User_Options_Array_Axios);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const Getting_UserDepartmentAccessTable_Data_Axios_Func = async () => {
        try {
            const a = Select_Id ? Select_Id.value : null;
            const Getting_UserDepartmentAccessTable_Data_Axios_Func_Axios = await Axios_Get_Moduls(
                '/users/Getting_UserDepartmentAccessTable_Data_Axios_Func',
                {
                    Select_Id: a,
                }
            );

            if (Getting_UserDepartmentAccessTable_Data_Axios_Func_Axios) {
                setUser_Department_Access_Table_State(Getting_UserDepartmentAccessTable_Data_Axios_Func_Axios);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (Select_Id) Getting_UserDepartmentAccessTable_Data_Axios_Func();
    }, [Select_Id]);

    useEffect(() => {
        Getting_User_Options_Array();
    }, []);

    return (
        <UserAccessTableMainDivBox>
            <div>
                <Select value={Select_Id} options={User_Option_Array} onChange={e => setSelect_Id(e)} isClearable={true}></Select>
            </div>
            {Select_Id ? (
                <div className="User_Select_Box_Container">
                    <div className="Not_Include_Team">
                        <h3>미등록</h3>
                        <ul>
                            {Now_Team_List.map(list => {
                                return User_Department_Access_Table_State.some(
                                    item => item.show_teams.toLocaleUpperCase() === list.team_name.toLocaleUpperCase()
                                ) ? (
                                    ''
                                ) : (
                                    <li className="Department_Container">
                                        <div>{list.team_name}</div>
                                        <div
                                            className="Department_Icons"
                                            style={{ color: 'green' }}
                                            onClick={() => HandleAddDepartmentAdmin(list)}
                                        >
                                            <IoAddOutline></IoAddOutline>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div>
                        <BiLeftArrow></BiLeftArrow>
                        <BiRightArrow></BiRightArrow>
                    </div>
                    <div className="Include_Team">
                        <h3>등록</h3>
                        <ul>
                            {User_Department_Access_Table_State.map(list => {
                                return (
                                    <li className="Department_Container">
                                        <div>{list.show_teams}</div>
                                        <div className="Department_Icons" onClick={() => HandleDeleteDepartmentAdmin(list)}>
                                            <IoClose></IoClose>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </UserAccessTableMainDivBox>
    );
};

export default UserDepartmentAccessTable;
