import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { toast } from '../../ToastMessage/ToastManager';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../models/index';
import { getTeamLeaderAFTEROTdataThunk } from '../../../models/TeamLeader_Thunk_models/TeamLeaderAfterOTData';
type TeleSelectClickModalProps = {
    clicksTitle: string;
    clicksData: any | null;
    modalClose: () => void;
};

type BusinessCheckDataType = {
    indexs: number;
    id: string;
    name: string;
    apply_date: string;
    teamleader_check: number;
    type: string;
    BusinessAccess: number;
};

const TeamLeaderAfterSelectClickModal = ({ clicksTitle, clicksData, modalClose }: TeleSelectClickModalProps) => {
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [BusinessCheck, setBusinessCheck] = useState<BusinessCheckDataType[]>([]);
    const [checkedOTdata, setcheckedOTdata] = useState({
        start_time_mon: '',
        start_time_tue: '',
        start_time_wed: '',
        start_time_thu: '',
        start_time_fri: '',
        end_time_mon: '',
        end_time_tue: '',
        end_time_wed: '',
        end_time_thu: '',
        end_time_fri: '',
        mon_time: 0,
        tue_time: 0,
        wed_time: 0,
        thu_time: 0,
        fri_time: 0,
    });

    useEffect(() => {
        getSomeData(clicksData);
    }, [clicksData]);

    const getSomeData = async (clicksData: any) => {
        try {
            const getSomeDatas = await axios.post(`${process.env.REACT_APP_API_URL}/TeamSelectOT_app_server/AfterOTDataSelectModal`, {
                date: moment(clicksData.date_mon).format('YYYY-MM-DD'),
                id: clicksData.id,
            });

            if (getSomeDatas.data.dataSuccess) {
                setcheckedOTdata(getSomeDatas.data.data[0]);
                setBusinessCheck(getSomeDatas.data.business_check);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDataClick = async () => {
        try {
            const AfterOTAcceptData = await axios.post(
                `${process.env.REACT_APP_API_URL}/TeamSelectOT_app_server/AfterOTdataTeamLeaderAccept`,
                {
                    clicksData,
                }
            );
            if (AfterOTAcceptData.data.dataSuccess) {
                dispatch(getTeamLeaderAFTEROTdataThunk(moment(clicksData.date_mon).format('YYYY-MM'), InfomationState));
                toast.show({
                    title: '?????? ?????? ??????.',
                    content: `${clicksData.name} ????????? ??????OT ????????? ?????????????????????.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '?????? ?????? ??????.',
                    content: `??????OT ????????? ????????? ?????? ???????????????.(IT?????? ????????????.)`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
            modalClose();
        } catch (error) {
            console.log(error);
            toast.show({
                title: '?????? ?????? ??????.',
                content: `???????????? ????????? ??????????????????.(IT?????? ????????????.)`,
                duration: 6000,
                DataSuccess: false,
            });
        }

        modalClose();
    };

    const handleAfterOTCancel = async () => {
        try {
            const AfterOTAcceptData = await axios.post(`${process.env.REACT_APP_API_URL}/TeamSelectOT_app_server/AfterOTDataCancel`, {
                clickedOTData: clicksData,
            });
            if (AfterOTAcceptData.data.dataCheck) {
                dispatch(getTeamLeaderAFTEROTdataThunk(moment(clicksData.date_mon).format('YYYY-MM'), InfomationState));
                toast.show({
                    title: '?????? ?????? ?????? ??????.',
                    content: `${clicksData.name} ????????? ??????OT ????????? ?????? ?????? ???????????????.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            } else {
                toast.show({
                    title: '?????? ?????? ?????? ??????.',
                    content: `??????OT ????????? ?????? ????????? ?????? ???????????????.(IT?????? ????????????.)`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
            modalClose();
        } catch (error) {
            console.log(error);
            toast.show({
                title: '?????? ?????? ?????? ??????.',
                content: `???????????? ????????? ??????????????????.(IT?????? ????????????.)`,
                duration: 6000,
                DataSuccess: false,
            });
        }

        modalClose();
    };

    const handleDeleteData = async () => {
        const datasConfirm = window.confirm('??????????????? ??????OT ???????????? ???????????????.\n????????? ???????????? "???"??? ???????????????.');
        if (!datasConfirm) {
            // ??????(?????????) ?????? ?????? ??? ?????????

            return;
        } else {
            try {
                const DeleteDataServerSend = await axios.post(`${process.env.REACT_APP_API_URL}/TeamSelectOT_app_server/DeleteOTDatas`, {
                    clicksData,
                });
                if (DeleteDataServerSend.data.dataSuccess) {
                    dispatch(getTeamLeaderAFTEROTdataThunk(moment(clicksData.date_mon).format('YYYY-MM'), InfomationState));
                    toast.show({
                        title: '?????? OT ????????? ?????? ??????.',
                        content: `${clicksData.name}????????? ??????OT??? ?????????????????????.`,
                        duration: 6000,
                        DataSuccess: true,
                    });
                    modalClose();
                } else {
                    toast.show({
                        title: 'OT????????? ?????? ??????.',
                        content: `??????OT ????????? ????????? ?????? ???????????????.(IT?????? ????????????.)`,
                        duration: 6000,
                        DataSuccess: false,
                    });
                }
            } catch (error) {
                console.log(error);
                toast.show({
                    title: 'OT????????? ?????? ??????',
                    content: `???????????? ????????? ??????????????????.(IT?????? ????????????.)`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        }
    };

    return (
        <div>
            <h2>{clicksData.name}</h2>
            <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: '0', textAlign: 'center' }}>
                    <thead style={{ backgroundColor: '#2DA8E5' }}>
                        <tr
                            className="testssBefore"
                            style={{
                                borderTop: '1.5px solid black',
                                borderLeft: '1.3px solid black',
                                borderRight: '1.3px solid black',
                                backgroundColor: '#2DA8E5',
                            }}
                        >
                            <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#2DA8E5' }}>
                                ??????
                            </th>
                            <th
                                colSpan={3}
                                style={{
                                    borderRight: '1.2px solid black',
                                    borderBottom: '1.2px solid black',
                                    backgroundColor: '#2DA8E5',
                                }}
                            >
                                ????????????
                            </th>
                            {BusinessCheck.length > 0 ? (
                                BusinessCheck[0].BusinessAccess ? (
                                    <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#2DA8E5' }}>
                                        ?????? ??????
                                        <br />
                                        ?????? ??????
                                    </th>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )}
                            <th
                                colSpan={4}
                                style={{
                                    borderRight: '1.2px solid black',
                                    borderBottom: '1.2px solid black',
                                    backgroundColor: '#2DA8E5',
                                }}
                            >
                                {' '}
                                ?????? ??????
                            </th>
                            <th rowSpan={2} style={{ borderRight: '1.2px solid black', backgroundColor: '#2DA8E5' }}>
                                ??? ?????? <br />
                                ?????? ??????
                                <br />
                            </th>
                            <th rowSpan={2} style={{ backgroundColor: '#2DA8E5' }}>
                                ?????? ??????
                            </th>
                        </tr>
                        <tr
                            className="testssBefore"
                            style={{
                                borderBottom: '1.2px solid black',
                                borderLeft: '1.3px solid black',
                                borderRight: '1.3px solid black',
                            }}
                        >
                            <td style={{ borderRight: '1.2px solid black' }}>????????????</td>
                            <td style={{ borderRight: '1.2px solid black' }}>????????????</td>
                            <td style={{ borderRight: '1.2px solid black' }}>
                                ??? ?????? <br /> ??????
                            </td>
                            <td style={{ borderRight: '1.2px solid black' }}>????????????</td>
                            <td style={{ borderRight: '1.2px solid black' }}>????????????</td>
                            <td style={{ borderRight: '1.2px solid black' }}>????????????</td>
                            <td style={{ borderRight: '1.2px solid black' }}>
                                ??? ?????? <br />
                                ??????
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={3} id="stat_date" width="100px">
                                {clicksData.date_mon}
                                <br />
                                ?????????
                            </td>

                            <td rowSpan={3} width="100px">
                                {checkedOTdata.start_time_mon}
                            </td>
                            <td rowSpan={3} width="100px">
                                {checkedOTdata.end_time_mon}
                            </td>
                            <td rowSpan={3} width="100px">
                                <span className="sum_time" id="sum_time_mon">
                                    {checkedOTdata.mon_time}
                                </span>
                                ??????
                            </td>
                            {BusinessCheck.length > 0 ? (
                                BusinessCheck[0].BusinessAccess ? (
                                    <td rowSpan={3} width="100px">
                                        {BusinessCheck[0].type === '??????' ? '' : BusinessCheck[0].type}
                                    </td>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )}

                            <td rowSpan={3} width="100px">
                                {clicksData.start_time_mon}
                            </td>
                            <td rowSpan={3} width="100px">
                                {clicksData.end_time_mon}
                            </td>
                            <td rowSpan={3} width="100px">
                                {clicksData.mon_rest}
                            </td>
                            <td rowSpan={3} width="100px">
                                <span className="sum_over_time" id="sum_over_time_monOver">
                                    {clicksData.mon_time}
                                </span>
                                ??????
                            </td>
                            <td rowSpan={3} width="100px">
                                <span id="sum_times_mon">{clicksData.mon_time + checkedOTdata.mon_time}</span> ??????
                            </td>

                            <td className="reasontable">
                                <pre>{clicksData.mon_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.mon_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.mon_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3} style={{ minWidth: '100px' }}>
                                {clicksData.date_tue}
                                <br />
                                ?????????
                            </td>

                            <td rowSpan={3}>{checkedOTdata.start_time_tue}</td>
                            <td rowSpan={3}>{checkedOTdata.end_time_tue}</td>
                            <td rowSpan={3}>
                                <span className="sum_time" id="sum_time_tue">
                                    {checkedOTdata.tue_time}
                                </span>{' '}
                                ??????
                            </td>
                            {BusinessCheck.length > 0 ? (
                                BusinessCheck[1].BusinessAccess ? (
                                    <td rowSpan={3} width="100px">
                                        {BusinessCheck[1].type === '??????' ? '' : BusinessCheck[1].type}
                                    </td>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )}
                            <td rowSpan={3}>{clicksData.start_time_tue}</td>
                            <td rowSpan={3}>{clicksData.end_time_tue}</td>
                            <td rowSpan={3}>{clicksData.tue_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_tueOver">
                                    {clicksData.tue_time}
                                </span>{' '}
                                ??????
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_tue">{clicksData.tue_time + checkedOTdata.tue_time}</span> ??????
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.tue_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.tue_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.tue_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3}>
                                {clicksData.date_wed}
                                <br />
                                ?????????
                            </td>

                            <td rowSpan={3}>{checkedOTdata.start_time_wed}</td>
                            <td rowSpan={3}>{checkedOTdata.end_time_tue}</td>
                            <td rowSpan={3}>
                                <span className="sum_time" id="sum_time_wed">
                                    {checkedOTdata.wed_time}
                                </span>{' '}
                                ??????
                            </td>
                            {BusinessCheck.length > 0 ? (
                                BusinessCheck[2].BusinessAccess ? (
                                    <td rowSpan={3} width="100px">
                                        {BusinessCheck[2].type === '??????' ? '' : BusinessCheck[2].type}
                                    </td>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )}
                            <td rowSpan={3}>{clicksData.start_time_wed}</td>
                            <td rowSpan={3}>{clicksData.end_time_wed}</td>
                            <td rowSpan={3}>{clicksData.wed_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_wedOver">
                                    {clicksData.wed_time}
                                </span>{' '}
                                ??????
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_wed">{clicksData.wed_time + checkedOTdata.wed_time}</span> ??????
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.wed_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.wed_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.wed_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3}>
                                {clicksData.date_thu}
                                <br />
                                ?????????
                            </td>

                            <td rowSpan={3}>{checkedOTdata.start_time_thu}</td>
                            <td rowSpan={3}>{checkedOTdata.end_time_thu}</td>
                            <td rowSpan={3}>
                                <span className="sum_time" id="sum_time_thu">
                                    {checkedOTdata.thu_time}
                                </span>{' '}
                                ??????
                            </td>
                            {BusinessCheck.length > 0 ? (
                                BusinessCheck[3].BusinessAccess ? (
                                    <td rowSpan={3} width="100px">
                                        {BusinessCheck[3].type === '??????' ? '' : BusinessCheck[3].type}
                                    </td>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )}
                            <td rowSpan={3}>{clicksData.start_time_thu}</td>
                            <td rowSpan={3}>{clicksData.end_time_thu}</td>
                            <td rowSpan={3}>{clicksData.thu_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_thuOver">
                                    {clicksData.thu_time}
                                </span>{' '}
                                ??????
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_thu">{clicksData.thu_time + checkedOTdata.thu_time}</span> ??????
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.thu_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.thu_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.thu_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3}>
                                {clicksData.date_fri}
                                <br />
                                ?????????
                            </td>

                            <td rowSpan={3}>{checkedOTdata.start_time_fri}</td>
                            <td rowSpan={3}>{checkedOTdata.end_time_fri}</td>
                            <td rowSpan={3}>
                                <span className="sum_time" id="sum_time_fri">
                                    {checkedOTdata.fri_time}
                                </span>{' '}
                                ??????
                            </td>
                            {BusinessCheck.length > 0 ? (
                                BusinessCheck[4].BusinessAccess ? (
                                    <td rowSpan={3} width="100px">
                                        {BusinessCheck[4].type === '??????' ? '' : BusinessCheck[4].type}
                                    </td>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )}
                            <td rowSpan={3}>{clicksData.start_time_fri}</td>
                            <td rowSpan={3}>{clicksData.end_time_fri}</td>
                            <td rowSpan={3}>{clicksData.fri_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_friOver">
                                    {clicksData.fri_time}
                                </span>{' '}
                                ??????
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_fri">{clicksData.fri_time + checkedOTdata.fri_time}</span> ??????
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.fri_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.fri_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.fri_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3}>
                                {clicksData.date_sat}
                                <br />
                                ?????????
                            </td>

                            <td rowSpan={3}></td>
                            <td rowSpan={3}></td>
                            <td rowSpan={3}></td>
                            {BusinessCheck.length > 0 ? (
                                BusinessCheck[5].BusinessAccess ? (
                                    <td rowSpan={3} width="100px">
                                        {BusinessCheck[5].type === '??????' ? '' : BusinessCheck[5].type}
                                    </td>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )}
                            <td rowSpan={3}>{clicksData.start_time_sat}</td>
                            <td rowSpan={3}>{clicksData.end_time_sat}</td>
                            <td rowSpan={3}>{clicksData.sat_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_satOver">
                                    {clicksData.sat_time}
                                </span>{' '}
                                ??????
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_sat">{clicksData.sat_time}</span> ??????
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.sat_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.sat_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.sat_reason2}</pre>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3} id="stats_date">
                                {clicksData.date_sun}
                                <br />
                                ?????????
                            </td>

                            <td rowSpan={3}></td>
                            <td rowSpan={3}></td>
                            <td rowSpan={3}></td>
                            {BusinessCheck.length > 0 ? (
                                BusinessCheck[6].BusinessAccess ? (
                                    <td rowSpan={3} width="100px">
                                        {BusinessCheck[6].type === '??????' ? '' : BusinessCheck[6].type}
                                    </td>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )}
                            <td rowSpan={3}>{clicksData.start_time_sun}</td>
                            <td rowSpan={3}>{clicksData.end_time_sun}</td>
                            <td rowSpan={3}>{clicksData.sun_rest}</td>
                            <td rowSpan={3}>
                                <span className="sum_over_time" id="sum_over_time_sunOver">
                                    {clicksData.sun_time}
                                </span>{' '}
                                ??????
                            </td>
                            <td rowSpan={3}>
                                <span id="sum_times_sun">{clicksData.sun_time}</span> ??????
                            </td>
                            <td className="reasontable">
                                <pre>{clicksData.sun_reason}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td className="reasontable">
                                <pre>{clicksData.sun_reason1}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <pre>{clicksData.sun_reason2}</pre>
                            </td>
                        </tr>

                        <tr style={{ height: '50px', border: '1.1px solid black' }}>
                            <td colSpan={3} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                                ???????????? ?????????
                            </td>
                            <td colSpan={1}>
                                <span id="total_sum_time">
                                    {checkedOTdata.mon_time +
                                        checkedOTdata.tue_time +
                                        checkedOTdata.wed_time +
                                        checkedOTdata.thu_time +
                                        checkedOTdata.fri_time}
                                </span>
                                ??????
                            </td>

                            {BusinessCheck.length > 0 ? (
                                BusinessCheck[0].BusinessAccess ? (
                                    <td>{BusinessCheck.reduce((count, data) => (data.type === '??????' ? count + 1 : count), 0)}???</td>
                                ) : (
                                    <></>
                                )
                            ) : (
                                <></>
                            )}

                            <td
                                colSpan={BusinessCheck.length > 0 ? (BusinessCheck[0].BusinessAccess ? 2 : 3) : 3}
                                style={{ background: 'darkgray', fontWeight: 'bolder' }}
                            >
                                ???????????? ?????????
                            </td>
                            <td colSpan={1}>
                                <span id="total_sum_over_time">
                                    {clicksData.mon_time +
                                        clicksData.tue_time +
                                        clicksData.wed_time +
                                        clicksData.thu_time +
                                        clicksData.fri_time +
                                        clicksData.sat_time +
                                        clicksData.sun_time}
                                    ??????
                                </span>
                            </td>
                            <td colSpan={1} style={{ background: 'darkgray', fontWeight: 'bolder' }}>
                                ??? ?????? ??????
                            </td>
                            <td>
                                <span id="total_sum_over_time">
                                    {clicksData.mon_time +
                                        clicksData.tue_time +
                                        clicksData.wed_time +
                                        clicksData.thu_time +
                                        clicksData.fri_time +
                                        clicksData.sat_time +
                                        clicksData.sun_time +
                                        checkedOTdata.mon_time +
                                        checkedOTdata.tue_time +
                                        checkedOTdata.wed_time +
                                        checkedOTdata.thu_time +
                                        checkedOTdata.fri_time}
                                    ??????
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                {clicksData.leadercheck === 0 ? (
                    <div style={{ textAlign: 'end', marginTop: '30px' }}>
                        <button
                            style={{ marginRight: '50px', background: '#f45d5d' }}
                            className="TeamLeaderAcceptDesc"
                            onClick={handleDeleteData}
                        >
                            ????????????
                        </button>
                        <button className="TeamLeaderAcceptDesc" onClick={handleDataClick}>
                            ????????????
                        </button>
                    </div>
                ) : (
                    <div style={{ textAlign: 'end', marginTop: '30px' }}>
                        <button
                            style={{ marginRight: '50px', background: '#f45d5d' }}
                            className="TeamLeaderAcceptDesc"
                            onClick={handleDeleteData}
                        >
                            ????????????
                        </button>
                        <button onClick={handleAfterOTCancel} className="TeamLeaderAcceptDesc">
                            ???????????? ??????
                        </button>
                        <div style={{ display: 'block' }} className="AcceptOkayDiv" onClick={() => modalClose()}>
                            ????????????.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamLeaderAfterSelectClickModal;
