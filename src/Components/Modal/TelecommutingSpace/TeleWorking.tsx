import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './TeleWorking.css';
import 'moment/locale/ko';
import axios from 'axios';
import { DecryptKey } from '../../../config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/index';
import { toast } from '../../ToastMessage/ToastManager';
import { OneParamsPost } from '../../API/POSTApi/PostApi';

type TeleWorkingProps = {
    pickerDate?: string | null | undefined;
};

const TeleWorking = ({ pickerDate }: TeleWorkingProps) => {
    const [TeleStart, setTeleStart] = useState(false);
    const [TeleEnded, setTeleEnded] = useState(false);
    const [WorkBookWrite, setWorkBookWrite] = useState('');
    const [StartTime, setStartTime] = useState('00:00');
    const [EndTime, setEndTime] = useState('00:00');
    const [todayDataisChk, setTodayDataisChk] = useState(false);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);

    useEffect(() => {
        TodayCheckTele();
    }, []);

    const TodayCheckTele = async () => {
        try {
            const paramsData = { id: DecryptKey(InfomationState.id), date: moment().format('YYYY-MM-DD') };
            const TodayCheckTele = await OneParamsPost(`/Tele_app_server/Tele_Today_Check`, paramsData);
            if (TodayCheckTele.data.dataSuccess && TodayCheckTele.data.isChk) {
                setTodayDataisChk(true);
                setStartTime(TodayCheckTele.data.data[0].stat_t);
                setEndTime(TodayCheckTele.data.data[0].end_t);
                setWorkBookWrite(TodayCheckTele.data.data2[0].work);
                if (TodayCheckTele.data.data[0].status === 1) {
                    setTeleStart(true);
                } else if (TodayCheckTele.data.data[0].status === 3) {
                    setTeleStart(true);
                    setTeleEnded(true);
                }
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR. ???????????? ?????? ????????? ????????? ?????????????????????. IT ?????? ?????? ????????????.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };
    const handleClickTeleStart = async () => {
        const confrims = window.confirm(`?????? ??????( ${moment().format('HH??? mm???')} ) ?????? ?????? ????????? ?????? ????????????????`);
        if (confrims) {
            TodayCheckTeleStart();
        }
    };
    const TodayCheckTeleStart = async () => {
        try {
            const paramsData = { id: DecryptKey(InfomationState.id), date: moment().format('YYYY-MM-DD') };
            const TodayCheckTele = await OneParamsPost(`/Tele_app_server/Tele_Today_CheckStart`, paramsData);
            if (TodayCheckTele.data.dataSuccess) {
                toast.show({
                    title: '????????? ?????? ??????.',
                    content: `${moment().format('HH??? mm???')}?????? ??????????????? ???????????????.`,
                    duration: 6000,
                    DataSuccess: true,
                });
                setTeleStart(true);
                setStartTime(moment().format('HH:mm'));
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR! ?????? ?????? ??????`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };
    const handleClickTeleEnded = () => {
        const confrims = window.confirm(`?????? ?????? ??? ???????????? ????????? ???????????????. \n?????? ????????? ?????? ????????????????`);
        if (confrims) {
            try {
                TodayCheckTeleEnded();
            } catch (error) {
                console.log(error);
            }
        }
    };
    const TodayCheckTeleEnded = async () => {
        try {
            const paramsData = { id: DecryptKey(InfomationState.id), date: moment().format('YYYY-MM-DD'), desc: WorkBookWrite };
            const TodayCheckTele = await OneParamsPost(`/Tele_app_server/Tele_Today_CheckEnded`, paramsData);
            if (TodayCheckTele.data.dataSuccess) {
                toast.show({
                    title: '????????? ?????? ??????.',
                    content: `${moment().format('HH??? mm???')}?????? ???????????? ?????? ???????????? ????????? ?????? ???????????????.`,
                    duration: 6000,
                    DataSuccess: true,
                });
                setTeleEnded(true);
                setEndTime(moment().format('HH:mm'));
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR! ?????? ????????? ?????????????????????.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };

    const handleClickWorkbook = async () => {
        if (!TeleStart) return alert('????????????????????? ?????? ???????????????.');
        try {
            const paramsData = {
                id: DecryptKey(InfomationState.id),
                date: moment().format('YYYY-MM-DD'),
                desc: WorkBookWrite,
            };
            const TodayCheckTele = await OneParamsPost(`/Tele_app_server/Tele_Workbook_Store`, paramsData);
            if (TodayCheckTele.data.dataSuccess) {
                toast.show({
                    title: '????????? ?????? ??????.',
                    content: `?????? ????????? ??????????????? ????????? ?????? ???????????????.`,
                    duration: 6000,
                    DataSuccess: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast.show({
                title: 'ERROR!',
                content: `ERROR! ?????? ????????? ?????????????????????.`,
                duration: 6000,
                DataSuccess: false,
            });
        }
    };
    return (
        <div className="mainbox">
            <div className="subBox">
                <div>
                    <h2 style={{ fontSize: 'xxx-large', fontWeight: 'bolder' }}>{moment().format('YYYY??? MM??? DD??? (dddd)')}</h2>
                </div>
                <div className="Tele_Float_box">
                    <div className="Tele_Float_Left_box">
                        <div className="Tele_Start_Float_box">
                            <div className="Tele_Start_Float_Left_box">
                                <h2>????????????</h2>
                                <h3>{StartTime}</h3>
                            </div>
                            <div className="Tele_Start_Float_Right_box">
                                <h2>????????????</h2>
                                <h3>{EndTime}</h3>
                            </div>
                        </div>
                        <div>
                            <div className="Tele_Start_Button_div">
                                {TeleEnded ? (
                                    <div>
                                        <div>?????? ??????.</div>
                                        <div>?????????????????????.</div>
                                    </div>
                                ) : (
                                    <div>
                                        {TeleStart ? (
                                            <div onClick={handleClickTeleEnded}>???????????? ??????</div>
                                        ) : (
                                            <div>
                                                <div onClick={handleClickTeleStart}>???????????? ??????</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="Tele_Float_Right_box">
                        <div style={{ marginBottom: '15px' }}>
                            <h2>????????????</h2>
                        </div>
                        <div>
                            {TeleEnded ? (
                                <>
                                    <div className="Tele_Float_Right_box_inputBox" placeholder="??????????????? ??????????????????.">
                                        <pre>{WorkBookWrite}</pre>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <textarea
                                        className="Tele_Float_Right_box_inputBox"
                                        placeholder="??????????????? ??????????????????."
                                        value={WorkBookWrite}
                                        onChange={e => setWorkBookWrite(e.target.value)}
                                    ></textarea>
                                    <div style={{ textAlign: 'end' }}>
                                        <button className="Tele_Float_Right_box_button_store" onClick={handleClickWorkbook}>
                                            ?????? ??????
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeleWorking;
