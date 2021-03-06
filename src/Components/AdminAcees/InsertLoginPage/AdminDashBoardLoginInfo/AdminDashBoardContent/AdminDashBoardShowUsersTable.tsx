import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { toast } from '../../../../ToastMessage/ToastManager';
const AdminDashBoardShowUsersTableMainDivBox = styled.div`
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
    table.type09 thead th {
        padding: 5px;
        font-weight: bold;
        vertical-align: center;
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
    .DeleteButton {
        :hover {
            cursor: pointer;
            color: red;
        }
    }
`;

type AdminDashBoardShowUsersTableProps = {
    setStaticsNaviButton: (data: string) => void;
    setSelectedUsersData: any;
};

const AdminDashBoardShowUsersTable = ({ setStaticsNaviButton, setSelectedUsersData }: AdminDashBoardShowUsersTableProps) => {
    const [getLoginInfoData, setGetLoginInfoData] = useState([]);
    const [SearchNames, setSearchNames] = useState('');
    const [SearchCompanys, setSearchCompanys] = useState('');
    const [SearchEmail, setSearchEmail] = useState('');
    const [LoadingCheck, setLoadingCheck] = useState(true);
    useEffect(() => {
        getLoginInfoDataAxios();
    }, []);

    const getLoginInfoDataAxios = async () => {
        try {
            setLoadingCheck(false);
            const GetLoginInfoDataFromServer = await axios.get(`${process.env.REACT_APP_DB_HOST}/AdminInsertLogin_app_server/DataGetSome`);
            if (GetLoginInfoDataFromServer.data.dataSuccess) {
                setGetLoginInfoData(GetLoginInfoDataFromServer.data.datas);
                setTimeout(() => {
                    setLoadingCheck(true);
                }, 800);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleResetPassword = async (data: { name: string; company: string; team: string; position: string; id: string }) => {
        try {
            const ResetChangePasswordFromServer = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/AdminInsertLogin_app_server/ResetPassword`,
                {
                    data,
                }
            );
            if (ResetChangePasswordFromServer.data.dataSuccess) {
                toast.show({
                    title: `???????????? ????????? ??????`,
                    content: `${data.name}?????? ??????????????? ${ResetChangePasswordFromServer.data.Newpassword}  ?????????.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '???????????? ????????? ??????',
                    content: `IT?????? ?????? ????????????.`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: '???????????? ????????? ??????',
                content: `IT?????? ?????? ????????????. ?????? ?????? ??????`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleDeleteData = async (data: { name: string; company: string; team: string; position: string; id: string }) => {
        console.log(data);
        try {
            const ConfrimCheck = window.confirm(`${data.name}?????? ???????????? ?????? ???????????????????`);
            if (!ConfrimCheck) return;
            const ResetChangePasswordFromServer = await axios.post(
                `${process.env.REACT_APP_DB_HOST}/AdminInsertLogin_app_server/DeleteData`,
                {
                    data,
                }
            );
            if (ResetChangePasswordFromServer.data.dataSuccess) {
                toast.show({
                    title: `????????? ?????? ??????`,
                    content: `${data.company}??? ${data.name}?????? ???????????? ?????? ???????????????.`,
                    duration: 6000,
                    DataSuccess: true,
                });
                getLoginInfoDataAxios();
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
                content: `IT?????? ?????? ????????????. ?????? ?????? ??????`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleDoubleClicks = (data: { name: string; company: string; team: string; position: string; id: string }) => {
        setSelectedUsersData(data);
        setStaticsNaviButton('UpdateUsers');
    };

    return (
        <AdminDashBoardShowUsersTableMainDivBox>
            <div>
                <div style={{ textAlign: 'end', fontSize: '0.8em' }}>*?????? ????????? ?????? ?????? ???????????? ???????????????.</div>
                {LoadingCheck ? (
                    <table className="type09">
                        <thead>
                            <tr>
                                <th scope="cols">
                                    <div>??????</div>
                                    <div>
                                        <input
                                            type="text"
                                            value={SearchNames}
                                            onChange={e => setSearchNames(e.target.value)}
                                            placeholder="?????? ??????...."
                                        ></input>
                                    </div>
                                </th>
                                <th scope="cols">
                                    <div>??????</div>
                                    <div>
                                        <input
                                            type="text"
                                            value={SearchCompanys}
                                            onChange={e => setSearchCompanys(e.target.value)}
                                            placeholder="?????? ??????...."
                                        ></input>
                                    </div>
                                </th>
                                <th scope="cols">??????</th>
                                <th scope="cols">??????</th>
                                <th scope="cols">
                                    <div>Email(ID)</div>
                                    <div>
                                        <input
                                            type="text"
                                            value={SearchEmail}
                                            onChange={e => setSearchEmail(e.target.value)}
                                            placeholder="????????? ??????...."
                                        ></input>
                                    </div>
                                </th>
                                <th scope="cols">???????????? ?????????</th>
                                <th scope="cols">??????</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getLoginInfoData
                                .filter((item: { name: string }, j) => item.name.toLowerCase().includes(SearchNames.toLowerCase()))
                                .filter((item: { company: string }, j) => item.company.toLowerCase().includes(SearchCompanys.toLowerCase()))
                                .filter((item: { id: string }, j) => item.id.toLowerCase().includes(SearchEmail.toLowerCase()))
                                .map((list: { name: string; company: string; team: string; position: string; id: string }, i) => {
                                    return (
                                        <tr onDoubleClick={() => handleDoubleClicks(list)} key={list.id}>
                                            <th scope="row">{list.name}</th>
                                            <td>{list.company}</td>
                                            <td>{list.team}</td>
                                            <td>{list.position}</td>
                                            <td>{list.id}</td>
                                            <td>
                                                <div>
                                                    <button onClick={() => handleResetPassword(list)}>???????????? ?????????</button>
                                                </div>
                                            </td>
                                            <td className="DeleteButton" onClick={() => handleDeleteData(list)}>
                                                <RiDeleteBin6Fill></RiDeleteBin6Fill>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                ) : (
                    <div>
                        <TailSpin color="#3d66ba" height={30} width={30}></TailSpin>
                    </div>
                )}
            </div>
        </AdminDashBoardShowUsersTableMainDivBox>
    );
};

export default AdminDashBoardShowUsersTable;
