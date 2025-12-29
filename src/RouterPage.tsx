import React, { useEffect } from 'react';
import MainApp from './MainApp';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import USBApplyMainPage from './Components/USBApply/USBApplyMainPage';
import MealMainPage from './Components/MealSettlement/MealMainPage';
import MealMonthSelect from './Components/AdminAcees/MealMonth/MealMonthSelect';
import ChangePasswordPage from './Components/Login/ChangePasswordPage';
import TeleWorkingContainer from './Components/Modal/TelecommutingSpace/TeleWorkignContainer';
import WeekAfterOTContainer from './Components/Modal/OTSpace/WeekAfterOTContainer';
import TeamSelectOTMainPage from './Components/Modal/OTSpace/TeamSelectMainPage';
import TeamLeaderPageMainPage from './Components/Modal/OTSpace/TeamLeaderPage/TeamLeaderPageMainPage';
import TeamLeaderTelecommutingMainpage from './Components/Telecommuting/TeamLeaderTelecommutingMainpage';
import NewWindowMainPage from './Components/NewWIndow/NewWindowMainPage';
import MonthTeleCommuting from './Components/MonthTeleCommuting/MonthTeleCommuting';
import NewAdminInsert from './Components/NewAdmin/NewAdminInsert';
import AdminDashBoardMainPage from './Components/AdminAcees/InsertLoginPage/AdminDashBoardMainPage';
import OtContainerMainPage from './Components/OtMainPage/OtContainerMainPage';
import OtPrinterMainPage from './Components/OtMainPage/OtPrinter/OtPrinterMainPage';
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
import AccessInfoMainPage from './Components/AdminAcees/AdminAccess/AccessInfoMainPage';
import OtPersonPrinter from './Components/Modal/OTSpace/PersonPrinter/OtPersonPrinter';
import MonthOtPersonShow from './Components/Modal/OTSpace/PersonPrinter/MonthOtPersonShow';
import AdminAccessCheckingMainPage from './Components/AdminAcees/AdminAccessChecking/AdminAccessCheckingMainPage';
import CeApplyMainPage from './Components/CeApply/CeApplyMainPage';
import OutOnBusinessMainPage from './Components/OutOnBusiness/OutOnBusinessMainPage';

const RouterPageMainDivBox = styled.div`
    @media print {
        .NaviNeed {
            display: none;
        }
    }
`;

