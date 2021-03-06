import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const customStyles = {
    content: {
        // top: '50%',
        // left: '50%',
        // right: 'auto',
        // bottom: 'auto',
        // marginRight: '-50%',
        // transform: 'translate(-50%, -50%)',

        top: '0px',
        left: '0px',
        padding: '60px',
        margin: '0px',
        height: '100%',
        width: '100%',
    },
};
Modal.setAppElement('#ModalOTDetail');

type TeamOTPrinterModalProps = {
    modalIsOpen: boolean;
    closeModal: () => void;
    showdatas: any;
    selectTeam: string;
    selectYear: string;
    selectMonth: string;
};

const TeamOTPrinterModal = ({ modalIsOpen, closeModal, showdatas, selectTeam, selectYear, selectMonth }: TeamOTPrinterModalProps) => {
    useEffect(() => {
        if (modalIsOpen) {
            setTimeout(() => {
                window.print();
                closeModal();
            }, 100);
        }
    }, [showdatas, selectTeam, modalIsOpen]);

    // useEffect(() => {
    //     getBusinessTripData();
    // }, []);

    // const getBusinessTripData = async () => {
    //     try {
    //         const getBusinessTripDatas = axios.get(`${process.env.REACT_APP_DB_HOST}/TeamSelectOT_app_server/businessGroupData`, {
    //             params: {
    //                 selectTeam,
    //                 SeletDate: `${selectYear}-${selectMonth}`,
    //             },
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                <div style={{ pageBreakBefore: 'always', pageBreakAfter: 'always' }} className="TeamOTPrintermodal_big_box_div">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={4} rowSpan={2}>
                                    <h3>
                                        {selectTeam.toUpperCase()}???
                                        <br />
                                        ??????(??????) ?????? ???????????????
                                    </h3>
                                </th>
                                <th style={{ background: '#c9cc51', width: '150px' }}>?????????</th>
                                <th style={{ background: '#c9cc51', width: '150px' }}>??????</th>
                                <th style={{ background: '#c9cc51', width: '150px' }}>??????</th>
                            </tr>
                            <tr>
                                <td style={{ height: '60px', background: 'white' }}></td>
                                <td style={{ height: '60px', background: 'white' }}></td>
                                <td style={{ height: '60px', background: 'white' }}></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 'bolder' }}>????????????</td>
                                <td colSpan={2} style={{ fontWeight: 'bolder' }}>{`${selectYear}??? ${selectMonth}???`}</td>

                                <td colSpan={4}>OT ??????</td>
                            </tr>
                            <tr>
                                <td>??????</td>
                                <td>??????</td>
                                <td>?????????</td>
                                <td colSpan={2}>??????</td>
                                <td>??????</td>
                                <td>??????</td>
                            </tr>

                            {showdatas.map(
                                (list: { name: string; sumTimes: number; nightTimes: number; holidaySum_time: number }, i: number) => {
                                    return (
                                        <>
                                            <tr style={{ height: '20px' }}>
                                                <td rowSpan={2}>{i + 1}</td>
                                                <td rowSpan={2}>{list.name}</td>
                                                <td rowSpan={2} style={{ width: '150px;' }}>
                                                    {selectTeam.toUpperCase()}???
                                                </td>
                                                <td rowSpan={2}>
                                                    {list.sumTimes - list.holidaySum_time > 0
                                                        ? list.sumTimes - list.holidaySum_time + ' ??????'
                                                        : ''}
                                                </td>
                                                <td style={{ background: '#c9cc51', height: '10px', fontSize: 'xx-small' }}>??????</td>
                                                <td rowSpan={2}>{list.holidaySum_time > 0 ? list.holidaySum_time + ' ??????' : ''}</td>
                                                <td rowSpan={2}>{list.sumTimes > 0 ? list.sumTimes + ' ??????' : ''}</td>
                                            </tr>
                                            <tr>
                                                {list.nightTimes > 0 ? (
                                                    <td>{list.nightTimes > 0 ? list.nightTimes + ' ??????' : ''}</td>
                                                ) : (
                                                    <></>
                                                )}

                                                {list.nightTimes === 0 ? (
                                                    <td style={{ color: 'none', opacity: 0 }}>{list.nightTimes === 0 ? '.' : ''}</td>
                                                ) : (
                                                    <></>
                                                )}
                                            </tr>
                                        </>
                                    );
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </div>
    );
};

export default TeamOTPrinterModal;
