import React, { useEffect } from 'react';
import MainApp from './MainApp';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import USBApplyMainPage from './Components/USBApply/USBApplyMainPage';
import MealMainPage from './Components/MealSettlement/MealMainPage';
import MealMonthSelect from './Components/AdminAcees/MealMonth/MealMonthSelect';
import ChangePasswordPage from './Components/Login/ChangePasswordPage';
import TeleWorkingContainer from './Components/Modal/TelecommutingSpace/TeleWorkignContainer';
import WeekAfterOTContainer from './Components/Modal/OTSpace/WeekAfterOTContainer';
import TeamSelectOTMainPage from './Components/Modal/OTSpace/TeamSelectMainPage';
import TeamLeaderPageMainPage from './Components/Modal/OTSpace/TeamLeaderPage/TeamLeaderPageMainPage';
import TeamLeaderTelecommutingMainpage from './Components/Telecommuting/TeamLeaderTelecommutingMainpage';
import ConnectedMainPage from './Components/ConnectedNow/ConnectedMainPage';
import NewWindowMainPage from './Components/NewWIndow/NewWindowMainPage';
import MonthTeleCommuting from './Components/MonthTeleCommuting/MonthTeleCommuting';
import CeCalendarMainPage from './Components/CECalendar/CeCalendarMainPage';
import CovidTextShowMainPage from './Components/COVID/CovidTextShowMainPage';
import NewAdminInsert from './Components/NewAdmin/NewAdminInsert';
import AdminDashBoardMainPage from './Components/AdminAcees/InsertLoginPage/AdminDashBoardMainPage';
import PlayGround from './Components/PlayGround/PlayGround.js';
import OtContainerMainPage from './Components/OtMainPage/OtContainerMainPage';
import OtPrinterMainPage from './Components/OtMainPage/OtPrinter/OtPrinterMainPage';
import OtPrinterButton from './Components/OtMainPage/OtPrinter/OtPrinterButton';
import TeamLeaderMonthOtPrinter from './Components/OtMainPage/OtPrinter/TeamLeaderMonthOtPrinter';
import MealPrinterMainPage from './Components/OtMainPage/MealPrinter/MealPrinterMainPage';
import BusinessExcelUplodaerMainPage from './Components/BusniessExcelUploader/BusinessExcelUploaderMainPage';
import BusinessTripShowMainPage from './Components/BusinessShowMainPage/BusinessTripShowMainPage';
import BusinessTripPrinterContent from './Components/BusinessShowMainPage/BusinessTripPrinterContent';
import TeamLeaderBusinessTripMainPage from './Components/BusinessShowMainPage/TeamLeaderBusinessTrip/TeamLeaderBusinessTripMainPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './models';
import SignInForm from './Components/Login/SignInForm';
import styled from 'styled-components';
import socketio from 'socket.io-client';
import { getSocket } from './models/Socket';
import { getChatting_members } from './models/ChattingMeber';
import { DecryptKey } from './config';
import AccessInfoMainPage from './Components/AdminAcees/AdminAccess/AccessInfoMainPage';

const RouterPageMainDivBox = styled.div`
    @media print {
        .NaviNeed {
            display: none;
        }
    }
`;