const RouterPage = () => {
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    return (
        <RouterPageMainDivBox>
            <BrowserRouter>
                <Switch>
                    {loginChecked ? (
                        <>
                            <div className="NaviNeed">
                                {/* 근무 메뉴 */}
                                <div>
                                    {/* 종합업무현황 */}
                                    <Route exact path="/" component={MainApp}></Route>
                                    {/* 팀원 종합 업무현황 */}
                                    <Route path="/TeamLeaderTelecommutingMainpage" component={TeamLeaderTelecommutingMainpage}></Route>
                                    {/* 재택근무 */}
                                    <Route path="/Telecommuting_workspace" component={TeleWorkingContainer}></Route>
                                    {/* 월별 재택 조회 */}
                                    <Route path="/MonthTelecommuting" component={MonthTeleCommuting}></Route>
                                    {/* USB/CD 사전 신청 */}
                                    <Route path="/USbWrite" component={USBApplyMainPage}></Route>
                                </div>

                                {/* OT메뉴 */}
                                <div>
                                    {/* OT 신청 */}
                                    <Route path="/AfterOTTest" component={OtContainerMainPage}></Route>
                                    <Route path="/MonthAfterOTShow" component={MonthOtPersonShow}></Route>
                                    {/* <Route path="/AfterOtworkspace" component={WeekAfterOTContainer}></Route> */}

                                    {/* 팀원 OT 승인 */}
                                    <Route path="/TeamLeaderPageMainPage" component={TeamLeaderPageMainPage}></Route>
                                    {/* 현장 수당정산 직원 */}
                                    <Route path="/BusinessShow" component={BusinessTripShowMainPage}></Route>
                                    {/* 현장 수당 정산 팀장 */}
                                    <Route path="/TeamLeaderBusinessTripMainPage" component={TeamLeaderBusinessTripMainPage}></Route>
                                    {/* 근무 실시보고서 */}
                                    <Route path="/TeamSelectOTWorkSpace" component={TeamSelectOTMainPage}></Route>
                                    {/* ERP 파일 업로드 */}
                                    <Route path="/BusinessExcelUploader" component={BusinessExcelUplodaerMainPage}></Route>
                                </div>

                                {/* 식대메뉴 */}
                                <div>
                                    {/* 식대 정산 신청 */}
                                    <Route path="/meal_settlement" component={MealMainPage}></Route>
                                    {/* 식대 정산 월별 조회 */}
                                    <Route path="/Admin_meal_Select" component={MealMonthSelect}></Route>
                                </div>

                                {/* CE지원 메뉴 */}
                                {/* <div>
                                    <Route exact path="/Tool_Apply" component={CeApplyMainPage}></Route>
                                </div> */}

                                {/* 기타메뉴 */}
                                <div>
                                    {/* 상대방 호출 */}
                                    {/* <Route path="/ConnectedNow" component={ConnectedMainPage}></Route> */}
                                    {/* CSM */}
                                    {/* <Route path="/CECalendar/:pagenumber/:type" component={CeCalendarMainPage}></Route>
                                    <Route path="/CECalendar/Renewal" component={ReNewalCSMMainPage}></Route>
                                    <Route path="/RenewalCSM" component={CeCalendarSearchIcons}></Route> */}
                                    {/* 비밀번호 변경 */}
                                    <Route path="/ChangePassword" component={ChangePasswordPage}></Route>
                                    {/* Exicon, YIKC 사용자 등록 */}
                                    <Route path="/NewDataInsert" component={NewAdminInsert}></Route>
                                    {/* 코로나19 */}
                                    {/* <Route path="/CovidTextShow" component={CovidTextShowMainPage}></Route> */}
                                    {/* 해외출장 신청양식 */}
                                    <Route path="/Out_On_Business" component={OutOnBusinessMainPage}></Route>
                                </div>

                                {/* <Route path="/PlayGround" component={PlayGround}></Route> */}

                                {/* <Route path="/PrinterButton" component={OtPrinterButton}></Route> */}

                                {/* <Route exact path="*" component={ErrorPage} /> */}
                            </div>
                            <div className="NaviUnNeed">
                                <Route path="/VideoFocusOn/:key1/:key2" component={NewWindowMainPage}></Route>
                                <Route path="/AdminAccessCheckingMainPage" component={AdminAccessCheckingMainPage}></Route>
                                <Route path="/NewAdminInsertData/:selected" component={AdminDashBoardMainPage}></Route>
                                <Route path="/PrinterTest/:type/:date/:id" component={OtPrinterMainPage}></Route>
                                <Route path="/TeamLeaderMonthOtPrint/:year/:month/:team" component={TeamLeaderMonthOtPrinter}></Route>
                                <Route path="/PrinterMeal/:date/:id/:name/:team" component={MealPrinterMainPage}></Route>
                                <Route path="/OtPersonPrinter/:name/:dateYear/:dateMonth" component={OtPersonPrinter}></Route>
                                <Route
                                    path="/BusinessShowMonthPrinter/:id/:name/:team/:year/:month"
                                    component={BusinessTripPrinterContent}
                                ></Route>

                                <Route path="/Amdin/IT_Admin_Access" component={AccessInfoMainPage}></Route>
                            </div>
                            {/* <Route component={ErrorPage}></Route> */}
                            {/* <Redirect path="*" to="/ErrorPage" /> */}
                            <Route path="/Login_Page" component={SignInForm}></Route>
                        </>
                    ) : (
                        <>
                            {/* <Route exact path="/NewDataInsert" component={NewAdminInsert}></Route> */}
                            <Route path="*" component={SignInForm}></Route>
                        </>
                    )}
                </Switch>
            </BrowserRouter>
        </RouterPageMainDivBox>
    );
};

export default RouterPage;
