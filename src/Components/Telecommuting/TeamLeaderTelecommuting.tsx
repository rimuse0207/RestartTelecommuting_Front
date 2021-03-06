import React, { useState, useEffect } from 'react';
import moment from 'moment';
import SelectClickModalMainPage from '../SelectClickModal/SelectClickModalMainPage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../models/index';
import {
    TeamLeader_getFoodDataThunk,
    TeamLeader_FoodDataShowCheckedTrue,
    TeamLeader_FoodDataShowCheckedFalse,
} from '../../models/TeamLeader_Thunk_models/TeamLeaderFoodData';
import {
    TeamLeader_getUSBCDThunk,
    USBCDDataShowCheckedFalse,
    USBCDDataShowCheckedTrue,
} from '../../models/TeamLeader_Thunk_models/TeamLeaderUSBCDData';
import {
    TeamLeader_getTelecommutingThunk,
    TeamLeader_TelecommutingDataShowCheckedTrue,
    TeamLeader_TelecommutingDataShowCheckedFalse,
} from '../../models/TeamLeader_Thunk_models/TeamLeaderTelecommutingData';
import {
    getTeamLeaderAFTEROTdataThunk,
    TeamLeaderAfterOTDataShowCheckedFalse,
    TeamLeaderAfterOTShowCheckedTrue,
} from '../../models/TeamLeader_Thunk_models/TeamLeaderAfterOTData';
import {
    getTeamLeaderBEFOREOTdataThunk,
    TeamLeader_BeforeOTDataShowCheckedFalse,
    TeamLeader_BeforeOTShowCheckedTrue,
} from '../../models/TeamLeader_Thunk_models/TeamLeaderBeforeOTData';
import { DecryptKey } from '../../config';
import axios from 'axios';
import { toast } from '../ToastMessage/ToastManager';
import { NothingGet } from '../API/GETApi/GetApi';
const TeamLeaderTelecommuting = () => {
    const dispatch = useDispatch();
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const FoodData = useSelector((state: RootState) => state.TeamLeaderFoodData.TeamLeader_FoodDatas);
    const USBCDData = useSelector((state: RootState) => state.TeamLeaderUSBCDDataGetting.TeamLeader_USBCDDatas);
    const TeamLeader_TelecommutingData = useSelector(
        (state: RootState) => state.TeamLeader_TelecommutingDataGetting.TeamLeader_TelecommutingDatas
    );
    const AfterOTData = useSelector((state: RootState) => state.TeamLeaderAfterOTData.TeamLeader_AfterOTDatas);
    const BeforeOTData = useSelector((state: RootState) => state.TeamLeaderBeforeOTData.TeamLeader_BeforeOTDatas);
    const NavAccessTokenState = useSelector((state: RootState) => state.Nav_AccessTokens);

    const [getMoment, setMoment] = useState(moment());
    const [onClicked, setOnClickedSet] = useState(false);
    const [clicksData, setClicksData] = useState<any | null>(null);
    const [telecommutingApply_check, settelecommutingApply_check] = useState(true);
    const [AfterOtApply_check, setAfterOtApply_check] = useState(true);
    const [BeforeOtApply_check, setBeforeOtApply_check] = useState(true);
    const [foodApply_check, setfoodApply_check] = useState(true);
    const [usbApply_check, setusbApply_check] = useState(true);
    const [SearchName, setSearchName] = useState('');
    const [clicksTitle, setClicksTitle] = useState('');
    const [belongsName, setBelongsName] = useState([]);

    useEffect(() => {
        if (NavAccessTokenState.FoodLeaderAccess === 1) {
            if (foodApply_check) dispatch(TeamLeader_getFoodDataThunk(getMoment, InfomationState));
        }
    }, [foodApply_check, getMoment]);
    useEffect(() => {
        if (NavAccessTokenState.USBApplyLeaderAccess === 1) {
            if (usbApply_check) dispatch(TeamLeader_getUSBCDThunk(getMoment, InfomationState));
        }
    }, [usbApply_check, getMoment]);
    useEffect(() => {
        if (NavAccessTokenState.AfterOTLeaderAccess === 1) {
            if (AfterOtApply_check) dispatch(getTeamLeaderAFTEROTdataThunk(getMoment, InfomationState));
        }
        // else if (
        //     IDS === 'jhlee1@dhk.co.kr' ||
        //     IDS === 'jycha@dhk.co.kr' ||
        //     IDS === 'htchoi@dhk.co.kr' ||
        //     IDS === 'jmlee@dhk.co.kr' ||
        //     IDS === 'sjpark@dhk.co.kr' ||
        //     IDS === 'dikim@dhk.co.kr'
        // ) {
        //     if (AfterOtApply_check) dispatch(getTeamLeaderAFTEROTdataThunk(getMoment, InfomationState));
        // }
    }, [AfterOtApply_check, getMoment]);
    useEffect(() => {
        if (NavAccessTokenState.BeforeOTLeaderAccess === 1) {
            if (BeforeOtApply_check) dispatch(getTeamLeaderBEFOREOTdataThunk(getMoment, InfomationState));
        }
        // else if (
        //     IDS === 'jhlee1@dhk.co.kr' ||
        //     IDS === 'jycha@dhk.co.kr' ||
        //     IDS === 'htchoi@dhk.co.kr' ||
        //     IDS === 'jmlee@dhk.co.kr' ||
        //     IDS === 'sjpark@dhk.co.kr' ||
        //     IDS === 'dikim@dhk.co.kr'
        // ) {
        //     if (BeforeOtApply_check) dispatch(getTeamLeaderBEFOREOTdataThunk(getMoment, InfomationState));
        // }
    }, [BeforeOtApply_check, getMoment]);
    useEffect(() => {
        if (NavAccessTokenState.TeleLeaderAccess === 1) {
            if (telecommutingApply_check) dispatch(TeamLeader_getTelecommutingThunk(getMoment, InfomationState));
        }
    }, [telecommutingApply_check, getMoment]);

    useEffect(() => {
        getSomeNamesData();
    }, []);

    const today = getMoment;
    const firstWeek = today.clone().startOf('month').week();
    const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    const ModalOpensClick = (dataChecked: string) => {
        setClicksData(new Date(dataChecked));
        setOnClickedSet(!onClicked);
    };

    const handleChangeSelectNames = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchName(e.target.value);
    };

    const getSomeNamesData = async () => {
        try {
            const getSomeNamesDataServer = await NothingGet(`${process.env.REACT_APP_API_URL}/GetSomesNamesData`);

            if (getSomeNamesDataServer.data.dataSuccess) {
                setBelongsName(getSomeNamesDataServer.data.datas);
            } else {
                toast.show({
                    title: '?????? ???????????? ??????',
                    content: `IT?????? ?????? ????????????.`,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const calendarArr = () => {
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
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                        </div>
                                    </td>
                                );
                            } else {
                                return (
                                    <td
                                        key={index}
                                        className={
                                            moment().format('YYYY-MM-DD') === days.format('YYYY-MM-DD')
                                                ? 'Telecommuting_table_today'
                                                : 'Telecommuting_Table_nowMonth'
                                        }
                                    >
                                        <div className="Telecommuting_Table_dayNumber">
                                            <div style={{ paddingLeft: '5px' }}>{days.format('D')}</div>
                                            {TeamLeader_TelecommutingData.dataChecked ? (
                                                TeamLeader_TelecommutingData.data
                                                    .filter((names: { name: string }) => names.name.includes(SearchName))
                                                    .map((list: { day: string; approve: number; num: number; name: string }, i: number) => {
                                                        return moment(list.day).format('YYYY-MM-DD') === days.format('YYYY-MM-DD') ? (
                                                            <div
                                                                onClick={() => {
                                                                    setClicksData(list);
                                                                    setClicksTitle('Telecommuting');
                                                                    setOnClickedSet(true);
                                                                }}
                                                                key={list.num}
                                                                className={`Telecommuting_Table_Data_Insert ${
                                                                    list.approve === 0 ? 'blink' : ''
                                                                }`}
                                                            >{`( ?????? )_${list.name} ${list.approve === 0 ? 'X' : 'O'}`}</div>
                                                        ) : (
                                                            <div></div>
                                                        );
                                                    })
                                            ) : (
                                                <div></div>
                                            )}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_mon: string;
                                                              mon_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_mon === days.format('YYYY-MM-DD') ? (
                                                                  list.mon_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderBeforeOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#9061a8' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.mon_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <div></div>
                                                                  )
                                                              ) : (
                                                                  <div></div>
                                                              );
                                                          }
                                                      )
                                                : ''}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_tue: string;
                                                              tue_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_tue === days.format('YYYY-MM-DD') ? (
                                                                  list.tue_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderBeforeOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#9061a8' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.tue_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <div></div>
                                                                  )
                                                              ) : (
                                                                  <div></div>
                                                              );
                                                          }
                                                      )
                                                : ''}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_wed: string;
                                                              wed_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_wed === days.format('YYYY-MM-DD') ? (
                                                                  list.wed_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderBeforeOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#9061a8' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.wed_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <div></div>
                                                                  )
                                                              ) : (
                                                                  <div></div>
                                                              );
                                                          }
                                                      )
                                                : ''}

                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_thu: string;
                                                              thu_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_thu === days.format('YYYY-MM-DD') ? (
                                                                  list.thu_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderBeforeOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#9061a8' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.thu_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <div></div>
                                                                  )
                                                              ) : (
                                                                  <div></div>
                                                              );
                                                          }
                                                      )
                                                : ''}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_fri: string;
                                                              fri_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_fri === days.format('YYYY-MM-DD') ? (
                                                                  list.fri_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderBeforeOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#9061a8' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.fri_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <></>
                                                                  )
                                                              ) : (
                                                                  <></>
                                                              );
                                                          }
                                                      )
                                                : ''}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_sat: string;
                                                              sat_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_sat === days.format('YYYY-MM-DD') ? (
                                                                  list.sat_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderBeforeOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#9061a8' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.sat_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <></>
                                                                  )
                                                              ) : (
                                                                  <></>
                                                              );
                                                          }
                                                      )
                                                : ''}
                                            {BeforeOTData.dataChecked
                                                ? BeforeOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_sun: string;
                                                              sun_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_sun === days.format('YYYY-MM-DD') ? (
                                                                  list.sun_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderBeforeOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#9061a8' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.sun_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <></>
                                                                  )
                                                              ) : (
                                                                  <></>
                                                              );
                                                          }
                                                      )
                                                : ''}

                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_mon: string;
                                                              mon_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_mon === days.format('YYYY-MM-DD') ? (
                                                                  list.mon_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderAfterOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#7a2d2d' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.mon_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <></>
                                                                  )
                                                              ) : (
                                                                  <></>
                                                              );
                                                          }
                                                      )
                                                : ''}
                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_tue: string;
                                                              tue_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_tue === days.format('YYYY-MM-DD') ? (
                                                                  list.tue_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderAfterOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#7a2d2d' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.tue_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <></>
                                                                  )
                                                              ) : (
                                                                  <></>
                                                              );
                                                          }
                                                      )
                                                : ''}
                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_wed: string;
                                                              wed_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_wed === days.format('YYYY-MM-DD') ? (
                                                                  list.wed_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderAfterOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#7a2d2d' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.wed_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <></>
                                                                  )
                                                              ) : (
                                                                  <></>
                                                              );
                                                          }
                                                      )
                                                : ''}

                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_thu: string;
                                                              thu_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_thu === days.format('YYYY-MM-DD') ? (
                                                                  list.thu_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderAfterOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#7a2d2d' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.thu_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <></>
                                                                  )
                                                              ) : (
                                                                  <></>
                                                              );
                                                          }
                                                      )
                                                : ''}
                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_fri: string;
                                                              fri_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_fri === days.format('YYYY-MM-DD') ? (
                                                                  list.fri_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderAfterOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#7a2d2d' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.fri_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <></>
                                                                  )
                                                              ) : (
                                                                  <></>
                                                              );
                                                          }
                                                      )
                                                : ''}
                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_sat: string;
                                                              sat_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_sat === days.format('YYYY-MM-DD') ? (
                                                                  list.sat_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderAfterOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#7a2d2d' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.sat_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <></>
                                                                  )
                                                              ) : (
                                                                  <></>
                                                              );
                                                          }
                                                      )
                                                : ''}
                                            {AfterOTData.dataChecked
                                                ? AfterOTData.data
                                                      .filter((names: { name: string }) => names.name.includes(SearchName))
                                                      .map(
                                                          (list: {
                                                              date_sun: string;
                                                              sun_time: number;
                                                              leadercheck: number;
                                                              name: string;
                                                              number: number;
                                                          }) => {
                                                              return list.date_sun === days.format('YYYY-MM-DD') ? (
                                                                  list.sun_time > 0 ? (
                                                                      <div
                                                                          key={list.number}
                                                                          onClick={() => {
                                                                              setClicksData(list);
                                                                              setClicksTitle('TeamLeaderAfterOT');
                                                                              setOnClickedSet(true);
                                                                          }}
                                                                          className={`Telecommuting_Table_Data_Insert ${
                                                                              list.leadercheck === 0 ? 'blink' : ''
                                                                          }`}
                                                                          style={{ backgroundColor: '#7a2d2d' }}
                                                                      >
                                                                          ( ??????OT )_{list.name}_{list.sun_time}??????{' '}
                                                                          {list.leadercheck === 0 ? 'X' : 'O'}
                                                                      </div>
                                                                  ) : (
                                                                      <div></div>
                                                                  )
                                                              ) : (
                                                                  <div></div>
                                                              );
                                                          }
                                                      )
                                                : ''}

                                            {FoodData.dataChecked ? (
                                                FoodData.data
                                                    .filter((names: { name: string }) => names.name.includes(SearchName))
                                                    .map((list: { dates: string; spending: number; indexs: number; name: string }) => {
                                                        return list.dates === days.format('YYYY-MM-DD') ? (
                                                            <div
                                                                onClick={() => {
                                                                    setClicksData(list);
                                                                    setClicksTitle('Food');
                                                                    setOnClickedSet(true);
                                                                }}
                                                                key={list.indexs}
                                                                className="Telecommuting_Table_Data_Insert"
                                                                style={{ backgroundColor: '#5a267c' }}
                                                            >{`( ?????? )_${list.name} ${list.spending
                                                                .toString()
                                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}???`}</div>
                                                        ) : (
                                                            <div></div>
                                                        );
                                                    })
                                            ) : (
                                                <div></div>
                                            )}

                                            {USBCDData.dataChecked ? (
                                                USBCDData.data
                                                    .filter((names: { name: string }) => names.name.includes(SearchName))
                                                    .map(
                                                        (
                                                            list: { workdate: string; leadercheck: number; number: number; name: string },
                                                            i: number
                                                        ) => {
                                                            return list.workdate === days.format('YYYY-MM-DD') ? (
                                                                <div
                                                                    key={list.number}
                                                                    className={`Telecommuting_Table_Data_Insert ${
                                                                        list.leadercheck === 0 ? 'blink' : ''
                                                                    }`}
                                                                    style={{ backgroundColor: '#773b02' }}
                                                                    onClick={() => {
                                                                        setClicksData(list);
                                                                        setClicksTitle('USB/CD');
                                                                        setOnClickedSet(true);
                                                                    }}
                                                                >{`( USB )_${list.name} ${list.leadercheck === 0 ? 'X' : 'O'}`}</div>
                                                            ) : (
                                                                <div></div>
                                                            );
                                                        }
                                                    )
                                            ) : (
                                                <div></div>
                                            )}
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
    const modalClose = () => {
        setOnClickedSet(!onClicked);
    };
    return (
        <div>
            <div className="Telecommuting_date_show_div">
                <div className="Telecommuting_apply_div_box">
                    <div>
                        <span style={{ fontSize: 'medium' }}>??????: </span>
                        <input
                            className="TeamLeader_Tele_input"
                            placeholder="????????? ??????????????????."
                            value={SearchName}
                            onChange={e => setSearchName(e.target.value)}
                        ></input>
                        <select onChange={e => handleChangeSelectNames(e)} className="TeamLeader_Telecommuting_SearchedNames">
                            <option value="">????????? ??????????????????.</option>
                            {belongsName.map((list: { name: string }, i) => {
                                return (
                                    <option key={list.name} value={list.name}>
                                        {list.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="control">
                    <button
                        onClick={() => {
                            setMoment(getMoment.clone().subtract(1, 'month'));
                        }}
                    >
                        {'<<<'}
                    </button>
                    <span>{today.format('YYYY??? MM???')}</span>
                    <button
                        onClick={() => {
                            setMoment(getMoment.clone().add(1, 'month'));
                        }}
                    >
                        {'>>>'}
                    </button>
                </div>
                <div className="Telecommutign_checkbox_div">
                    <ul>
                        <li
                            onClick={() => {
                                if (telecommutingApply_check) {
                                    dispatch(TeamLeader_TelecommutingDataShowCheckedFalse());
                                } else {
                                    dispatch(TeamLeader_TelecommutingDataShowCheckedTrue());
                                }
                                settelecommutingApply_check(!telecommutingApply_check);
                            }}
                        >
                            <input type="checkbox" name="telecommutingApply_check" checked={telecommutingApply_check} readOnly></input>
                            ?????? ??????
                        </li>
                        <li
                            onClick={() => {
                                if (BeforeOtApply_check) {
                                    dispatch(TeamLeader_BeforeOTDataShowCheckedFalse());
                                } else {
                                    dispatch(TeamLeader_BeforeOTShowCheckedTrue());
                                }
                                setBeforeOtApply_check(!BeforeOtApply_check);
                            }}
                        >
                            <input type="checkbox" name="BeforeOtApply_check" checked={BeforeOtApply_check} readOnly></input>?????? OT
                        </li>
                        <li
                            onClick={() => {
                                if (AfterOtApply_check) {
                                    dispatch(TeamLeaderAfterOTDataShowCheckedFalse());
                                } else {
                                    dispatch(TeamLeaderAfterOTShowCheckedTrue());
                                }
                                setAfterOtApply_check(!AfterOtApply_check);
                            }}
                        >
                            <input type="checkbox" name="AfterOtApply_check" checked={AfterOtApply_check} readOnly></input>?????? OT
                        </li>
                        <li
                            onClick={() => {
                                if (foodApply_check) {
                                    dispatch(TeamLeader_FoodDataShowCheckedFalse());
                                } else {
                                    dispatch(TeamLeader_FoodDataShowCheckedTrue());
                                }
                                setfoodApply_check(!foodApply_check);
                            }}
                        >
                            <input type="checkbox" name="foodApply_check" checked={foodApply_check} readOnly></input> ?????? ??????
                        </li>
                        <li
                            onClick={() => {
                                if (usbApply_check) {
                                    dispatch(USBCDDataShowCheckedFalse());
                                } else {
                                    dispatch(USBCDDataShowCheckedTrue());
                                }
                                setusbApply_check(!usbApply_check);
                            }}
                        >
                            <input type="checkbox" name="usbApply_check" checked={usbApply_check} readOnly></input> USB??????
                        </li>
                    </ul>
                </div>
            </div>
            <div>
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

export default TeamLeaderTelecommuting;
