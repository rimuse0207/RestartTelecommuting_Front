import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from '../../../../ToastMessage/ToastManager';
const AdminDashBoardInsertUsersTableMainDivBox = styled.div`
    min-height: 500px;
    table.type09 {
        width: 500px;
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
        font-size: 0.9em;
    }
    table.type09 thead th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        border: none;
        background-color: #fff;
        border-bottom: 3px solid #036;
        font-size: 0.9em;
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border: none;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
        font-size: 0.9em;
    }
    table.type09 td {
        width: 350px;
        padding: 10px;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        font-size: 0.9em;
    }
    .SubmitButtonDiv {
        width: 500px;
        text-align: right;
        margin-top: 20px;

        button {
            border: none;
            width: 150px;
            height: 40px;
            background-color: #369;
            color: #fff;
            font-size: 1em;
            font-weight: bolder;
            border-radius: 5px;
            :hover {
                cursor: pointer;
                background-color: #efefef;
                color: #369;
            }
        }
    }

    .InputCheckTBody {
        td {
            padding: 10px !important;
        }
        select {
            margin-left: 20px;
            height: 30px;
            border: none;
            border-bottom: 2px solid #168;
            padding-left: 20px;
            width: 80%;
        }
        input {
            margin-left: 20px;
            height: 30px;
            border: none;
            border-bottom: 2px solid #168;
            padding-left: 20px;
            width: 80%;
            :focus {
                animation-name: FofusOnandlineOn;
                animation-duration: 0.5s;
                outline: none;
                border-bottom: 2px solid #e08d8d;
                @keyframes FofusOnandlineOn {
                    from {
                        width: 10%;
                    }
                    to {
                        width: 80%;
                    }
                }
            }
        }
    }
`;

const AdminDashBoardInsertUsersTable = () => {
    const [UpdateUsersData, setUpdateUserData] = useState({
        name: '',
        company: 'EXICON',
        team: '',
        position: '',
        id: '',
    });

    const handleSaveData = async () => {
        try {
            const SaveLoginInfoDataFromServer = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/AdminInsertLogin_app_server/InsertLoginInfoData`,
                {
                    UpdateUsersData,
                }
            );

            if (SaveLoginInfoDataFromServer.data.dataSuccess) {
                toast.show({
                    title: `????????? ?????? ??????`,
                    content: `${UpdateUsersData.name}?????? 
                    ID:'${UpdateUsersData.id}' 
                    Password:'${SaveLoginInfoDataFromServer.data.Newpassword}' ?????????. `,
                    duration: 6000,
                    DataSuccess: true,
                });
                setUpdateUserData({
                    name: '',
                    company: UpdateUsersData.company,
                    team: '',
                    position: '',
                    id: '',
                });
            } else {
                toast.show({
                    title: '????????? ?????? ??????',
                    content: `IT?????? ?????? ????????????.`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '????????? ?????? ??????',
                content: `IT?????? ?????? ????????????.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    return (
        <AdminDashBoardInsertUsersTableMainDivBox>
            <div>
                <table className="type09">
                    <thead>
                        <tr>
                            <th scope="cols"></th>

                            <th scope="cols">????????? ?????? ??????</th>
                        </tr>
                    </thead>
                    <tbody className="InputCheckTBody">
                        <tr>
                            <th scope="row">??????</th>

                            <td>
                                <input
                                    value={UpdateUsersData.name}
                                    placeholder="????????? ... "
                                    onChange={e => setUpdateUserData({ ...UpdateUsersData, name: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">??????</th>

                            <td>
                                <input
                                    value={UpdateUsersData.position}
                                    placeholder="??????, ?????? ..."
                                    onChange={e => setUpdateUserData({ ...UpdateUsersData, position: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">??????</th>

                            <td>
                                <select onChange={e => setUpdateUserData({ ...UpdateUsersData, company: e.target.value })}>
                                    <option value="EXICON">EXICON</option>
                                    <option value="YIKC">YIKC</option>
                                </select>
                                {/* <input
                                    value={UpdateUsersData.company}
                                    placeholder="DHK, YIKC ...."
                                    onChange={e => setUpdateUserData({ ...UpdateUsersData, company: e.target.value })}
                                ></input> */}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">??????</th>

                            <td>
                                <input
                                    value={UpdateUsersData.team}
                                    placeholder="????????????, S/W ...."
                                    onChange={e => setUpdateUserData({ ...UpdateUsersData, team: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Email(ID)</th>
                            <td>
                                <input
                                    value={UpdateUsersData.id}
                                    placeholder="sjyoo@dhk.co.kr"
                                    onChange={e => setUpdateUserData({ ...UpdateUsersData, id: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="SubmitButtonDiv">
                    <button onClick={handleSaveData}>??????</button>
                </div>
            </div>
        </AdminDashBoardInsertUsersTableMainDivBox>
    );
};

export default AdminDashBoardInsertUsersTable;
