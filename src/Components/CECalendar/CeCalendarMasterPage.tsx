import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { RootState } from '../../models';
import { useSelector } from 'react-redux';
import { DecryptKey } from '../../config';
import { toast } from '../ToastMessage/ToastManager';
import styled from 'styled-components';
import CeCalendarPageNation from './CeCalendarPageNation';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import CeCalendarUpdateModals from './CeCalendarModals/CeCalendarUpdateModals';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '70%',
    },
};
Modal.setAppElement('#ModalSet');

export const AssetTableMainDivBox = styled.div`
    /* max-height: 120vh; */
    overflow: auto;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 10px;
    padding-top: 20px;
    padding-left: 10px;
    margin-right: 20px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    direction: ltr;
    scrollbar-color: #d4aa70 #e4e4e4;
    scrollbar-width: thin;
    width: 98%;
    padding-bottom: 50px;

    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: #e4e4e4;
        border-radius: 100px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 100px;
        border: 7px solid transparent;
        background-clip: content-box;
        background-color: #368;
    }

    table {
        font-size: 0.8em;
        position: relative;
        width: 100%;
    }

    table.type09 {
        border-collapse: collapse;
        text-align: left;
        line-height: 1.5;
    }
    table.type09 > thead > tr > th {
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        color: #369;
        border: none;
        border-bottom: 3px solid #036;
        background: #f3f6f7 !important;
        font-size: 0.7em;
    }
    table.type09 tbody th {
        width: 150px;
        padding: 10px;
        font-weight: bold;
        vertical-align: top;
        border-bottom: 1px solid #ccc;
        background: #f3f6f7;
    }
    table.type09 td {
        /* width: 300px; */
        padding: 5px;
        vertical-align: center;
        border-bottom: 1px solid #ccc;
        font-size: 1em;
        text-align: center;
    }
    .UserMinusIcons,
    .UserPlusIcons {
        font-size: 1.5em;
        display: inline-block;
    }
    .UserMinusIcons {
        :hover {
            cursor: pointer;
            color: red;
        }
    }
    .UserPlusIcons {
        :hover {
            cursor: pointer;
            color: limegreen;
        }
    }
    .CeCalendar_paginations {
        width: 50%;
        margin: 0 auto;
        margin-top: 30px;
        ul {
            width: 100%;
            display: flex;
            justify-content: center;
            li {
                margin-left: 20px;
                margin-right: 20px;
                font-weight: bolder;
                :hover {
                    cursor: pointer;
                    color: blue;
                }
            }
        }
    }
`;

export type CeCalendarTableProps = {
    indexs: number;
    state: string;
    grade: string;
    issue_date: string;
    CSMNumber: string;
    ModelNumber: string;
    Binds: string;
    custom: string;
    publish: string;
    apply: string;
    entering: string;
    CE: string;
    customDate: string;
    PAY: string;
    finall: string;
    hiddenOn: number;
};

