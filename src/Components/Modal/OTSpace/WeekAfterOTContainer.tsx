import React from 'react';
import HambergerMenu from '../..//Navigation/HambergerMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../../models/index';
import SliderPage from '../../SliderPage';
import { Redirect } from 'react-router';
import WeekAfterOTWorkSpace from './WeekAfterOTWorkSpace';
const WeekAfterOTContainer = () => {
    const socket = useSelector((state: RootState) => state.Socket.socket);
    const loginChecked = useSelector((state: RootState) => state.PersonalInfo.loginCheck);
    return (
        <div>
            {loginChecked ? (
                <div>
                    <HambergerMenu titles="OT신청" subtitles=""></HambergerMenu>
                    <div>
                        <WeekAfterOTWorkSpace></WeekAfterOTWorkSpace>
                    </div>
                    <SliderPage width={window.innerWidth} socket={socket}></SliderPage>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default WeekAfterOTContainer;
