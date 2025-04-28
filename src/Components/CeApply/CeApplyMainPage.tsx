import React from 'react';
import HambergerMenu from '../Navigation/HambergerMenu';
import ToolMainCotainerMainPage from './ToolMainContainer/ToolMainContainerMainPage';

const CeApplyMainPage = () => {
    return (
        <div>
            <div className="App">
                <HambergerMenu titles="Tool 대여 신청" subtitles=""></HambergerMenu>
                <ToolMainCotainerMainPage></ToolMainCotainerMainPage>
            </div>
        </div>
    );
};

export default CeApplyMainPage;
