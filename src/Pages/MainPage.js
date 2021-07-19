import React, { useEffect, useState } from 'react';
import Today from '../components/Aside/Today';
import BucketLists from '../components/Aside/BucketLists';
import CountDown from '../components/CountDownTimer/CountDown';
import ProgressBar from '../components/ProgressBar'
import NaviBar from '../components/NaviBar'
import Almond from '../components/Almond/Almond'
import WiseSaying from '../components/Almond/WiseSaying'
import { connect } from 'react-redux';
import axios from 'axios';
import { actionCreators } from '../store';
import { useHistory } from 'react-router';
import styled, {createGlobalStyle} from 'styled-components';
import star from "../img/landingback.png"

const Global = createGlobalStyle`
    body {
        height: 100%;
        margin: 0;
        background: no-repeat url(${star});
        background-size: -100% -100% -100%; 
    }
    html {
        height: 100%;
    }
   
`;

const Screen1 = styled.div`
    min-width: 100%;
    height: auto;
`

const Screen2 = styled.div`
    width: 100vw;
    height: 50vh;
`

const Loader = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 120px;
    height: 120px;
    margin: -76px 0 0 -76px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #BF78E4;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`

const Div = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 120px;
    height: 120px;
    margin: 80px 0 0 -76px;
    font-weight: bold;
`
const Title = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px;
    padding: 10px;
    font-family: 'CookieRunOTF-Black';

    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

const Aside1 = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'CookieRunOTF-Black';
    font-size: 20px;
    color: #BF78E4;

    @media only screen and (max-width: 600px) {
        margin-bottom: 20px;
    }
`;

const Header = styled.div`
    font-family: 'CookieRunOTF-Black';
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;

    @media only screen and (max-width: 600px) {
        font-size: 1rem;
    }
`;

const Nickname = styled.div`
    font-family: 'CookieRunOTF-Black';
    margin: 0 0 50px 0;
    font-size: 3rem;
    color: #BF78E4;
    line-height: 3.2rem;
    text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;

`;

const Aside2 = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    font-family: 'CookieRunOTF-Black';
    font-size: 20px;
    color: #BF78E4;

    @media only screen and (max-width: 600px) {
        text-align: center;
    }
`;

const Dot = styled.div`
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    @media only screen and (max-width: 600px) {
        margin: 0 auto;
    }
`

const MainPage = ({ userInfo, addInfo }) => {

    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (localStorage.getItem("isLogin") === 'login') {
            axios.get('http://localhost:80/main', {
                headers: {
                    'sns': 'google',
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userInfo.google}`
                },
                withCredentials: true
            })
                .then((res) => {
                    if (typeof (res.data.userinfo.nickname) === 'string') {
                        addInfo(res.data.userinfo);
                        localStorage.setItem("info", JSON.stringify(res.data.userinfo))
                    } else {
                        history.push('/mymy');
                    }
                })
                .catch(e => e);
        }

        if (localStorage.getItem("isLogin") === 'login' && localStorage.getItem("info")) {
            addInfo(JSON.parse(localStorage.getItem("info")))
            setIsLoading(false);
        } else {
            addInfo(JSON.parse(localStorage.getItem("info")))
            setIsLoading(false);
        }
    }, [])

    return (
        <div>
            <Global/>
            {isLoading ? <div><Loader /><Div>잠시만 기다려주세요.</Div></div> :
                <>
                <Screen1>
                    <NaviBar />

                    <Title>

                        <Aside1>
                            <Today />
                            <WiseSaying />
                        </Aside1>

                        <Header>
                            <Nickname>'{userInfo.nickname}'님의 남은 인생은.. </Nickname>
                            <CountDown userInfo={userInfo}></CountDown>
                        </Header>

                        <Aside2>
                            <Dot> 죽기전에 해봐야지 </Dot>
                            <BucketLists userInfo={userInfo} />
                        </Aside2>

                    </Title>
                </Screen1>

                <Screen2>
                        <Almond userInfo={userInfo} />
                        <ProgressBar userInfo={userInfo} />
                </Screen2>                
                </>}
        </div>
    );
};

function mapStateToProps(state) {
    return { userInfo: state }
}

function mapDispatchToProps(dispatch) {
    return { addInfo: (info) => dispatch(actionCreators.addInfo(info)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);