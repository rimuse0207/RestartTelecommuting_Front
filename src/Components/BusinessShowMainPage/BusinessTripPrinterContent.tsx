import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import { DecryptKey } from '../../config';
import { useParams } from 'react-router-dom';
const BusinessTripShowContentMainDivBox = styled.div`
    padding: 20px;
    .Telecommuting_Table {
        height: auto;
    }
    .Telecommuting_Table > tbody > tr > td {
        height: 70px !important;
    }
`;

const ErpShowTableMainDivBox = styled.div`
    table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    th,
    td {
        border: none;
        border: 1px solid #444444;
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

const PrinterInfoMainDivBox = styled.div`
    display: flex;
    justify-content: end;
    table {
        border-collapse: collapse;
        text-align: center;
        font-size: 1em;
        width: 100%;
    }
    table > thead,
    th {
        background-color: #fff !important;
        font-size: 0.9em;
        font-weight: bold;
    }
    tr > td {
        border: 1px solid black;
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

type paramasTypes = {
    id: string;
    team: string;
    name: string;
    year: string;
    month: string;
};
const BusinessTripPrinterContent = () => {
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const { id, team, name, year, month } = useParams<paramasTypes>();

    const [BusinessDatas, setBusinessDatas] = useState<businiessTypes[]>([]);
    const [ErpDatas, setErpDatas] = useState<ErpDatasTypes[]>([]);
    const [Loading, setLoading] = useState(false);
    useEffect(() => {
        if (InfomationState) getBusinessData();
    }, [InfomationState]);

    useEffect(() => {
        if (Loading) {
            setTimeout(() => {
                window.print();
            }, 1000);
            window.onafterprint = function () {
                window.close();
            };
        }
    }, [Loading]);

    const getBusinessData = async () => {
        try {
            const getBusinessDatas = await axios.get(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/businessGroupData`, {
                params: {
                    team,
                    name,
                    id,
                    year,
                    month,
                },
            });
            if (getBusinessDatas.data.dataSuccess) {
                console.log(getBusinessDatas);
                await setBusinessDatas(getBusinessDatas.data.datas);
                await setErpDatas(getBusinessDatas.data.ERP_data);
                await setLoading(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const calendarArr = () => {
        const today = moment(`${year}-${month}-01`);
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
                                                    const FirstDate = moment(list.business_trip_period.split('???')[0]).subtract(1, 'days');
                                                    const SecondDate = moment(list.business_trip_period.split('???')[1]).add(1, 'days');
                                                    return moment(days.format('YYYYMMDD')).isBetween(`${FirstDate}`, `${SecondDate}`) ? (
                                                        <div style={{ marginBottom: '5px', fontSize: '1.2em' }}>?????? ??????</div>
                                                    ) : (
                                                        <div></div>
                                                    );
                                                })}
                                                {BusinessDatas.map((list: any) => {
                                                    return days.format('YYYY-MM-DD') === list.apply_date ? (
                                                        list.type === '??????' ? (
                                                            ''
                                                        ) : list.type === '??????' ? (
                                                            <div></div>
                                                        ) : (
                                                            <div>
                                                                <h2 style={{ color: 'red', fontSize: '1.2em' }}>?????? ??????</h2>
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
                    <PrinterInfoMainDivBox>
                        <table>
                            <thead>
                                <tr>
                                    <td colSpan={2}>
                                        ?????? ?????? ?????????
                                        <br />
                                    </td>
                                    <td>????????????</td>
                                    <td>
                                        {year}??? {month}???
                                    </td>
                                    <td rowSpan={2}>
                                        ??????
                                        <br />
                                        ??????
                                    </td>
                                    <td rowSpan={2} style={{ width: '120px' }}></td>
                                </tr>
                                <tr>
                                    <td>??????</td>
                                    <td>{team.toUpperCase()}</td>
                                    <td>??????</td>
                                    <td>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <div>{name}</div>
                                            <div>(???)</div>
                                        </div>
                                    </td>
                                </tr>
                            </thead>
                        </table>
                    </PrinterInfoMainDivBox>
                    <table className="Telecommuting_Table">
                        <thead>
                            <tr>
                                <th>???</th>
                                <th>???</th>
                                <th>???</th>
                                <th>???</th>
                                <th>???</th>
                                <th>???</th>
                                <th>???</th>
                            </tr>
                        </thead>
                        <tbody>{calendarArr()}</tbody>
                    </table>
                </div>
            </div>
            <ErpShowTableMainDivBox>
                <h4>ERP ?????? ?????? ??????</h4>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '100px' }}>??????</th>
                            <th>?????????</th>
                            <th>?????? ??????</th>
                            <th style={{ width: '50px' }}>?????? ??????</th>
                            <th style={{ width: '300px' }}>??????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ErpDatas.map((list, i) => {
                            return (
                                <tr>
                                    <td>{list.name}</td>
                                    <td>{list.business_location}</td>
                                    <td>{list.business_trip_period}</td>
                                    <td>{list.business_tip_length} ???</td>
                                    <td style={{ width: '300px' }}>
                                        {list.erp_business_write_write_reason ? list.erp_business_write_write_reason : ''}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </ErpShowTableMainDivBox>
        </BusinessTripShowContentMainDivBox>
    );
};

export default BusinessTripPrinterContent;
