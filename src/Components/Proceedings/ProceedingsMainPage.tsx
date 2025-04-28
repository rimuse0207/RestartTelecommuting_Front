import React, { useState } from 'react';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import SignInForm from '../Login/SignInForm';
import { RootState } from '../../models';
import { useSelector } from 'react-redux';
import ProceedingsContentPage from './ProceedingsContentPage.js';

const ProceedingsMainPage = () => {
    // const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div>
            <div className="App">
                {loginChecked ? (
                    <div style={{ height: '100%' }}>
                        <HambergerMenu titles="회의록" subtitles="회의록 작성 및 녹음"></HambergerMenu>
                        <div>
                            <ProceedingsContentPage></ProceedingsContentPage>
                        </div>
                        {/* <SliderPage width={window.innerWidth} socket={socket}></SliderPage> */}
                    </div>
                ) : (
                    <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
                )}
            </div>
        </div>
    );
};

export default ProceedingsMainPage;
