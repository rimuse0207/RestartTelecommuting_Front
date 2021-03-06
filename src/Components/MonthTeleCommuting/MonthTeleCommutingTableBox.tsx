import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RootState } from '../../models/index';
import { useSelector } from 'react-redux';
import MonthTeleExcelDownload from './MonthTeleExcelDownload';
import SelectClickModalMainPage from '../SelectClickModal/SelectClickModalMainPage';
import { OneParamsPost } from '../API/POSTApi/PostApi';

type MonthTeleCommutingTableBoxProps = {
    selectedYear: string;
    selectedMonth: string;
    SelectTeam: string;
    SelectedName: string;
    setSeletedName: (list: string) => void;
    IDS: string;
};

const MonthTeleCommutingTableBox = ({
    selectedYear,
    selectedMonth,
    SelectTeam,
    SelectedName,
    setSeletedName,
    IDS,
}: MonthTeleCommutingTableBoxProps) => {
    const [MonthTeleDatas, setMonthTeleDatas] = useState([]);
    const [clicksData, setClicksData] = useState({});
    const [clicksTitle, setClicksTitle] = useState('Telecommuting');
    const [onClicked, setOnClickedSet] = useState(false);

    useEffect(() => {
        MonthTeleData();
    }, [selectedYear, selectedMonth]);
    useEffect(() => {
        MonthTeleData();
    }, [SelectTeam]);
    const modalClose = () => {
        MonthTeleData();
        setOnClickedSet(!onClicked);
    };

    const MonthTeleData = async () => {
        const paramsData = { selectDate: `${selectedYear}-${selectedMonth}`, team: SelectTeam, id: IDS };
        try {
            const MonthTeleDataServer = await OneParamsPost(`/Tele_app_server/Data_get_TeamLeader_Telecommuting_Month_data`, paramsData);
            setMonthTeleDatas([]);
            if (MonthTeleDataServer.data.dataSuccess) {
                setMonthTeleDatas(MonthTeleDataServer.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div style={{ textAlign: 'end' }}>
                <MonthTeleExcelDownload
                    selectedYear={selectedYear}
                    selectedMonth={selectedMonth}
                    data={MonthTeleDatas}
                    SelectTeam={SelectTeam}
                ></MonthTeleExcelDownload>
            </div>
            <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                    <thead>
                        <tr>
                            <th>??????</th>
                            <th>??????</th>
                            <th>??????</th>
                            <th>??????</th>
                            <th>????????????</th>
                            <th>????????????</th>
                            <th>????????????</th>
                            <th>????????????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MonthTeleDatas.filter((names: { name: string }) => names.name.includes(SelectedName)).map(
                            (
                                list: {
                                    num: string;
                                    day: string;
                                    team: string;
                                    name: string;
                                    stat_t: string;
                                    end_t: string;
                                    approve: number;
                                },
                                i
                            ) => {
                                return (
                                    <tr key={list.num}>
                                        <td>{i + 1}</td>
                                        <td>{list.day}</td>
                                        <td>{list.team}</td>
                                        <td
                                            title="?????? ????????? ?????? ????????? ?????? ?????????."
                                            className="MonthSelectedName"
                                            onDoubleClick={() => setSeletedName(list.name)}
                                        >
                                            {list.name}
                                        </td>
                                        <td>{list.stat_t}</td>
                                        <td>{list.end_t}</td>
                                        <td
                                            className="MonthSelectedName"
                                            onClick={() => {
                                                setClicksData(list);
                                                setClicksTitle('Telecommuting');
                                                setOnClickedSet(true);
                                            }}
                                        >
                                            ??????
                                        </td>
                                        <td>{list.approve === 1 ? 'O' : 'X'}</td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
            {onClicked ? (
                <SelectClickModalMainPage
                    onClicked={onClicked}
                    modalClose={modalClose}
                    clicksData={clicksData}
                    clicksTitle={clicksTitle}
                    setClicksData={(data: {}) => setClicksData(data)}
                ></SelectClickModalMainPage>
            ) : (
                ''
            )}
        </div>
    );
};

export default MonthTeleCommutingTableBox;
