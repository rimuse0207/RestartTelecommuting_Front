import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from './MainApp';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import { AnyAction, applyMiddleware, createStore } from 'redux';
// import persistReducer from './models';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
import store, { persistor } from './models/Store';
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
// import PlayGround from './Components/PlayGround/PlayGround.js';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}></PersistGate>
        <React.StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainApp}></Route>
                    <Route path="/meal_settlement" component={MealMainPage}></Route>
                    <Route path="/Telecommuting_workspace" component={TeleWorkingContainer}></Route>
                    <Route path="/AfterOtworkspace" component={WeekAfterOTContainer}></Route>
                    <Route path="/USbWrite" component={USBApplyMainPage}></Route>
                    <Route path="/Admin_meal_Select" component={MealMonthSelect}></Route>
                    <Route path="/ChangePassword" component={ChangePasswordPage}></Route>
                    <Route path="/TeamSelectOTWorkSpace" component={TeamSelectOTMainPage}></Route>
                    <Route path="/TeamLeaderPageMainPage" component={TeamLeaderPageMainPage}></Route>
                    <Route path="/TeamLeaderTelecommutingMainpage" component={TeamLeaderTelecommutingMainpage}></Route>
                    <Route path="/ConnectedNow" component={ConnectedMainPage}></Route>
                    <Route path="/MonthTelecommuting" component={MonthTeleCommuting}></Route>
                    <Route path="/VideoFocusOn/:key1/:key2" component={NewWindowMainPage}></Route>
                    <Route path="/CECalendar" component={CeCalendarMainPage}></Route>
                    {/* <Route path="/PlayGround" component={PlayGround}></Route> */}
                    <Route path="*" component={ErrorPage} />
                    <Redirect path="*" to="/ErrorPage" />
                </Switch>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
