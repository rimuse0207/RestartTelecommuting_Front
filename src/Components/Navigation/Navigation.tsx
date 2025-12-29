import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPersionalLOGOUT } from '../../models/PersonalInfo';
import { RootState } from '../../models/index';
import { DecryptKey } from '../../config';
import { useHistory } from 'react-router';
import { getSessionLOGOUT } from '../../models/Socket';
import PasswordChangeModalMainPage from '../Modal/PasswordChangeModal/PasswordChangeModalMainPage';
import { getAccessDataError } from '../../models/Access_Redux/Access_Redux';
import Modal from 'react-modal';
import { NavResetGetting } from '../../models/Nav_Access_Redux/Nav_Access_Redux';
type Navigation = {
    menuStatus: string;
    setHambergerOpen: any;
};

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '80%',
    },
};
Modal.setAppElement('#ModalSet');

const Navigation = ({ menuStatus, setHambergerOpen }: Navigation) => {
    const history = useHistory();
    // const socket = useSelector((state: RootState) => state.Socket.socket);
    const InfomationState = useSelector((state: RootState) => state.PersonalInfo.infomation);
    const BusinessAdminAcessState = useSelector((state: RootState) => state.Access_Control.BusinessAdminAccess);
    const BusinessAccess = useSelector((state: RootState) => state.Access_Control.BusinessAccess);
    const NavAccessTokenState = useSelector((state: RootState) => state.Nav_AccessTokens);
    const [TeleMenuClicks, setTeleMenuClicks] = useState(true);
    const [OTMenuClicks, setOTMenuClicks] = useState(true);
    const [FoodMenuClicks, setFoodMenuClicks] = useState(true);
    const [CeSupplyClicks, setCeSupplyClicks] = useState(true);
    const [ETCMenuClicks, setETCMenuClicks] = useState(true);
    const [onClicked, setOnClickedSet] = useState(false);
    const handleLogout = () => {
        sessionStorage.clear();
        dispatch(getAccessDataError());
        dispatch(getSessionLOGOUT());
        dispatch(getPersionalLOGOUT());
        dispatch(NavResetGetting());
        history.push('/');
    };
    const dispatch = useDispatch();

    const modalClose = () => {
        setOnClickedSet(false);
    };
    return (
        <div className={menuStatus} id="menu">
            {DecryptKey(InfomationState.id).split('@')[1] === 'dhk.co.kr' ? (
                <>
                    <div>
                        <h5 onClick={() => setTeleMenuClicks(!TeleMenuClicks)} style={{ background: '#efefef', color: 'black' }}>
                            근무메뉴
                            <img
                                src={'/pngegg.png'}
                                className={`nav_handleClicks_arrow ${TeleMenuClicks ? 'nav_hadleClicks_flases' : ''}`}
                            ></img>
                        </h5>
                        {TeleMenuClicks ? (
                            <ul className="MenuDisblock">
                                <div className="slideDown">
                                    <Link to="/">
                                        <li>종합 업무 현황</li>
                                    </Link>
                                    {NavAccessTokenState.TeleLeaderAccess === 1 ||
                                    NavAccessTokenState.AfterOTLeaderAccess === 1 ||
                                    NavAccessTokenState.FoodLeaderAccess === 1 ? (
                                        <Link to="/TeamLeaderTelecommutingMainpage">
                                            <li>팀원 종합 업무 현황</li>
                                        </Link>
                                    ) : (
                                        <></>
                                    )}

                                    <Link to="/Telecommuting_workspace">
                                        <li>재택근무</li>
                                    </Link>
                                    {NavAccessTokenState.TeleLeaderAccess === 1 ? (
                                        <Link to="/MonthTelecommuting">
                                            <li>월별 재택 조회</li>
                                        </Link>
                                    ) : (
                                        <></>
                                    )}

                                    <Link to="#" onClick={() => window.open('http://10.1.181.237/DHK_ExMediaWeb/')}>
                                        <li>
                                            외부미디어 <br />
                                            사전/사후 신청
                                        </li>
                                    </Link>
                                    {NavAccessTokenState.AfterOTLeaderAccess === 1 ? (
                                        <Link to="#" onClick={() => window.open('http://10.1.181.237/DHK_ExMediaWeb_Approve/')}>
                                            <li>
                                                외부미디어 <br />
                                                사전/사후 신청 승인
                                            </li>
                                        </Link>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </ul>
                        ) : (
                            ''
                        )}
                    </div>
                    <div>
                        <h5 onClick={() => setOTMenuClicks(!OTMenuClicks)} style={{ background: '#efefef', color: 'black' }}>
                            OT메뉴
                            <img
                                src={'/pngegg.png'}
                                className={`nav_handleClicks_arrow ${OTMenuClicks ? 'nav_hadleClicks_flases' : ''}`}
                            ></img>
                        </h5>
                        {OTMenuClicks ? (
                            <ul className="MenuDisblock">
                                <div className="slideDown">
                                    <Link to="/AfterOTTest">
                                        <li>OT 신청</li>
                                    </Link>
                                    {NavAccessTokenState.AfterOTLeaderAccess === 1 || NavAccessTokenState.BeforeOTLeaderAccess === 1 ? (
                                        <>
                                            <Link to="/TeamLeaderPageMainPage">
                                                <li>팀원 OT 승인</li>
                                            </Link>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {BusinessAccess ? (
                                        <>
                                            {BusinessAdminAcessState ? (
                                                <Link to="/TeamLeaderBusinessTripMainPage">
                                                    <li>현장 수당 정산</li>
                                                </Link>
                                            ) : (
                                                <Link to="/BusinessShow">
                                                    <li>현장 수당 정산</li>
                                                </Link>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {BusinessAdminAcessState ? (
                                                <Link to="/TeamLeaderBusinessTripMainPage">
                                                    <li>현장 수당 정산</li>
                                                </Link>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    )}

                                    {NavAccessTokenState.AfterOTLeaderAccess === 1 || NavAccessTokenState.BeforeOTLeaderAccess === 1 ? (
                                        <>
                                            <Link to="/TeamSelectOTWorkSpace">
                                                <li>근무 실시보고서</li>
                                            </Link>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    {BusinessAdminAcessState ? (
                                        <>
                                            {NavAccessTokenState.BusinessAdminAccess === 1 ? (
                                                <Link to="/BusinessExcelUploader">
                                                    <li>현장 수당 정산 출력 ON/OFF</li>
                                                </Link>
                                            ) : (
                                                <></>
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </ul>
                        ) : (
                            ''
                        )}
                    </div>
                    <div>
                        <h5 onClick={() => setFoodMenuClicks(!FoodMenuClicks)} style={{ background: '#efefef', color: 'black' }}>
                            식대메뉴{' '}
                            <img
                                src={'/pngegg.png'}
                                className={`nav_handleClicks_arrow ${FoodMenuClicks ? 'nav_hadleClicks_flases' : ''}`}
                            ></img>
                        </h5>
                        {FoodMenuClicks ? (
                            <ul className="MenuDisblock">
                                <div className="slideDown">
                                    <Link to="/meal_settlement">
                                        <li>식대 정산 신청</li>
                                    </Link>
                                    {NavAccessTokenState.FoodLeaderAccess === 1 ? (
                                        <Link to="/Admin_meal_Select">
                                            <li>식대 정산 월별 조회</li>
                                        </Link>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </ul>
                        ) : (
                            ''
                        )}
                    </div>
                    <div>
                        <h5 onClick={() => setCeSupplyClicks(!CeSupplyClicks)} style={{ background: '#efefef', color: 'black' }}>
                            CE지원메뉴
                            <img
                                src={'/pngegg.png'}
                                className={`nav_handleClicks_arrow ${CeSupplyClicks ? 'nav_hadleClicks_flases' : ''}`}
                            ></img>
                        </h5>
                        <ul>
                            {CeSupplyClicks ? (
                                <div className="slideDown">
                                    <Link to="#" onClick={() => window.open('http://192.168.2.241:5551')}>
                                        <li>CSM</li>
                                    </Link>
                                    <Link to="/Tool_Apply">
                                        <li>Tool 대여 신청</li>
                                    </Link>
                                </div>
                            ) : (
                                <></>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h5 onClick={() => setETCMenuClicks(!ETCMenuClicks)} style={{ background: '#efefef', color: 'black' }}>
                            기타메뉴
                            <img
                                src={'/pngegg.png'}
                                className={`nav_handleClicks_arrow ${ETCMenuClicks ? 'nav_hadleClicks_flases' : ''}`}
                            ></img>
                        </h5>
                        <ul>
                            {ETCMenuClicks ? (
                                <div className="slideDown">
                                    {/* <Link to="/ConnectedNow">
                                        <li>상대방 호출</li>
                                    </Link> */}
                                    <Link to="#" onClick={() => window.open('https://room.dhksolution.com')}>
                                        <li>회의실 및 법인 예약</li>
                                    </Link>

                                    <Link to="#" onClick={() => window.open('http://192.168.0.145:8087')}>
                                        <li>ERP</li>
                                    </Link>
                                    <Link to="#" onClick={() => window.open('https://room.dhksolution.com/PartyPost')}>
                                        <li>당직근무보고</li>
                                    </Link>

                                    <Link to="/Out_On_Business">
                                        <li>해외출장 신청 양식</li>
                                    </Link>
                                    <Link to="#" onClick={() => window.open('https://room.dhksolution.com/Document_Education')}>
                                        <li>DHKS 회계 전표 작성 안내 동영상</li>
                                    </Link>

                                    {/* <Link
                                        to="#"
                                        onClick={() =>
                                            window.open(`http://192.168.2.241:4555/${window.sessionStorage.getItem('DHKS_TOKEN')}`)
                                        }
                                    >
                                        <li>CE 교육 자료</li>
                                    </Link> */}
                                    {NavAccessTokenState.PersonAdminAccess === 1 ? (
                                        <Link to="/AdminAccessCheckingMainPage">
                                            <li>사용자 권한부여</li>
                                        </Link>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}

                            <Link
                                to="#"
                                onClick={e => {
                                    setHambergerOpen(e);
                                    setOnClickedSet(true);
                                }}
                            >
                                <li>비밀번호 변경</li>
                            </Link>
                            <Link to="/">
                                <li onClick={handleLogout} style={{ fontWeight: 'bolder', color: '#052272' }}>
                                    - 로그아웃
                                </li>
                            </Link>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <div>
                        <h5 onClick={() => setTeleMenuClicks(!TeleMenuClicks)}>
                            근무메뉴
                            <img
                                src={'/pngegg.png'}
                                className={`nav_handleClicks_arrow ${TeleMenuClicks ? 'nav_hadleClicks_flases' : ''}`}
                            ></img>
                        </h5>
                        {TeleMenuClicks ? (
                            <ul className="MenuDisblock">
                                <div className="slideDown">
                                    <Link to="/">
                                        <li>종합 업무 현황</li>
                                    </Link>
                                    {NavAccessTokenState.Nav_TeamLeaderCalendarAccess === 1 ? (
                                        <Link to="/TeamLeaderTelecommutingMainpage">
                                            <li>팀원 종합 업무 현황</li>
                                        </Link>
                                    ) : (
                                        <></>
                                    )}
                                    <Link to="/Telecommuting_workspace">
                                        <li>재택근무</li>
                                    </Link>
                                </div>
                            </ul>
                        ) : (
                            ''
                        )}
                    </div>
                    <div>
                        <h5 onClick={() => setETCMenuClicks(!ETCMenuClicks)}>
                            기타메뉴
                            <img
                                src={'/pngegg.png'}
                                className={`nav_handleClicks_arrow ${ETCMenuClicks ? 'nav_hadleClicks_flases' : ''}`}
                            ></img>
                        </h5>
                        <ul>
                            {ETCMenuClicks ? (
                                <div className="slideDown">
                                    <Link to="/ConnectedNow">
                                        <li>상대방 호출</li>
                                    </Link>
                                    {/* <Link to="#" onClick={() => window.open('http://125.132.12.163:3000')}>
                                        <li>시설이용</li>
                                    </Link> */}
                                    <Link to="#" onClick={() => window.open('https://room.dhksolution.com/PartyPost')}>
                                        <li>당직근무보고</li>
                                    </Link>
                                    {NavAccessTokenState.Nav_TeamLeaderCalendarAccess === 1 && InfomationState.company === 'YIKC' ? (
                                        <Link to="#" onClick={() => window.open('/NewAdminInsertData/LoginInfo')}>
                                            <li>임직원 추가 및 조회</li>
                                        </Link>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}

                            <Link to="/">
                                <li onClick={handleLogout} style={{ fontWeight: 'bolder', color: '#052272' }}>
                                    - 로그아웃
                                </li>
                            </Link>
                        </ul>
                    </div>
                </>
            )}
            <div>
                <Modal isOpen={onClicked} style={customStyles} onRequestClose={modalClose}>
                    <PasswordChangeModalMainPage
                        modalClose={() => modalClose()}
                        ids={DecryptKey(InfomationState.id)}
                    ></PasswordChangeModalMainPage>
                </Modal>
            </div>
        </div>
    );
};

export default Navigation;