const RouterPage = () => {
    const dispatch = useDispatch();
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
    useEffect(() => {
        if (loginChecked) socketconnect();
    }, [loginChecked]);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);

    const socketconnect = async () => {
        const soscketData = await socketio(`${process.env.REACT_APP_API_URL}`);
        await dispatch(getSocket(soscketData));
        soscketData.emit('hi', {
            name: DecryptKey(InfomationState.name),
            id: DecryptKey(InfomationState.id),
        });
        soscketData.on('users_come_in', (data: { message: [] }) => {
            dispatch(getChatting_members(data.message));
        });
        soscketData.on('recieveCall', (data: { message: { senderId: string; senderName: string } }) => {
            handleVisibilityChange(data);
        });
    };
    const handleVisibilityChange = (data: { message: { senderId: string; senderName: string } }) => {
        window.open(`http://192.168.2.241:5555/VideoFocusOn/${data.message.senderId}/${data.message.senderName}`, 'width=800,height=800');
    };

    return (
        <RouterPageMainDivBox>
            <BrowserRouter>
                <Switch>
                    {loginChecked ? (
                        <>
                            <div className="NaviNeed">
                                {/* ?????? ?????? */}
                                <div>
                                    {/* ?????????????????? */}
                                    <Route exact path="/" component={MainApp}></Route>
                                    {/* ?????? ?????? ???????????? */}
                                    <Route path="/TeamLeaderTelecommutingMainpage" component={TeamLeaderTelecommutingMainpage}></Route>
                                    {/* ???????????? */}
                                    <Route path="/Telecommuting_workspace" component={TeleWorkingContainer}></Route>
                                    {/* ?????? ?????? ?????? */}
                                    <Route path="/MonthTelecommuting" component={MonthTeleCommuting}></Route>
                                    {/* USB/CD ?????? ?????? */}
                                    <Route path="/USbWrite" component={USBApplyMainPage}></Route>
                                </div>

                                {/* OT?????? */}
                                <div>
                                    {/* OT ?????? */}
                                    <Route path="/AfterOTTest" component={OtContainerMainPage}></Route>
                                    {/* <Route path="/AfterOtworkspace" component={WeekAfterOTContainer}></Route> */}

                                    {/* ?????? OT ?????? */}
                                    <Route path="/TeamLeaderPageMainPage" component={TeamLeaderPageMainPage}></Route>
                                    {/* ?????? ???????????? ?????? */}
                                    <Route path="/BusinessShow" component={BusinessTripShowMainPage}></Route>
                                    {/* ?????? ?????? ?????? ?????? */}
                                    <Route path="/TeamLeaderBusinessTripMainPage" component={TeamLeaderBusinessTripMainPage}></Route>
                                    {/* ?????? ??????????????? */}
                                    <Route path="/TeamSelectOTWorkSpace" component={TeamSelectOTMainPage}></Route>
                                    {/* ERP ?????? ????????? */}
                                    <Route path="/BusinessExcelUploader" component={BusinessExcelUplodaerMainPage}></Route>
                                </div>

                                {/* ???????????? */}
                                <div>
                                    {/* ?????? ?????? ?????? */}
                                    <Route path="/meal_settlement" component={MealMainPage}></Route>
                                    {/* ?????? ?????? ?????? ?????? */}
                                    <Route path="/Admin_meal_Select" component={MealMonthSelect}></Route>
                                </div>

                                {/* ???????????? */}
                                <div>
                                    {/* ????????? ?????? */}
                                    <Route path="/ConnectedNow" component={ConnectedMainPage}></Route>
                                    {/* CSM */}
                                    <Route path="/CECalendar/:pagenumber" component={CeCalendarMainPage}></Route>
                                    {/* ???????????? ?????? */}
                                    <Route path="/ChangePassword" component={ChangePasswordPage}></Route>
                                    {/* Exicon, YIKC ????????? ?????? */}
                                    <Route path="/NewDataInsert" component={NewAdminInsert}></Route>
                                    {/* ?????????19 */}
                                    <Route path="/CovidTextShow" component={CovidTextShowMainPage}></Route>
                                </div>

                                <Route path="/PlayGround" component={PlayGround}></Route>

                                <Route path="/PrinterButton" component={OtPrinterButton}></Route>

                                {/* <Route exact path="*" component={ErrorPage} /> */}
                            </div>
                            <div className="NaviUnNeed">
                                <Route path="/VideoFocusOn/:key1/:key2" component={NewWindowMainPage}></Route>
                                <Route path="/NewAdminInsertData/:selected" component={AdminDashBoardMainPage}></Route>
                                <Route path="/PrinterTest/:type/:date/:id" component={OtPrinterMainPage}></Route>
                                <Route path="/TeamLeaderMonthOtPrint/:year/:month/:team" component={TeamLeaderMonthOtPrinter}></Route>
                                <Route path="/PrinterMeal/:date/:id/:name/:team" component={MealPrinterMainPage}></Route>
                                <Route
                                    path="/BusinessShowMonthPrinter/:id/:name/:team/:year/:month"
                                    component={BusinessTripPrinterContent}
                                ></Route>
                                <Route path="/Amdin/IT_Admin_Access" component={AccessInfoMainPage}></Route>
                            </div>

                            {/* <Redirect path="*" to="/ErrorPage" /> */}
                        </>
                    ) : (
                        <>
                            <Route path="*" component={SignInForm}></Route>
                        </>
                    )}
                </Switch>
            </BrowserRouter>
        </RouterPageMainDivBox>
    );
};

export default RouterPage;
