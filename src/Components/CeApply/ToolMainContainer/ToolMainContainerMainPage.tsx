import React from 'react';
import UsedToolListMainPage from './UsedToolList/UsedToolListMainPage';
import styled from 'styled-components';

const UsedToolListMainPageMainContainerStyles = styled.div`
    padding: 20px;
`;

const ToolMainCotainerMainPage = () => {
    return (
        <UsedToolListMainPageMainContainerStyles>
            <div>
                <strong>대여중인 Tool</strong>
                <UsedToolListMainPage></UsedToolListMainPage>
            </div>
        </UsedToolListMainPageMainContainerStyles>
    );
};

export default ToolMainCotainerMainPage;
