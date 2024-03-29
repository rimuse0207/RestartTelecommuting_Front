import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models';
import { DecryptKey } from '../../../config';
import { PrinterButtonContainer } from '../../OtMainPage/OTTeamLeaderCheckFinish/BeforeOtTeamLeaderFinish';
const BusinessTripShowContentMainDivBox = styled.div`
    .Telecommuting_Table {
        height: auto;
    }
    .Telecommuting_Table > tbody > tr > td {
        height: 70px !important;
    }
`;

const ErpShowTableMainDivBox = styled.div`
    table {
        width: 95%;
        border-collapse: collapse;
        margin-top: 20px;
        margin-left: 20px;
        margin-bottom: 20px;
    }
    th,
    td {
        border: none;
        border-bottom: 1px solid #444444;
        background-color: none !important;
        padding: 10px;
        font-size: 0.8em;
        text-align: center;
    }
    .Telecommuting_Table > tbody > tr > td {
        height: 70px !important;
    }
    thead {
        border: none;
        font-size: 1em !important;
        background-color: none !important;
    }
    h4 {
        margin-top: 20px;
    }
`;

type businiessTypes = {
    indexs: number;
    id: string;
    name: string;
    type: string;
    apply_date: string;
    teamleader_check: number;
    create_date: string;
};
type ErpDatasTypes = {
    indexs: number;
    paper_code: string;
    name: string;
    business_location: string;
    business_purpose: string;
    business_trip_period: string;
    business_tip_length: number;
    upload_date: string;
    erp_business_write_write_reason: string;
};

type TeamLeaderBusinessTripContentTypes = {
    selectName: string;
    selectTeam: string;
    selectYear: string;
    selectMonth: string;
    selectId: string;
};

