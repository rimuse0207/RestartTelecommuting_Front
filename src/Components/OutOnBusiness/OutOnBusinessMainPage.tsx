import React, { useState } from 'react';
import HambergerMenu from '../Navigation/HambergerMenu';
import styled from 'styled-components';
import axios from 'axios';

const OutOnBusinessMainPageMainDivBox = styled.div`
    width: 90%;
    margin: 0 auto;
    min-height: calc(100vh - 75px);
    .All_Container {
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 75px);
        display: flex;
        flex-flow: wrap;
        .Left_Container {
            width: 65%;
            border-right: 1px solid lightgray;
        }
        .Right_Container {
            width: 35%;
            ul {
                display: flex;
                flex-flow: wrap;
                justify-content: space-around;
            }
            .Main_Container {
                margin-top: 20px;
                border: 1px solid lightgray;
                width: 220px;
                border-top-right-radius: 5px;
                border-top-left-radius: 5px;
                &:hover {
                    cursor: pointer;
                    opacity: 0.8;
                }
                .Image_Container {
                    width: 220px;
                    img {
                        width: 100%;
                    }
                }
                .Naming_Container {
                    border-top: 1px solid lightgray;
                    height: 50px;
                    font-size: 1.15em;
                    text-align: center;
                    line-height: 50px;
                    font-weight: bolder;
                }
            }
        }
    }
`;

type PaperListsTypes = {
    defaultImage: string;
    name: string;
    FileSrc: string;
    fileType: string;
};

const OutOnBusinessMainPage = () => {
    const [PaperLists, setPaperLists] = useState<PaperListsTypes[]>([
        // { defaultImage: '/PDF.png', name: '해외출장 매뉴얼', fileType: '.pdf', FileSrc: `http://192.168.2.241:3001/overseas/manual.pdf` },
        {
            defaultImage: '/Excel.png',
            name: '해외출장 출장품의서 양식',
            fileType: '.xlsx',
            FileSrc: `http://192.168.2.241:3001/overseas/poom.xlsx`,
        },
        { defaultImage: '/Word.png', name: '교육출장 서약서', fileType: '.docx', FileSrc: `http://192.168.2.241:3001/overseas/seo.docx` },
        { defaultImage: '/PDF.png', name: '출장여비 지급기준표', fileType: '.pdf', FileSrc: `http://192.168.2.241:3001/overseas/pyo.pdf` },
        { defaultImage: '/Word.png', name: '업무출장 서약서', fileType: '.doc', FileSrc: `http://192.168.2.241:3001/overseas/chulseo.doc` },
    ]);

    const ClickDownloadFiles = async (Select_Data: PaperListsTypes) => {
        try {
            const Getting_File_Download_Axios = await axios.get(Select_Data.FileSrc, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([Getting_File_Download_Axios.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = Select_Data.name + `${Select_Data.fileType}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.log(error);
            alert('파일 다운로드 실패');
        }
    };

    return (
        <div>
            <HambergerMenu titles="해외출장 신청 양식" subtitles="해외출장 신청 양식"></HambergerMenu>
            <OutOnBusinessMainPageMainDivBox>
                <div className="All_Container">
                    <div className="Left_Container">
                        <h2>출장관련 매뉴얼</h2>
                        <div style={{ fontWeight: 'bolder', padding: '10px' }}>
                            <h4>경영지원팀 출장업무 담당자</h4>
                            <div>
                                비자/항공권 및 기타 : <strong>김도일 프로 ( dikim@dhk.co.kr )</strong>
                            </div>
                            <div>
                                사전 출장여비 지급 : <strong>김현진 프로 ( hjkim1@dhk.co.kr )</strong>
                            </div>
                            <div>
                                출장 비용 정산 : <strong>이정미 프로 ( jmlee@dhk.co.kr )</strong>
                            </div>
                        </div>
                        <div style={{ margin: '20px 0px', lineHeight: '30px', fontSize: '1em' }}>
                            <p>1. 품의서, 서약서 작성</p>
                            <p>
                                <span>- 해외출장 업무신청 Page 內 해외출장신청서, 출장서약서 양식 →&nbsp;</span>
                                <span>Download</span>
                            </p>
                            <p>- 내용 작성 후 결재 상신</p>
                            <p>* 결재순서</p>
                            <p>
                                <span>&nbsp; &nbsp;신청자 본인 ▶ 팀장&nbsp;</span>
                                <span>▶ 담당임원&nbsp;</span>
                                <span>▶ 경영지원팀 전달</span>
                            </p>
                            <p>
                                <span>
                                    <br />
                                </span>
                            </p>
                            <p></p>
                            <p>2. 항공권 발권, 호텔 확정</p>
                            <p>- 출장품의서 경영지원팀 결재 완료 후 항공권 발권(결재), 숙박 결재 가능</p>
                            <p>
                                <span>-</span>
                                <span> 항공권 수령 후 여권상 영문명, 출귀국 일정 상이여부 확인</span>
                            </p>
                            <p>
                                <span>
                                    <br />
                                </span>
                            </p>
                            <p>3. 출장 일비 수령</p>
                            <p>- 출장품의서 작성 시 '전액 현지화폐 수령' 선택 시 출장비 사전 수령 가능</p>
                            <p>- 출장여비 담당로부터 여비준비 완료연락 받은 후 판교 본사에서 수령</p>
                            <p>
                                <span>
                                    <br />
                                </span>
                            </p>
                            <p>
                                <span>4. 출국 및 귀국</span>
                            </p>
                            <p>
                                <span>- 출국 후 일정 변경, 특이사항 발생 시 담당자에게 빠른 연락(김도일 프로, 최주용 프로)</span>
                            </p>
                            <p>
                                <span>
                                    <br />
                                </span>
                            </p>
                            <p>
                                <span>5. 출장 비용 정산</span>
                            </p>
                            <p>
                                <span>- 귀국 후 ERP 출장비 정산, 문의사항은 정산담당자 확인</span>
                                <span>
                                    <br />
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="Right_Container">
                        <h2>출장관련 양식</h2>
                        <ul>
                            {PaperLists.map(list => {
                                return (
                                    <li onClick={() => ClickDownloadFiles(list)} key={list.name}>
                                        <div className="Main_Container">
                                            <div className="Image_Container">
                                                <img src={list.defaultImage}></img>
                                            </div>
                                            <div className="Naming_Container">{list.name}</div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </OutOnBusinessMainPageMainDivBox>
        </div>
    );
};

export default OutOnBusinessMainPage;