export type paramasTypes = {
    pagenumber: string;
};
const CeCalendarMasterPage = () => {
    const { pagenumber } = useParams<paramasTypes>();
    const [hiddenChecked, setHiddenChecked] = useState(false);
    const GetCSMFilteringData = useSelector((state: RootState) => state.CSMFiltering.CSMFilteringData);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [PageNumbers, setPageNumbers] = useState(0);

    const [data, setData] = useState<CeCalendarTableProps[]>([
        {
            indexs: 1,
            state: 'Close',
            grade: 'SDC',
            issue_date: moment().format('YYYY-MM-DD'),
            CSMNumber: 'SDC19003',
            ModelNumber: 'DFL7161C',
            Binds: 'PA1749',
            custom: '?????????',
            publish: '2021-06-05',
            apply: '2021-06-06',
            entering: '2021-06-07',
            CE: '2021-06-08',
            customDate: '2021-06-08',
            PAY: '2021-06-08',
            finall: '2021-06-08',
            hiddenOn: 0,
        },
    ]);
    const [ModalOpen, setModalOpen] = useState(false);
    const [getCeCalendarDatas, setGetCeCalendarDatas] = useState<CeCalendarTableProps>({
        indexs: 0,
        state: '',
        grade: '',
        issue_date: moment().format('YYYY-MM-DD'),
        CSMNumber: '',
        ModelNumber: '',
        Binds: '',
        custom: '',
        publish: moment().format('YYYY-MM-DD'),
        apply: moment().format('YYYY-MM-DD'),
        entering: moment().format('YYYY-MM-DD'),
        CE: moment().format('YYYY-MM-DD'),
        customDate: moment().format('YYYY-MM-DD'),
        PAY: moment().format('YYYY-MM-DD'),
        finall: moment().format('YYYY-MM-DD'),
        hiddenOn: 0,
    });

    function closeModal() {
        setModalOpen(false);
    }

    useEffect(() => {
        dataGetSome();
    }, [GetCSMFilteringData]);

    const dataGetSome = async () => {
        try {
            const DataGetSomeCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DataGetSome`, {
                GetCSMFilteringData,
                pagenumber,
            });

            if (DataGetSomeCECalendar.data.dataSuccess) {
                setData(DataGetSomeCECalendar.data.datas);
                setPageNumbers(DataGetSomeCECalendar.data.Count[0] ? DataGetSomeCECalendar.data.Count[0].counts : 0);
                console.log(DataGetSomeCECalendar);
            } else {
                alert('??????');
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR! ???????????? ????????? ??????????????????. `,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleChangeClickHidden = async (e: any, datas: any) => {
        try {
            if (e.target.checked) {
                const DataUpdateCEcalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateHidden`, {
                    datas,
                    hiddenChecked: true,
                });
                if (DataUpdateCEcalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, hiddenOn: 1 } : item)));
                    toast.show({
                        title: '????????? ?????? ??????',
                        content: `????????? ???????????? ???????????????. `,
                        duration: 6000,
                        DataSuccess: true,
                    });
                }
            } else {
                const DataUpdateCEcalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateHidden`, {
                    datas,
                    hiddenChecked: false,
                });
                if (DataUpdateCEcalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, hiddenOn: 0 } : item)));
                    toast.show({
                        title: '????????? ?????? ??????',
                        content: `????????? ???????????? ???????????????. `,
                        duration: 6000,
                        DataSuccess: true,
                    });
                }
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR! ???????????? ????????? ??????????????????. `,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleClicksDeleteData = async (datas: any, text: string) => {
        try {
            if (text === '??????') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '??????',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, publish: '', publish_name: '' } : item)));
                }
            } else if (text === '??????') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '??????',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, apply: '', apply_name: '' } : item)));
                }
            } else if (text === '??????') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '??????',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, entering: '', entering_name: '' } : item)));
                }
            } else if (text === 'CE') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: 'CE',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, CE: '', CE_name: '' } : item)));
                }
            } else if (text === '??????') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '??????',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, customDate: '', customDate_name: '' } : item)));
                }
            } else if (text === 'PAY') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: 'PAY',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, PAY: '', PAY_name: '' } : item)));
                }
            } else if (text === 'finished') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '??????',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    setData(data.map(item => (item.indexs === datas.indexs ? { ...item, finall: '', finall_name: '' } : item)));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClicks = async (datas: any, text: string) => {
        if (text === '??????') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '??????',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.indexs === datas.indexs
                            ? { ...item, publish: moment().format('YYYY-MM-DD'), publish_name: DecryptKey(InfomationState.name) }
                            : item
                    )
                );
            }
        } else if (text === '??????') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '??????',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.indexs === datas.indexs
                            ? { ...item, apply: moment().format('YYYY-MM-DD'), apply_name: DecryptKey(InfomationState.name) }
                            : item
                    )
                );
            }
        } else if (text === '??????') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '??????',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.indexs === datas.indexs
                            ? { ...item, entering: moment().format('YYYY-MM-DD'), entering_name: DecryptKey(InfomationState.name) }
                            : item
                    )
                );
            }
        } else if (text === 'CE') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: 'CE',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.indexs === datas.indexs
                            ? { ...item, CE: moment().format('YYYY-MM-DD'), CE_name: DecryptKey(InfomationState.name) }
                            : item
                    )
                );
            }
        } else if (text === '??????') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '??????',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.indexs === datas.indexs
                            ? { ...item, customDate: moment().format('YYYY-MM-DD'), customDate_name: DecryptKey(InfomationState.name) }
                            : item
                    )
                );
            }
        } else if (text === 'PAY') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: 'PAY',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.indexs === datas.indexs
                            ? { ...item, PAY: moment().format('YYYY-MM-DD'), PAY_name: DecryptKey(InfomationState.name) }
                            : item
                    )
                );
            }
        } else if (text === 'finished') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '??????',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                setData(
                    data.map(item =>
                        item.indexs === datas.indexs
                            ? { ...item, finall: moment().format('YYYY-MM-DD'), finall_name: DecryptKey(InfomationState.name) }
                            : item
                    )
                );
            }
        }
    };

    const handleSubUpdateData = async (list: CeCalendarTableProps) => {
        try {
            setGetCeCalendarDatas(list);
            setModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const hadleDeleteData = async () => {
        try {
            const delete_Before_data = data.filter(item => item.indexs !== getCeCalendarDatas.indexs);
            setData(delete_Before_data);
        } catch (error) {
            console.log(error);
        }
    };
    const hadleUpdateData = async (UpdateData: CeCalendarTableProps) => {
        try {
            const update_Before_data = data.map(item => {
                if (item.indexs === UpdateData.indexs) {
                    return UpdateData;
                } else {
                    return item;
                }
            });

            setData(update_Before_data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AssetTableMainDivBox>
            <div style={{ display: 'inline-block' }}>
                <div>
                    <div onClick={() => setHiddenChecked(!hiddenChecked)} className="ThirdTest_list_hidden_box">
                        <input type="checkbox" checked={hiddenChecked}></input>
                        {hiddenChecked ? <span>?????? ?????? ?????????</span> : <span>?????? ?????? ??????</span>}
                    </div>
                </div>
            </div>
            <table className="type09" id="CeCalendarTables">
                <thead>
                    <tr>
                        <th>??????</th>
                        <th>?????????</th>
                        <th>??????</th>
                        <th>??????</th>
                        <th>?????????</th>
                        <th>CSM</th>
                        <th>MODEL</th>
                        <th>??????</th>
                        <th>?????????</th>
                        <th>??????</th>
                        <th>??????</th>
                        <th>??????</th>
                        <th>CE</th>
                        <th>??????</th>
                        <th>PAY</th>
                        <th>??????</th>
                        <th>?????????</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((list: any, i) => {
                        var classnamesAUTO = 'basic';
                        if (!list.publish) {
                            classnamesAUTO = 'basic_yellow';
                        } else if (!list.apply) {
                            classnamesAUTO = 'basic_lime';
                        } else if (!list.entering) {
                            classnamesAUTO = 'basic_blue';
                        } else if (!list.CE) {
                            classnamesAUTO = 'basic_purple';
                        } else if (!list.customDate) {
                            classnamesAUTO = 'basic_skyblue';
                        } else if (!list.PAY) {
                            classnamesAUTO = 'basic_orange';
                        } else if (!list.finall) {
                            classnamesAUTO = 'basic_finish';
                        }
                        return list.hiddenOn === 0 ? (
                            <tr key={list.indexs}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={list.hiddenOn === 0 ? false : true}
                                        onChange={e => handleChangeClickHidden(e, list)}
                                    ></input>
                                </td>
                                <td>{i + 1}</td>
                                <td>{list.state}</td>
                                <td>{list.grade}</td>
                                <td>{list.issue_date}</td>
                                <td>{list.CSMNumber}</td>
                                <td>{list.ModelNumber}</td>
                                <td>{list.Binds}</td>
                                <td>{list.custom}</td>
                                <td className={classnamesAUTO} style={list.publish ? {} : { backgroundColor: 'white' }}>
                                    <div className="Insert_dates">
                                        {classnamesAUTO === 'basic_yellow' ? (
                                            <div>
                                                <button onClick={() => handleClicks(list, '??????')}>??????</button>
                                            </div>
                                        ) : (
                                            <div
                                                className="ThirdTest_Delete_for_div_box"
                                                onDoubleClick={() => handleClicksDeleteData(list, '??????')}
                                            >
                                                <div>{list.publish}</div>
                                                <div>{list.publish ? list.publish_name : ''}</div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className={classnamesAUTO} style={list.apply ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_lime' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, '??????')}>??????</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, '??????')}
                                        >
                                            <div>{list.apply}</div>
                                            <div>{list.apply ? list.apply_name : ''}</div>
                                        </div>
                                    )}
                                </td>
                                <td className={classnamesAUTO} style={list.entering ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_blue' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, '??????')}>??????</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, '??????')}
                                        >
                                            <div>{list.entering}</div>
                                            <div>{list.entering ? list.entering_name : ''}</div>
                                        </div>
                                    )}
                                </td>
                                <td className={classnamesAUTO} style={list.CE ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_purple' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, 'CE')}>??????</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, 'CE')}
                                        >
                                            <div>{list.CE}</div>
                                            <div>{list.CE ? list.CE_name : ''}</div>
                                        </div>
                                    )}
                                </td>
                                <td className={classnamesAUTO} style={list.customDate ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_skyblue' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, '??????')}>??????</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, '??????')}
                                        >
                                            <div>{list.customDate}</div>
                                            <div>{list.customDate ? list.customDate_name : ''}</div>
                                        </div>
                                    )}
                                </td>
                                <td className={classnamesAUTO} style={list.PAY ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_orange' ? (
                                        DecryptKey(InfomationState.name) === '?????????' || DecryptKey(InfomationState.name) === '?????????' ? (
                                            <div>
                                                <div>
                                                    <button onClick={() => handleClicks(list, 'PAY')}>??????</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, 'PAY')}
                                        >
                                            <div>{list.PAY}</div>
                                            <div>{list.PAY ? list.PAY_name : ''}</div>
                                        </div>
                                    )}
                                </td>
                                <td className={classnamesAUTO} style={list.finall ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_finish' ? (
                                        DecryptKey(InfomationState.name) === '?????????' || DecryptKey(InfomationState.name) === '?????????' ? (
                                            <div>
                                                <div>
                                                    <button onClick={() => handleClicks(list, 'finished')}>??????</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, 'finished')}
                                        >
                                            <div>{list.finall}</div>
                                            <div>{list.finall_name}</div>
                                        </div>
                                    )}
                                </td>
                                <td onClick={() => handleSubUpdateData(list)}>??????</td>
                            </tr>
                        ) : hiddenChecked ? (
                            <tr key={list.indexs}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={list.hiddenOn === 0 ? false : true}
                                        onChange={e => handleChangeClickHidden(e, list)}
                                    ></input>
                                </td>
                                <td>{i + 1}</td>
                                <td>{list.state}</td>
                                <td>{list.grade}</td>
                                <td>{list.issue_date}</td>
                                <td>{list.CSMNumber}</td>
                                <td>{list.ModelNumber}</td>
                                <td>{list.Binds}</td>
                                <td>{list.custom}</td>
                                <td className={classnamesAUTO} style={list.publish ? {} : { backgroundColor: 'white' }}>
                                    <div className="Insert_dates">
                                        {classnamesAUTO === 'basic_yellow' ? (
                                            <div>
                                                <button onClick={() => handleClicks(list, '??????')}>??????</button>
                                            </div>
                                        ) : (
                                            <div
                                                className="ThirdTest_Delete_for_div_box"
                                                onDoubleClick={() => handleClicksDeleteData(list, '??????')}
                                            >
                                                <div>{list.publish}</div>
                                                <div>{list.publish ? list.publish_name : ''}</div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className={classnamesAUTO} style={list.apply ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_lime' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, '??????')}>??????</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, '??????')}
                                        >
                                            <div>{list.apply}</div>
                                            <div>{list.apply ? list.apply_name : ''}</div>
                                        </div>
                                    )}
                                </td>
                                <td className={classnamesAUTO} style={list.entering ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_blue' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, '??????')}>??????</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, '??????')}
                                        >
                                            <div>{list.entering}</div>
                                            <div>{list.entering ? list.entering_name : ''}</div>
                                        </div>
                                    )}
                                </td>
                                <td className={classnamesAUTO} style={list.CE ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_purple' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, 'CE')}>??????</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, 'CE')}
                                        >
                                            <div>{list.CE}</div>
                                            <div>{list.CE ? list.CE_name : ''}</div>
                                        </div>
                                    )}
                                </td>
                                <td className={classnamesAUTO} style={list.customDate ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_skyblue' ? (
                                        <div>
                                            <button onClick={() => handleClicks(list, '??????')}>??????</button>
                                        </div>
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, '??????')}
                                        >
                                            <div>{list.customDate}</div>
                                            <div>{list.customDate ? list.customDate_name : ''}</div>
                                        </div>
                                    )}
                                </td>
                                <td className={classnamesAUTO} style={list.PAY ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_orange' ? (
                                        DecryptKey(InfomationState.name) === '?????????' || DecryptKey(InfomationState.name) === '?????????' ? (
                                            <div>
                                                <div>
                                                    <button onClick={() => handleClicks(list, 'PAY')}>??????</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, 'PAY')}
                                        >
                                            <div>{list.PAY}</div>
                                            <div>{list.PAY ? list.PAY_name : ''}</div>
                                        </div>
                                    )}
                                </td>
                                <td className={classnamesAUTO} style={list.finall ? {} : { backgroundColor: 'white' }}>
                                    {classnamesAUTO === 'basic_finish' ? (
                                        DecryptKey(InfomationState.name) === '?????????' || DecryptKey(InfomationState.name) === '?????????' ? (
                                            <div>
                                                <div>
                                                    <button onClick={() => handleClicks(list, 'finished')}>??????</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div></div>
                                        )
                                    ) : (
                                        <div
                                            className="ThirdTest_Delete_for_div_box"
                                            onDoubleClick={() => handleClicksDeleteData(list, 'finished')}
                                        >
                                            <div>{list.finall}</div>
                                            <div>{list.finall_name}</div>
                                        </div>
                                    )}
                                </td>
                                <td>??????</td>
                            </tr>
                        ) : (
                            <></>
                        );
                    })}
                </tbody>
            </table>
            <div className="CeCalendar_paginations">
                <ul>
                    {Number(pagenumber) > 3 ? (
                        <>
                            <li onClick={() => window.location.replace(`/CECalendar/${1}`)}>1</li>
                            <li>...</li>
                        </>
                    ) : (
                        <></>
                    )}
                    {Number(pagenumber) - 2 > 0 ? (
                        <>
                            <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) - 2}`)}>
                                {Number(pagenumber) - 2}
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                    {Number(pagenumber) - 1 > 0 ? (
                        <>
                            <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) - 1}`)}>
                                {Number(pagenumber) - 1}
                            </li>
                        </>
                    ) : (
                        <></>
                    )}

                    <li style={{ color: '#0031f7' }}>{pagenumber}</li>

                    {Number(pagenumber) + 1 < Math.ceil(PageNumbers / 20) ? (
                        <>
                            <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) + 1}`)}>
                                {Number(pagenumber) + 1}
                            </li>
                        </>
                    ) : (
                        <></>
                    )}

                    {Number(pagenumber) + 2 < Math.ceil(PageNumbers / 20) ? (
                        <>
                            <li onClick={() => window.location.replace(`/CECalendar/${Number(pagenumber) + 2}`)}>
                                {Number(pagenumber) + 2}
                            </li>
                        </>
                    ) : (
                        <></>
                    )}

                    {Number(pagenumber) < Math.ceil(PageNumbers / 20) - 3 ? (
                        <>
                            {' '}
                            <li>...</li>
                            <li onClick={() => window.location.replace(`/CECalendar/${Math.ceil(PageNumbers / 20) - 1}`)}>
                                {Math.ceil(PageNumbers / 20) - 1}
                            </li>
                        </>
                    ) : (
                        <></>
                    )}
                </ul>
            </div>

            <Modal isOpen={ModalOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <CeCalendarUpdateModals
                    closeModal={closeModal}
                    getCeCalendarDatas={getCeCalendarDatas}
                    hadleDeleteData={hadleDeleteData}
                    hadleUpdateData={updatedata => hadleUpdateData(updatedata)}
                ></CeCalendarUpdateModals>
            </Modal>
        </AssetTableMainDivBox>
    );
};

export default CeCalendarMasterPage;
