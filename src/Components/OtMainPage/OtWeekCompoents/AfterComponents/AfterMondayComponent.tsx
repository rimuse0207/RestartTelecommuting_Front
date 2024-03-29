import React, { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TimeClicksOptions, RestTimeClicksOptions } from '../SelectTimeOptionData';
import { OtMonComponentsProps } from '../OTComponentPropsType';
import moment from 'moment';
import { toast } from '../../../ToastMessage/ToastManager';

const AfterMondayComponent = ({ monDateData, setMonDateData, startDate, BusinessAcessState }: OtMonComponentsProps) => {
    //월요일 시간 변동 시, 합계 변경
    useEffect(() => {
        const OTendTimes = moment(`2022-01-01 ${monDateData.OTEndTime}`);
        const OTStartTimes = moment(`2022-01-01 ${monDateData.OTStartTime}`);
        const OTRestTimes = moment(`2022-01-01 ${monDateData.OTRestTime}`);
        const OTBasicStartTimes = moment(`2022-01-01 ${monDateData.basicStartTime}`);
        const OTBasicEndTimes = moment(`2022-01-01 ${monDateData.basicEndTime}`);

        const sumBasicData = moment.duration(OTBasicEndTimes.diff(OTBasicStartTimes)).asHours() - 1;

        let startPlusEnd = moment.duration(OTendTimes.diff(OTStartTimes)).asHours();
        const restPlusTime = moment
            .duration(OTRestTimes.diff(moment(moment(`${OTRestTimes.format('YYYY-MM-DD')} 00:00`).format('YYYY-MM-DD HH:mm'))))
            .asHours();

        const nightTime = moment
            .duration(OTendTimes.diff(moment(`${OTendTimes.format('YYYY-MM-DD')} 22:00`).format('YYYY-MM-DD HH:mm')))
            .asHours();
        let nightTimeCal = 0;
        if (nightTime > 0) {
            nightTimeCal = nightTime;
        } else if (nightTime < -15) {
            nightTimeCal = 24 + nightTime;
        }

        if (startPlusEnd < 0) {
            startPlusEnd = 24 + startPlusEnd;
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
                    OTnightSum: nightTimeCal,
                });
            }
        } else {
            if (startPlusEnd - restPlusTime < 0) {
                toast.show({
                    title: '근무시간보다 ',
                    content: '휴게시간이 더 큽니다. (휴게시간 초기화 실행)',
                    duration: 3000,
                    DataSuccess: false,
                });

                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd,
                    OTRestTime: '00:00',
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
                    OTnightSum: nightTimeCal,
                });
            } else {
                setMonDateData({
                    ...monDateData,
                    OTSumTime: startPlusEnd - restPlusTime,
                    basicSumTime: sumBasicData >= 0 ? sumBasicData : 24 + sumBasicData,
                    OTnightSum: nightTimeCal,
                });
            }
        }
    }, [
        monDateData.basicStartTime,
        monDateData.basicEndTime,
        monDateData.OTEndTime,
        monDateData.OTStartTime,
        monDateData.OTRestTime,
        monDateData.clickDate,
    ]);

    return (
        <>
            <tr>
                <td rowSpan={3} id="stat_date" width="100px">
                    {startDate.clone().format('YYYY-MM-DD')}
                    <br />
                    월요일
                </td>

                <td rowSpan={3} width="100px" style={{ textAlign: 'start', paddingLeft: '10px' }}>
                    <label htmlFor="mon_holiday_check">
                        <input
                            type="radio"
                            id="mon_holiday_check"
                            name="mon_holiday_check"
                            value="weekday"
                            readOnly
                            onChange={() => {
                                setMonDateData({ ...monDateData, holidayCheck: 'weekday' });
                            }}
                            checked={monDateData.holidayCheck === 'weekday' ? true : false}
                        ></input>
                        평일
                    </label>
                    <br />

                    <label htmlFor="mon_holiday_check">
                        <input
                            type="radio"
                            id="mon_holiday_check"
                            name="mon_holiday_check"
                            value="holiday"
                            readOnly
                            onChange={() => {
                                setMonDateData({ ...monDateData, holidayCheck: 'holiday' });
                            }}
                            checked={monDateData.holidayCheck === 'holiday' ? true : false}
                        ></input>
                        공휴일
                    </label>
                </td>
                <td rowSpan={3} width="100px">
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">시작시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={monDateData.basicStartTime}
                            label="시작시간"
                            onChange={event => setMonDateData({ ...monDateData, basicStartTime: event.target.value })}
                        >
                            {TimeClicksOptions.map(list => {
                                return (
                                    <MenuItem value={list.value} key={list.value}>
                                        {list.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </td>
                <td rowSpan={3} width="100px">
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">종료시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={monDateData.basicEndTime}
                            label="종료시간"
                            onChange={event => setMonDateData({ ...monDateData, basicEndTime: event.target.value })}
                        >
                            {TimeClicksOptions.map(list => {
                                return (
                                    <MenuItem value={list.value} key={list.value}>
                                        {list.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </td>
                <td rowSpan={3} width="100px">
                    <span className="sum_time" id="sum_time_mon">
                        {monDateData.basicSumTime}
                    </span>
                    시간
                </td>
                {BusinessAcessState ? (
                    <td rowSpan={3} width="100px">
                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                            <InputLabel id="demo-select-small">출장OR현장</InputLabel>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                label="출장OR현장"
                                value={monDateData.business_trip}
                                onChange={e =>
                                    setMonDateData({
                                        ...monDateData,
                                        business_trip: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value="없음">없음</MenuItem>
                                <MenuItem value="현장">현장</MenuItem>
                                <MenuItem value="출장">출장</MenuItem>
                            </Select>
                        </FormControl>
                    </td>
                ) : (
                    <></>
                )}

                <td rowSpan={3} width="100px">
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">시작시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={monDateData.OTStartTime}
                            label="시작시간"
                            onChange={event => setMonDateData({ ...monDateData, OTStartTime: event.target.value })}
                        >
                            {TimeClicksOptions.map(list => {
                                return (
                                    <MenuItem value={list.value} key={list.value}>
                                        {list.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </td>
                <td rowSpan={3} width="100px">
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">종료시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={monDateData.OTEndTime}
                            label="종료시간"
                            onChange={event => setMonDateData({ ...monDateData, OTEndTime: event.target.value })}
                        >
                            {TimeClicksOptions.map(list => {
                                return (
                                    <MenuItem value={list.value} key={list.value}>
                                        {list.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </td>
                <td rowSpan={3} width="100px">
                    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                        <InputLabel id="demo-select-small">휴게시간</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={monDateData.OTRestTime}
                            label="휴게시간"
                            onChange={event => setMonDateData({ ...monDateData, OTRestTime: event.target.value })}
                        >
                            {RestTimeClicksOptions.map(list => {
                                return (
                                    <MenuItem value={list.value} key={list.value}>
                                        {list.label}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </td>
                <td rowSpan={3} width="100px">
                    <span className="sum_over_time" id="sum_over_time_monOver">
                        {monDateData.OTSumTime}
                    </span>
                    시간
                </td>
                <td rowSpan={3} width="100px">
                    <span id="sum_times_mon"> {monDateData.basicSumTime + monDateData.OTSumTime}</span> 시간
                </td>

                <td className="reasontable">
                    <textarea
                        placeholder="사유1"
                        value={monDateData.OTreason1}
                        onChange={e => setMonDateData({ ...monDateData, OTreason1: e.target.value })}
                    ></textarea>
                </td>
            </tr>
            <tr>
                <td className="reasontable">
                    <textarea
                        placeholder="사유2"
                        value={monDateData.OTreason2}
                        onChange={e => setMonDateData({ ...monDateData, OTreason2: e.target.value })}
                    ></textarea>
                </td>
            </tr>
            <tr>
                <td className="reasontable">
                    <textarea
                        placeholder="사유3"
                        value={monDateData.OTreason3}
                        onChange={e => setMonDateData({ ...monDateData, OTreason3: e.target.value })}
                    ></textarea>
                </td>
            </tr>
        </>
    );
};

export default React.memo(AfterMondayComponent);
