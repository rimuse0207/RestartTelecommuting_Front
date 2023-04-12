import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { DecryptKey } from '../../../../../../config';
import { RootState } from '../../../../../../models';
import { toast } from '../../../../../ToastMessage/ToastManager';
import moment from 'moment';
import {
    CeCalendarTableProps,
    CSM_CE_CALENDAR_CHECKED_Func,
    CSM_Data_Checked_Delete_Func,
    CSM_Data_Checked_Func,
    get_CSM_DataThunk,
} from '../../../../../../models/Thunk_models/CSM_Redux_Thunk/CSM_Redux';
import {
    CSM_Selected_Data_List_Func,
    CSM_Selected_Data_List_Reset_Func,
} from '../../../../../../models/CSMFilteringRedux/CSMSelectedRedux';
import { CSMMainContentProps_Types } from '../CSMMainContent';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import { paramasTypes, SelectTeamsMenuTypes } from '../../CeCalendarMasterPage';
import { useParams } from 'react-router-dom';
import LoaderMainPage from '../../../../../Loader/LoaderMainPage';
import CSMSelectShowContent from '../CSMSelectShowContent/CSMSelectShowContent';

const CSMNothingUserContentMainDivBox = styled.div`
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .Hidden_Data_ON {
        opacity: 0.5;
    }
    .clickHover {
        :hover {
            cursor: pointer;
            background-color: lightgray !important;
            /* background-color: lightgray; */
        }
    }
`;

type arrangeStateType = {
    value: string;
    state_value: string;
    up_arrange_value: boolean;
    down_arrange_value: boolean;
    now_checked_value: boolean;
    classNames: string;
};

type CSMNothingUserContentPropsType = {
    SelectTeamsMenu: SelectTeamsMenuTypes[];
};

