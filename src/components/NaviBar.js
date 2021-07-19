import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import GooLogin from './oauth/GooLogin';
import {connect} from 'react-redux';

const Nav = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 60px;
    padding: 10px;
`;


const SettingBtn = styled.button`
    margin-right: 20px;
    border-radius: 4px;
    background-color: ;
    border: outset 2px #BF78E4;
    color: white;
    cursor: pointer;
    width: 60px;
    height: 40px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    border-radius: 50px;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    
    &:hover {
        border: inset 2px white;
        color: #BF78E4;
        background-color: white;
    }
`;

const NaviBar = ({userInfo}) => {
    const history = useHistory()

    return (
        <>
            <Nav>
                {userInfo.snsLogin ? <GooLogin/> : null}

                <SettingBtn onClick={() => {
                    history.push('/mymy')
                }}>설정</SettingBtn>
            </Nav>          
        </>
        
    );
};

function mapStateToProps(state) {
    return {userInfo: state}
}

export default connect(mapStateToProps)(NaviBar);