const TeamLeaderBusinessTripContent = ({
    selectName,
    selectTeam,
    selectYear,
    selectMonth,
    selectId,
}: TeamLeaderBusinessTripContentTypes) => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const [getMoment, setMoment] = useState(moment());
    const [PrinterControlData, setPrinterControlData] = useState(false);
    const today = getMoment;
    const [BusinessDatas, setBusinessDatas] = useState<businiessTypes[]>([]);
    const [ErpDatas, setErpDatas] = useState<ErpDatasTypes[]>([]);
    useEffect(() => {
        if (InfomationState) {
            getPrinterControl();
            getBusinessData();
        }
    }, [selectName, selectYear, selectMonth, selectId]);
    const getPrinterControl = async () => {
        try {
            const getPrinterControlFromServer = await axios.get(
                `${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/businessGroupDataPrinter`,
                {
                    params: {
                        date: `${selectYear}-${selectMonth}`,
                    },
                }
            );

            if (getPrinterControlFromServer.data.dataSuccess) {
                setPrinterControlData(getPrinterControlFromServer.data.data[0].business_printer_control_type === 1 ? true : false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const getBusinessData = async () => {
        setBusinessDatas([]);
        setErpDatas([]);
        try {
            const getBusinessDatas = await axios.get(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/businessGroupData`, {
                params: {
                    team: selectTeam,
                    name: selectName,
                    id: selectId,
                    year: selectYear,
                    month: selectMonth,
                },
            });
            if (getBusinessDatas.data.dataSuccess) {
                setBusinessDatas(getBusinessDatas.data.datas);
                setErpDatas(getBusinessDatas.data.ERP_data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const calendarArr = () => {
        const today = moment(`${selectYear}-${selectMonth}-01`);
        const firstWeek = today.clone().startOf('month').week();
        const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
        let result: Array<any> = [];
        let week: number = firstWeek;
        for (week; week <= lastWeek; week++) {
            result = result.concat(
                <tr key={week}>
                    {Array(7)
                        .fill(0)
                        // eslint-disable-next-line no-loop-func
                        .map((data, index) => {
                            let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                            if (days.format('MM') !== today.format('MM')) {
                                return (
                                    <td key={index} className="Telecommuting_Table_nextMonth">
                                        <div className="Telecommuting_Table_dayNumber">
                                            {/* <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div> */}
                                        </div>
                                    </td>
                                );
                            } else {
                                return (
                                    <td
                                        key={index}
                                        className={
                                            moment().format('YYYY-MM-DD') === days.format('YYYY-MM-DD')
                                                ? 'Telecommuting_Table_nowMonth'
                                                : 'Telecommuting_Table_nowMonth'
                                        }
                                    >
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                            <div className="Text">
                                                {ErpDatas.map((list: any) => {
                                                    const FirstDate = moment(list.business_trip_period.split('∼')[0]).subtract(1, 'days');
                                                    const SecondDate = moment(list.business_trip_period.split('∼')[1]).add(1, 'days');
                                                    return moment(days.format('YYYYMMDD')).isBetween(`${FirstDate}`, `${SecondDate}`) ? (
                                                        <div
                                                            style={{
                                                                marginBottom: '5px',
                                                                backgroundColor: '#e8f4b0',
                                                            }}
                                                        >
                                                            출장 일당
                                                        </div>
                                                    ) : (
                                                        <div></div>
                                                    );
                                                })}
                                                {BusinessDatas.map((list: any) => {
                                                    return days.format('YYYY-MM-DD') === list.apply_date ? (
                                                        list.type === '없음' ? (
                                                            ''
                                                        ) : list.type === '출장' ? (
                                                            <div></div>
                                                        ) : (
                                                            <div>
                                                                <div style={{ backgroundColor: '#a1aee0' }}>현장 수당</div>
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div></div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </td>
                                );
                            }
                        })}
                </tr>
            );
        }
        return result;
    };
    return (
        <BusinessTripShowContentMainDivBox>
            <div className="CanlenderPagePrinter">
                <div>
                    <h2>
                        {selectYear}년 {selectMonth}월 {selectTeam.toUpperCase()}
                        {'   '}
                        {selectName}
                    </h2>
                    <table className="Telecommuting_Table">
                        <thead>
                            <tr>
                                <th>일</th>
                                <th>월</th>
                                <th>화</th>
                                <th>수</th>
                                <th>목</th>
                                <th>금</th>
                                <th>토</th>
                            </tr>
                        </thead>
                        <tbody>{calendarArr()}</tbody>
                    </table>
                </div>
            </div>

            <ErpShowTableMainDivBox>
                <h4>ERP 출장 등록 현황</h4>
                <table>
                    <thead>
                        <tr>
                            <th>성명</th>
                            <th>출장지</th>
                            <th>출장 기간</th>
                            <th>출장 일수</th>
                            <th style={{ width: '500px' }}>비고</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ErpDatas.map((list, i) => {
                            return (
                                <tr key={list.paper_code}>
                                    <td>{list.name}</td>
                                    <td>{list.business_location}</td>
                                    <td>{list.business_trip_period}</td>
                                    <td>{list.business_tip_length} 일</td>
                                    <td style={{ width: '500px' }}>
                                        {list.erp_business_write_write_reason ? list.erp_business_write_write_reason : ''}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </ErpShowTableMainDivBox>
            <PrinterButtonContainer>
                <div className="WeekAfterOTWorkSpace_store_button_div">
                    {/* <button
                        onClick={() =>
                            window.open(
                                `/BusinessShowMonthPrinter/${selectId}/${selectName}/${selectTeam}/${selectYear}/${selectMonth}`,
                                'BusinessShowMonthPrinter',
                                'width=980, height=700'
                            )
                        }
                    >
                        출력하기
                    </button> */}
                    {PrinterControlData ? (
                        <button
                            onClick={() =>
                                window.open(
                                    `/BusinessShowMonthPrinter/${selectId}/${selectName}/${selectTeam}/${selectYear}/${selectMonth}`,
                                    'BusinessShowMonthPrinter',
                                    'width=980, height=700'
                                )
                            }
                        >
                            출력하기
                        </button>
                    ) : (
                        <div>
                            <h4>ERP 출장내역이 업로드 되지 않아 출력이 불가합니다.</h4>
                        </div>
                    )}
                </div>
            </PrinterButtonContainer>
        </BusinessTripShowContentMainDivBox>
    );
};

export default TeamLeaderBusinessTripContent;