const CSMNothingUserContent = ({ SelectTeamsMenu }: CSMNothingUserContentPropsType) => {
    const dispatch = useDispatch();
    const { pagenumber, type } = useParams<paramasTypes>();
    const CSM_Datas = useSelector((state: RootState) => state.CSMDataGetting.CSM_Data);
    const CSM_Selected_Data_List = useSelector((state: RootState) => state.CSM_Selected_Data_List.Csm_Selected_Data);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const GetCSMFilteringData = useSelector((state: RootState) => state.CSMFiltering);
    const Nav_AccessTokens = useSelector((state: RootState) => state.Nav_AccessTokens);
    // const [hiddenChecked, setHiddenChecked] = useState(false);
    const [AllChecking, setAllChecking] = useState(false);
    const [ModalOpen, setModalOpen] = useState(false);
    const [FirstClickData, setFirstClickData] = useState<CeCalendarTableProps | any>();
    const [FirstClickIndexNumber, setFirstClickIndexNumber] = useState(0);
    const [getCeCalendarDatas, setGetCeCalendarDatas] = useState<CeCalendarTableProps>();
    const [hiddenChecked, setHiddenChecked] = useState(false);
    const [arrangeState, setArrangeState] = useState<arrangeStateType[]>([
        {
            value: 'CSM',
            state_value: 'csm_basic_data_csm_number',
            up_arrange_value: false,
            down_arrange_value: false,
            now_checked_value: false,
            classNames: 'Table_Sixth',
        },
        {
            value: 'MODEL',
            state_value: 'csm_basic_data_model_number',
            up_arrange_value: false,
            down_arrange_value: false,
            now_checked_value: false,
            classNames: 'Table_Seventh',
        },
        {
            value: '제번',
            state_value: 'csm_basic_data_binds',
            up_arrange_value: false,
            down_arrange_value: false,
            now_checked_value: false,
            classNames: 'Table_Eighth',
        },
        {
            value: '고객사',
            state_value: 'csm_basic_data_custom',
            up_arrange_value: false,
            down_arrange_value: false,
            now_checked_value: false,
            classNames: 'Table_Ninth',
        },
        {
            value: 'Part NO.',
            state_value: 'csm_basic_data_part_number',
            up_arrange_value: false,
            down_arrange_value: false,
            now_checked_value: false,
            classNames: 'Table_Tenth',
        },
        {
            value: '제목',
            state_value: 'csm_basic_data_titles',
            up_arrange_value: false,
            down_arrange_value: false,
            now_checked_value: false,
            classNames: '',
        },
        {
            value: '비고',
            state_value: 'csm_basic_data_etc',
            up_arrange_value: false,
            down_arrange_value: false,
            now_checked_value: false,
            classNames: '',
        },
    ]);

    const handleChangeClickHidden = async (e: any, datas: CeCalendarTableProps, numbers: number) => {
        e.stopPropagation();
        if (e.shiftKey) {
            if (numbers > FirstClickIndexNumber) {
                const CSM_Datas_Selected = CSM_Datas.data.map((list, j) => {
                    return j <= numbers && j > FirstClickIndexNumber ? { ...list, csm_data_slect: 1 } : list;
                });

                const CSM_Datas_Selected_Belong_Datas = CSM_Datas.data.filter((list, j) => {
                    return j <= numbers && j > FirstClickIndexNumber;
                });

                // 선택항목 Redux에서 추가
                dispatch(CSM_Selected_Data_List_Func(CSM_Selected_Data_List.concat(CSM_Datas_Selected_Belong_Datas)));
                // 선택항목 Redux에서 체크 등록
                dispatch(CSM_Data_Checked_Func(CSM_Datas_Selected));
                setFirstClickData(null);
                setFirstClickIndexNumber(0);
            } else {
                const CSM_Datas_Selected = CSM_Datas.data.map((list, j) => {
                    return j < FirstClickIndexNumber && j >= numbers ? { ...list, csm_data_slect: 1 } : list;
                });

                const CSM_Datas_Selected_Belong_Datas = CSM_Datas.data.filter((list, j) => {
                    return j < FirstClickIndexNumber && j >= numbers;
                });

                // 선택항목 Redux에서 추가
                dispatch(CSM_Selected_Data_List_Func(CSM_Selected_Data_List.concat(CSM_Datas_Selected_Belong_Datas)));
                // 선택항목 Redux에서 체크 등록
                dispatch(CSM_Data_Checked_Func(CSM_Datas_Selected));
                setFirstClickData(null);
                setFirstClickIndexNumber(0);
            }
        } else {
            setFirstClickData(datas);
            setFirstClickIndexNumber(numbers);
            try {
                if (datas.csm_data_slect === 1) {
                    const CSM_Datas_Selected = CSM_Datas.data.map(list => {
                        return list.csm_basic_data_csm_key === datas.csm_basic_data_csm_key ? { ...list, csm_data_slect: 0 } : list;
                    });

                    const CSM_Selected_Data_List_Delete = CSM_Selected_Data_List.filter(
                        list => list.csm_basic_data_csm_key !== datas.csm_basic_data_csm_key
                    );
                    // 선택항목 Redux에서 제거
                    dispatch(CSM_Selected_Data_List_Func(CSM_Selected_Data_List_Delete));
                    // 선택항목 Redux에서 체크 해제
                    dispatch(CSM_Data_Checked_Delete_Func(CSM_Datas_Selected));
                    setFirstClickData(null);
                    setFirstClickIndexNumber(0);
                } else {
                    const CSM_Datas_Selected = CSM_Datas.data.map(list => {
                        return list.csm_basic_data_csm_key === datas.csm_basic_data_csm_key ? { ...list, csm_data_slect: 1 } : list;
                    });
                    // 선택항목 Redux에서 추가
                    dispatch(CSM_Selected_Data_List_Func(CSM_Selected_Data_List.concat(datas)));
                    // 선택항목 Redux에서 체크 등록
                    dispatch(CSM_Data_Checked_Func(CSM_Datas_Selected));
                }
            } catch (error) {
                console.log(error);
                toast.show({
                    title: 'ERROR!',
                    content: `ERROR! 서버와의 통신이 끊어졌습니다. `,
                    duration: 6000,
                    DataSuccess: false,
                });
            }
        }
    };

    const handleClicksDeleteData = async (e: React.MouseEvent<HTMLDivElement>, datas: CeCalendarTableProps, text: string) => {
        e.stopPropagation();

        if (Nav_AccessTokens.CSM_Master_Access !== 1) {
            return;
        }

        try {
            if (text === '발행') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '발행',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const CalendarChange_Data = CSM_Datas.data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_publish: '',
                                  csm_calendar_publish_id: '',
                              }
                            : item
                    );
                    dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
                }
            } else if (text === '신청') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '신청',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const CalendarChange_Data = CSM_Datas.data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_apply: '',
                                  csm_calendar_apply_id: '',
                              }
                            : item
                    );
                    dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
                }
            } else if (text === '입고') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '입고',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const CalendarChange_Data = CSM_Datas.data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_entering: '',
                                  csm_calendar_entering_id: '',
                              }
                            : item
                    );
                    dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
                }
            } else if (text === 'CE') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: 'CE',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const CalendarChange_Data = CSM_Datas.data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_ce: '',
                                  csm_calendar_ce_id: '',
                              }
                            : item
                    );
                    dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
                }
            } else if (text === '고객') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '고객',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const CalendarChange_Data = CSM_Datas.data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_custom_date: '',
                                  csm_calendar_custom_date_id: '',
                              }
                            : item
                    );
                    dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
                }
            } else if (text === 'PAY') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: 'PAY',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const CalendarChange_Data = CSM_Datas.data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_pay: '',
                                  csm_calendar_pay_id: '',
                              }
                            : item
                    );
                    dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
                }
            } else if (text === 'finished') {
                const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/DeleteData`, {
                    selectEnter: '완료',
                    datas,
                    names: DecryptKey(InfomationState.name),
                });
                if (DataUpdateCECalendar.data.dataSuccess) {
                    const CalendarChange_Data = CSM_Datas.data.map(item =>
                        item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                            ? {
                                  ...item,
                                  csm_calendar_finall: '',
                                  csm_calendar_finall_id: '',
                              }
                            : item
                    );
                    dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClicks = async (e: React.MouseEvent<HTMLButtonElement>, datas: CeCalendarTableProps, text: string) => {
        e.stopPropagation();
        if (text === '발행') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '발행',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const CalendarChange_Data = CSM_Datas.data.map(item =>
                    item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                        ? {
                              ...item,
                              csm_calendar_publish: moment().format('YYYY-MM-DD'),
                              csm_calendar_publish_id: DecryptKey(InfomationState.name),
                          }
                        : item
                );

                dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
            }
        } else if (text === '신청') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '신청',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const CalendarChange_Data = CSM_Datas.data.map(item =>
                    item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                        ? {
                              ...item,
                              csm_calendar_apply: moment().format('YYYY-MM-DD'),
                              csm_calendar_apply_id: DecryptKey(InfomationState.name),
                          }
                        : item
                );
                dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
            }
        } else if (text === '입고') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '입고',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const CalendarChange_Data = CSM_Datas.data.map(item =>
                    item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                        ? {
                              ...item,
                              csm_calendar_entering: moment().format('YYYY-MM-DD'),
                              csm_calendar_entering_id: DecryptKey(InfomationState.name),
                          }
                        : item
                );
                dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
            }
        } else if (text === 'CE') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: 'CE',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const CalendarChange_Data = CSM_Datas.data.map(item =>
                    item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                        ? {
                              ...item,
                              csm_calendar_ce: moment().format('YYYY-MM-DD'),
                              csm_calendar_ce_id: DecryptKey(InfomationState.name),
                          }
                        : item
                );
                dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
            }
        } else if (text === '고객') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '고객',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const CalendarChange_Data = CSM_Datas.data.map(item =>
                    item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                        ? {
                              ...item,
                              csm_calendar_custom_date: moment().format('YYYY-MM-DD'),
                              csm_calendar_custom_date_id: DecryptKey(InfomationState.name),
                          }
                        : item
                );
                dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
            }
        } else if (text === 'PAY') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: 'PAY',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const CalendarChange_Data = CSM_Datas.data.map(item =>
                    item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                        ? {
                              ...item,
                              csm_calendar_pay: moment().format('YYYY-MM-DD'),
                              csm_calendar_pay_id: DecryptKey(InfomationState.name),
                          }
                        : item
                );
                dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
            }
        } else if (text === 'finished') {
            const DataUpdateCECalendar = await axios.post(`${process.env.REACT_APP_DB_HOST}/CE_Calendar_app_server/UpdateData`, {
                selectEnter: '완료',
                datas,
                names: DecryptKey(InfomationState.name),
            });
            if (DataUpdateCECalendar.data.dataSuccess) {
                const CalendarChange_Data = CSM_Datas.data.map(item =>
                    item.csm_calendar_csm_key === datas.csm_calendar_csm_key
                        ? {
                              ...item,
                              csm_calendar_finall: moment().format('YYYY-MM-DD'),
                              csm_calendar_finall_id: DecryptKey(InfomationState.name),
                          }
                        : item
                );
                dispatch(CSM_CE_CALENDAR_CHECKED_Func(CalendarChange_Data));
            }
        }
    };

    const handleChecking = () => {
        if (AllChecking) {
            const CSM_Datas_Selected = CSM_Datas.data.map(list => {
                return { ...list, csm_data_slect: 0 };
            });
            const Duple_Delete_Data = CSM_Selected_Data_List.filter((item, i) => {
                return (
                    CSM_Datas_Selected.findIndex((item2, j) => {
                        return item.csm_basic_data_csm_key !== item2.csm_basic_data_csm_key;
                    }) === i
                );
            });
            // 선택항목 Redux에서 추가
            dispatch(CSM_Selected_Data_List_Func(Duple_Delete_Data));
            // 선택항목 Redux에서 체크 등록
            dispatch(CSM_Data_Checked_Func(CSM_Datas_Selected));

            setAllChecking(false);
        } else {
            const CSM_Datas_Selected = CSM_Datas.data.map(list => {
                return { ...list, csm_data_slect: 1 };
            });

            const Duple_Delete_Data = CSM_Datas_Selected.filter((item, i) => {
                return (
                    CSM_Datas_Selected.findIndex((item2, j) => {
                        return item.csm_basic_data_csm_key === item2.csm_basic_data_csm_key;
                    }) === i
                );
            });

            // 선택항목 Redux에서 추가
            dispatch(CSM_Selected_Data_List_Func(Duple_Delete_Data));
            // 선택항목 Redux에서 체크 등록
            dispatch(CSM_Data_Checked_Func(CSM_Datas_Selected));
            setAllChecking(true);
        }
    };

    const handleArrenge = (ClickMenu: arrangeStateType) => {
        ///CSM 정렬
        if (ClickMenu.state_value === 'csm_basic_data_csm_number') {
            if (ClickMenu.up_arrange_value) {
                // DESC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: true, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_csm_number.toLowerCase() < b.csm_basic_data_csm_number.toLowerCase() ? 1 : -1
                );
                dispatch(CSM_Data_Checked_Func(result));
            } else if (ClickMenu.down_arrange_value) {
                // ASC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) => (a.csm_basic_data_indexs < b.csm_basic_data_indexs ? -1 : 1));
                dispatch(CSM_Data_Checked_Func(result));
            } else {
                // 둘다 정렬 상태가 아닐때
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: true }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_csm_number.toLowerCase() < b.csm_basic_data_csm_number.toLowerCase() ? -1 : 1
                );
                dispatch(CSM_Data_Checked_Func(result));
            }
        }
        ///MODEL 정렬
        else if (ClickMenu.state_value === 'csm_basic_data_model_number') {
            if (ClickMenu.up_arrange_value) {
                // DESC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: true, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_model_number.toLowerCase() < b.csm_basic_data_model_number.toLowerCase() ? 1 : -1
                );
                dispatch(CSM_Data_Checked_Func(result));
            } else if (ClickMenu.down_arrange_value) {
                // ASC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) => (a.csm_basic_data_indexs < b.csm_basic_data_indexs ? -1 : 1));
                dispatch(CSM_Data_Checked_Func(result));
            } else {
                // 둘다 정렬 상태가 아닐때
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: true }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_model_number.toLowerCase() < b.csm_basic_data_model_number.toLowerCase() ? -1 : 1
                );
                dispatch(CSM_Data_Checked_Func(result));
            }
        }
        ///제번 정렬
        else if (ClickMenu.state_value === 'csm_basic_data_binds') {
            if (ClickMenu.up_arrange_value) {
                // DESC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: true, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_binds.toLowerCase() < b.csm_basic_data_binds.toLowerCase() ? 1 : -1
                );
                dispatch(CSM_Data_Checked_Func(result));
            } else if (ClickMenu.down_arrange_value) {
                // ASC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) => (a.csm_basic_data_indexs < b.csm_basic_data_indexs ? -1 : 1));
                dispatch(CSM_Data_Checked_Func(result));
            } else {
                // 둘다 정렬 상태가 아닐때
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: true }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_binds.toLowerCase() < b.csm_basic_data_binds.toLowerCase() ? -1 : 1
                );
                dispatch(CSM_Data_Checked_Func(result));
            }
        }
        //고객사 정렬
        else if (ClickMenu.state_value === 'csm_basic_data_custom') {
            if (ClickMenu.up_arrange_value) {
                // DESC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: true, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_custom.toLowerCase() < b.csm_basic_data_custom.toLowerCase() ? 1 : -1
                );
                dispatch(CSM_Data_Checked_Func(result));
            } else if (ClickMenu.down_arrange_value) {
                // ASC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) => (a.csm_basic_data_indexs < b.csm_basic_data_indexs ? -1 : 1));
                dispatch(CSM_Data_Checked_Func(result));
            } else {
                // 둘다 정렬 상태가 아닐때
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: true }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_custom.toLowerCase() < b.csm_basic_data_custom.toLowerCase() ? -1 : 1
                );
                dispatch(CSM_Data_Checked_Func(result));
            }
        }
        ///Part NO 정렬
        else if (ClickMenu.state_value === 'csm_basic_data_part_number') {
            if (ClickMenu.up_arrange_value) {
                // DESC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: true, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_part_number.toLowerCase() < b.csm_basic_data_part_number.toLowerCase() ? 1 : -1
                );
                dispatch(CSM_Data_Checked_Func(result));
            } else if (ClickMenu.down_arrange_value) {
                // ASC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) => (a.csm_basic_data_indexs < b.csm_basic_data_indexs ? -1 : 1));
                dispatch(CSM_Data_Checked_Func(result));
            } else {
                // 둘다 정렬 상태가 아닐때
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: true }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_part_number.toLowerCase() < b.csm_basic_data_part_number.toLowerCase() ? -1 : 1
                );
                dispatch(CSM_Data_Checked_Func(result));
            }
        }
        ///제목 정렬
        else if (ClickMenu.state_value === 'csm_basic_data_titles') {
            if (ClickMenu.up_arrange_value) {
                // DESC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: true, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_titles.toLowerCase() < b.csm_basic_data_titles.toLowerCase() ? 1 : -1
                );
                dispatch(CSM_Data_Checked_Func(result));
            } else if (ClickMenu.down_arrange_value) {
                // ASC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) => (a.csm_basic_data_indexs < b.csm_basic_data_indexs ? -1 : 1));
                dispatch(CSM_Data_Checked_Func(result));
            } else {
                // 둘다 정렬 상태가 아닐때
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: true }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_titles.toLowerCase() < b.csm_basic_data_titles.toLowerCase() ? -1 : 1
                );
                dispatch(CSM_Data_Checked_Func(result));
            }
        }
        ///비고 정렬
        else if (ClickMenu.state_value === 'csm_basic_data_etc') {
            if (ClickMenu.up_arrange_value) {
                // DESC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: true, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_etc.toLowerCase() < b.csm_basic_data_etc.toLowerCase() ? 1 : -1
                );
                dispatch(CSM_Data_Checked_Func(result));
            } else if (ClickMenu.down_arrange_value) {
                // ASC 정렬 상태
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: false }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) => (a.csm_basic_data_indexs < b.csm_basic_data_indexs ? -1 : 1));
                dispatch(CSM_Data_Checked_Func(result));
            } else {
                // 둘다 정렬 상태가 아닐때
                const AllCheckedDelete = arrangeState.map(list => {
                    return list.state_value === ClickMenu.state_value
                        ? { ...list, down_arrange_value: false, up_arrange_value: true }
                        : { ...list, down_arrange_value: false, up_arrange_value: false };
                });
                setArrangeState(AllCheckedDelete);
                const result = CSM_Datas.data.sort((a, b) =>
                    a.csm_basic_data_etc.toLowerCase() < b.csm_basic_data_etc.toLowerCase() ? -1 : 1
                );
                dispatch(CSM_Data_Checked_Func(result));
            }
        }
    };

    const dataGetSome = async () => {
        SelectTeamsMenu.map((list, j) => {
            if (list.selected) {
                dispatch(
                    get_CSM_DataThunk(GetCSMFilteringData.CSMFilteringData, pagenumber, list.name, hiddenChecked, CSM_Selected_Data_List)
                );
            }
        });
    };

    useEffect(() => {
        if (CSM_Selected_Data_List.length > 0) {
            dispatch(CSM_Selected_Data_List_Reset_Func());
            toast.show({
                title: '선택항목 초기화',
                content: `데이터가 갱신되어 선택항목이 초기화 됩니다.`,
                duration: 4000,
                DataSuccess: true,
            });
        }
    }, [SelectTeamsMenu, hiddenChecked]);

    useEffect(() => {
        dataGetSome();
    }, [GetCSMFilteringData, hiddenChecked, SelectTeamsMenu]);

    return (
        <CSMNothingUserContentMainDivBox>
            <div style={{ display: 'inline-block' }}>
                <div>
                    {Nav_AccessTokens.CSM_Master_Access === 1 ? (
                        <div
                            onClick={() => setHiddenChecked(!hiddenChecked)}
                            className="ThirdTest_list_hidden_box"
                            style={{ fontSize: '0.7em' }}
                        >
                            <input type="checkbox" checked={hiddenChecked}></input>
                            {hiddenChecked ? <span>숨김 목록 숨기기</span> : <span>숨김 목록 보기</span>}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
            <h4>사용자 미등록({CSM_Datas.data ? CSM_Datas.data.length : 0})</h4>
            <div className="Table_container">
                <table className="type09" id="CeCalendarTables">
                    <thead>
                        <tr className="Table_Tr_position">
                            <th className="Table_First" style={{ textAlign: 'center' }}>
                                선택({CSM_Selected_Data_List.length})
                                <div>
                                    <input type="checkbox" checked={AllChecking} onChange={handleChecking} defaultChecked={false}></input>
                                </div>
                            </th>
                            <th className="Table_Second">인덱스</th>
                            <th className="Table_Third">상태</th>
                            <th className="Table_Fourth">등급</th>
                            {arrangeState.map((list, j) => {
                                return (
                                    <th
                                        key={list.state_value}
                                        className={`${list.classNames} clickHover`}
                                        onClick={() => handleArrenge(list)}
                                    >
                                        <div>
                                            <span>{list.value}</span>
                                            {list.up_arrange_value ? (
                                                <span>
                                                    <IoMdArrowDropup></IoMdArrowDropup>
                                                </span>
                                            ) : (
                                                ''
                                            )}
                                            {list.down_arrange_value ? (
                                                <span>
                                                    <IoMdArrowDropdown></IoMdArrowDropdown>
                                                </span>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                            {/* <th>사용자 이름</th> */}
                            <th>작업시간</th>
                            <th>작업인원</th>
                            <th>발행</th>
                            <th>신청</th>
                            <th>입고</th>
                            <th>CE</th>
                            <th>고객</th>
                            <th>PAY</th>
                            <th>완료</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!CSM_Datas.error ? (
                            CSM_Datas.data?.map((list, i) => {
                                var classnamesAUTO = 'basic';

                                if (!list.csm_calendar_publish) {
                                    classnamesAUTO = 'basic_yellow';
                                } else if (!list.csm_calendar_apply) {
                                    classnamesAUTO = 'basic_lime';
                                } else if (!list.csm_calendar_entering) {
                                    classnamesAUTO = 'basic_blue';
                                } else if (!list.csm_calendar_ce) {
                                    classnamesAUTO = 'basic_purple';
                                } else if (!list.csm_calendar_custom_date) {
                                    classnamesAUTO = 'basic_skyblue';
                                } else if (!list.csm_calendar_pay) {
                                    classnamesAUTO = 'basic_orange';
                                } else if (!list.csm_calendar_finall) {
                                    classnamesAUTO = 'basic_finish';
                                }
                                return (
                                    <tr
                                        key={list.csm_calendar_indexs}
                                        className={`Table_hover_check ${list.csm_calendar_hidden_on !== 0 ? 'Hidden_Data_ON' : ''}`}
                                        onClick={e => handleChangeClickHidden(e, list, i)}
                                        style={
                                            FirstClickData?.csm_basic_data_csm_key === list.csm_basic_data_csm_key
                                                ? { background: 'lightgray' }
                                                : {}
                                        }
                                    >
                                        <td className="Table_First">
                                            <input
                                                type="checkbox"
                                                checked={list.csm_data_slect === 1 ? true : false}
                                                defaultChecked={false}
                                                onChange={e => handleChangeClickHidden(e, list, i)}
                                            ></input>
                                        </td>
                                        <td className="Table_Second">{i + 1}</td>
                                        <td className="Table_Third">{list.csm_basic_data_state}</td>
                                        <td className="Table_Fourth">{list.csm_basic_data_grade}</td>
                                        <td className="Table_Sixth">{list.csm_basic_data_csm_number}</td>
                                        <td className="Table_Seventh">{list.csm_basic_data_model_number}</td>
                                        <td className="Table_Eighth">{list.csm_basic_data_binds}</td>
                                        <td className="Table_Ninth">{list.csm_basic_data_custom}</td>
                                        <td className="Table_Tenth">{list.csm_basic_data_part_number}</td>
                                        <td>{list.csm_basic_data_titles}</td>
                                        <td>{list.csm_basic_data_etc}</td>

                                        {/* <td>{list.name}</td> */}

                                        <td>
                                            {list.csm_user_input_data_working_hours ? `${list.csm_user_input_data_working_hours} 시간` : ''}
                                        </td>
                                        <td>
                                            {list.csm_user_input_data_working_count ? `${list.csm_user_input_data_working_count} 명` : ''}
                                        </td>
                                        <td
                                            className={classnamesAUTO}
                                            style={list.csm_calendar_publish ? {} : { backgroundColor: 'white' }}
                                        >
                                            <div className="Insert_dates">
                                                {classnamesAUTO === 'basic_yellow' ? (
                                                    <div>
                                                        <button onClick={e => handleClicks(e, list, '발행')}>확인</button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className="ThirdTest_Delete_for_div_box"
                                                        onDoubleClick={e => handleClicksDeleteData(e, list, '발행')}
                                                    >
                                                        <div>{list.csm_calendar_publish}</div>
                                                        <div>{list.csm_calendar_publish ? list.csm_calendar_publish_id : ''}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className={classnamesAUTO} style={list.csm_calendar_apply ? {} : { backgroundColor: 'white' }}>
                                            {classnamesAUTO === 'basic_lime' ? (
                                                <div>
                                                    <button onClick={e => handleClicks(e, list, '신청')}>확인</button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="ThirdTest_Delete_for_div_box"
                                                    onDoubleClick={e => handleClicksDeleteData(e, list, '신청')}
                                                >
                                                    <div>{list.csm_calendar_apply}</div>
                                                    <div>{list.csm_calendar_apply ? list.csm_calendar_apply_id : ''}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td
                                            className={classnamesAUTO}
                                            style={list.csm_calendar_entering ? {} : { backgroundColor: 'white' }}
                                        >
                                            {classnamesAUTO === 'basic_blue' ? (
                                                <div>
                                                    <button onClick={e => handleClicks(e, list, '입고')}>확인</button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="ThirdTest_Delete_for_div_box"
                                                    onDoubleClick={e => handleClicksDeleteData(e, list, '입고')}
                                                >
                                                    <div>{list.csm_calendar_entering}</div>
                                                    <div>{list.csm_calendar_entering ? list.csm_calendar_entering_id : ''}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td className={classnamesAUTO} style={list.csm_calendar_ce ? {} : { backgroundColor: 'white' }}>
                                            {classnamesAUTO === 'basic_purple' ? (
                                                <div>
                                                    <button onClick={e => handleClicks(e, list, 'CE')}>확인</button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="ThirdTest_Delete_for_div_box"
                                                    onDoubleClick={e => handleClicksDeleteData(e, list, 'CE')}
                                                >
                                                    <div>{list.csm_calendar_ce}</div>
                                                    <div>{list.csm_calendar_ce ? list.csm_calendar_ce_id : ''}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td
                                            className={classnamesAUTO}
                                            style={list.csm_calendar_custom_date ? {} : { backgroundColor: 'white' }}
                                        >
                                            {classnamesAUTO === 'basic_skyblue' ? (
                                                <div>
                                                    <button onClick={e => handleClicks(e, list, '고객')}>확인</button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="ThirdTest_Delete_for_div_box"
                                                    onDoubleClick={e => handleClicksDeleteData(e, list, '고객')}
                                                >
                                                    <div>{list.csm_calendar_custom_date}</div>
                                                    <div>{list.csm_calendar_custom_date ? list.csm_calendar_custom_date_id : ''}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td className={classnamesAUTO} style={list.csm_calendar_pay ? {} : { backgroundColor: 'white' }}>
                                            {classnamesAUTO === 'basic_orange' ? (
                                                Nav_AccessTokens.CSM_Master_Access === 1 ? (
                                                    <div>
                                                        <div>
                                                            <button onClick={e => handleClicks(e, list, 'PAY')}>확인</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )
                                            ) : (
                                                <div
                                                    className="ThirdTest_Delete_for_div_box"
                                                    onDoubleClick={e => handleClicksDeleteData(e, list, 'PAY')}
                                                >
                                                    <div>{list.csm_calendar_pay}</div>
                                                    <div>{list.csm_calendar_pay ? list.csm_calendar_pay_id : ''}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td className={classnamesAUTO} style={list.csm_calendar_finall ? {} : { backgroundColor: 'white' }}>
                                            {classnamesAUTO === 'basic_finish' ? (
                                                Nav_AccessTokens.CSM_Master_Access === 1 ? (
                                                    <div>
                                                        <div>
                                                            <button onClick={e => handleClicks(e, list, 'finished')}>확인</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div></div>
                                                )
                                            ) : (
                                                <div
                                                    className="ThirdTest_Delete_for_div_box"
                                                    onDoubleClick={e => handleClicksDeleteData(e, list, 'finished')}
                                                >
                                                    <div>{list.csm_calendar_finall}</div>
                                                    <div>{list.csm_calendar_finall_id}</div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={2}>ERROR 발생.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* <CSMSelectShowContent></CSMSelectShowContent> */}
            <LoaderMainPage loading={CSM_Datas.loading}></LoaderMainPage>
        </CSMNothingUserContentMainDivBox>
    );
};

export default CSMNothingUserContent;
