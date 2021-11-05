import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../models';
import HambergerMenu from '../Navigation/HambergerMenu';
import SliderPage from '../SliderPage';
import SignInForm from '../Login/SignInForm';
import ConnectedPeopleShow from './ConnectedPeopleShow';

const ConnectedMainPage = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);

    const [loginCheck, setLoginCheck] = useState(false);
    return (
        <div>
            {loginChecked ? (
                <div style={{ height: '100%' }}>
                    <HambergerMenu titles="근무 현황" subtitles="일별 신청현황 조회"></HambergerMenu>
                    <div style={{ position: 'relative' }}>
                        <ConnectedPeopleShow socket={socket}></ConnectedPeopleShow>
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                <SignInForm setLoginCheck={(data: boolean) => setLoginCheck(data)}></SignInForm>
            )}
        </div>
    );
};

export default ConnectedMainPage;
