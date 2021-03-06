import React, { useState } from 'react';
import styled from 'styled-components';
import { Nav_AccessTokenTypes } from '../../../models/Nav_Access_Redux/Nav_Access_Redux';

import { OneParamsPost } from '../../API/POSTApi/PostApi';
import AdminContentMainPage from './AdminContent/AdminContentMainPage';

const AccessInfoMainPageMainDivBox = styled.div`
    border: 1px solid black;
    .Access_Float_Cotainer {
        width: 100%;
        min-height: 99vh;
        padding-bottom: 50px;
        ::after {
            clear: both;
            display: block;
            content: '';
        }
        .Access_Float_Left {
            float: left;
            border: 1px solid black;
            width: 300px;
            min-height: 600px;
            .AccessMenu {
                margin-top: 20px;
                h4 {
                    margin-left: 10px;
                    font-size: 1.1em;
                }
                ul {
                    margin-left: 20px;
                    li {
                        margin-top: 10px;
                        margin-bottom: 10px;
                        :hover {
                            cursor: pointer;
                            color: blue;
                        }
                    }
                }
            }
        }
        .Access_Float_Right {
            float: right;
            border: 1px solid black;
            width: calc(100vw - 350px);
            min-height: 600px;
        }
    }
`;
export type userDataTypes = {
    id: string;
    indexs: number;
    name: string;
    team: string;
    position: string;
    Nav_TeamLeaderCalendarAccess: number;
    Nav_TeamLeaderTeleAccess: number;
    Nav_TeamLeaderOTAccess: number;
    Nav_TeamLeaderBusinessAccess: number;
    Nav_TeamLeaderBusinessExcelAccess: number;
    Nav_TeamLeaderMonthOTAccess: number;
    Nav_TeamLeaderFoodAccess: number;

    TeleLeaderAccess: number;
    BeforeOTLeaderAccess: number;
    AfterOTLeaderAccess: number;
    FoodLeaderAccess: number;
    USBApplyLeaderAccess: number;
    BusinessAccess: number;
    BusinessAdminAccess: number;
};
const AccessInfoMainPage = () => {
    const [NavAccess_list, setNavAccess_list] = useState([
        { name: '?????? ?????? ?????? ??????', value: 'Nav_TeamLeaderCalendarAccess', selected: false },
        { name: '?????? ?????? ??????', value: 'Nav_TeamLeaderTeleAccess', selected: false },
        { name: '?????? OT ??????', value: 'Nav_TeamLeaderOTAccess', selected: false },
        { name: '?????? ?????? ??????', value: 'Nav_TeamLeaderBusinessAccess', selected: false },
        { name: 'ERP ?????? ?????????', value: 'Nav_TeamLeaderBusinessExcelAccess', selected: false },
        { name: '?????? ?????? ?????????', value: 'Nav_TeamLeaderMonthOTAccess', selected: false },
        { name: '?????? ?????? ?????? ??????', value: 'Nav_TeamLeaderFoodAccess', selected: false },
    ]);

    const [DataAccess_list, setDataAccess_list] = useState([
        { name: '???????????? ?????????', value: 'TeleLeaderAccess', selected: false },
        { name: '?????? OT ?????????', value: 'BeforeOTLeaderAccess', selected: false },
        { name: '?????? OT ?????????', value: 'AfterOTLeaderAccess', selected: false },
        { name: '???????????? ?????????', value: 'FoodLeaderAccess', selected: false },
        { name: 'USB?????? ?????????', value: 'USBApplyLeaderAccess', selected: false },
        { name: '?????????????????? ?????????', value: 'BusinessAccess', selected: false },
        { name: '???????????? ?????? ?????????', value: 'BusinessAdminAccess', selected: false },
    ]);

    const [NavSelected, setNavSelected] = useState('');
    const [userData, setUserData] = useState<userDataTypes[]>([]);

    const handleClicks = async (ClickData: string, type: string) => {
        try {
            setNavSelected(ClickData);
            const paramsData = {
                ClickData,
                type,
            };
            const GetuserDataFromServer = await OneParamsPost(`/AdminInsertLogin_app_server/getting_person`, paramsData);
            if (GetuserDataFromServer.data.dataSuccess) {
                console.log(GetuserDataFromServer);
                setUserData(GetuserDataFromServer.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AccessInfoMainPageMainDivBox>
            <div>
                <div className="Access_Float_Cotainer">
                    <div className="Access_Float_Left">
                        <div className="AccessMenu">
                            <h4>???????????? ??????</h4>
                            <ul>
                                {NavAccess_list.map((list, i) => {
                                    return (
                                        <li
                                            style={list.value === NavSelected ? { color: 'blue', fontWeight: 'bolder' } : {}}
                                            onClick={() => handleClicks(list.value, 'Menu')}
                                        >
                                            {list.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="AccessMenu">
                            <h4>??????????????? ??????</h4>
                            <ul>
                                {DataAccess_list.map((list, i) => {
                                    return (
                                        <li style={list.value === NavSelected ? { color: 'blue', fontWeight: 'bolder' } : {}}>
                                            {list.name}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="Access_Float_Right">
                        <AdminContentMainPage userData={userData}></AdminContentMainPage>
                    </div>
                </div>
            </div>
        </AccessInfoMainPageMainDivBox>
    );
};

export default AccessInfoMainPage;
