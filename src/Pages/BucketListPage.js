import React from 'react';
import { useHistory } from 'react-router-dom';
import MyBucketListPage from './MyBucketListPage';
import styled from 'styled-components';

const BackButton = styled.button`
    -webkit-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    -moz-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    max-width: 180px;
    text-decoration: none;
    border-radius: 30px;
    border-color: #BF78E4;
    background-color: white;
    padding: 10px 30px;
    margin: 10px;
    font-family: 'CookieRun-Regular';
    color: #BF78E4;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;

    :hover {
        color: rgba(255, 255, 255, 0.85);
        background-color: #BF78E4;
	    box-shadow: rgba(30, 22, 54, 0.7) 0 0px 0px 40px inset;
        text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    }
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: reverse;
    font-family: 'CookieRun-Regular';
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

const BucketListPage = () => {
    const history = useHistory()
    
    return (
        <div>
            <Nav>
                <BackButton onClick={() => history.push('/main')}>메인 화면</BackButton>
            </Nav>
            <MyBucketListPage />
        </div>
    );
};

export default BucketListPage;