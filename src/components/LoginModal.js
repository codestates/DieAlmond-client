import React from 'react';
import styled from 'styled-components';
import GooLogin from './oauth/GooLogin';

const Modalcontainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #00000080;
`;

const Modal = styled.span`
    font-family: 'CookieRun-Regular';
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    width: 180px;
    height: 300px;
    background: white;
    border-radius: 20px;
    border: 3px solid #BF78E4;
    margin: 10px;
`;

const Div = styled.div`
    color: #BF78E4;
`

const LoginModal = (props) => {

    return (
            <Modalcontainer onClick={() => props.handleLoginModal()}>
                <Modal onClick={(e) => e.stopPropagation()}>
                    <Div>로그인 /<br/> 회원가입</Div>
                    <br/>
                <GooLogin />
                </Modal>
            </Modalcontainer>
    );
};

export default LoginModal;