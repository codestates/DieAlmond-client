import React, { useEffect, useState } from 'react';
import LoginModal from '../components/LoginModal';
import NaviBar from '../components/NaviBar'
import Footer from '../components/Footer'
import styled from 'styled-components';
import landingImg from '../img/imgTest.png'
import img1 from '../img/gameover.jpg'
import img2 from '../img/end.jpg'
import devilLanding from '../img/devilLanding.png'
import SettingModal from '../components/SettingModal/SettingModal'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import font from '../font.css'

const Landing1 = styled.div`
    width: 100vw;
    height: 100vh;
    
    @media screen and (max-width: 780px) {
        display: flex;
        flex-direction: column;
    }
`

const Title = styled.div`
    position: center;
    margin-top: 20px;
    font-size: 40px;
    font-family: 'CookieRunOTF-Black';
    text-align: center;
    color: #BF78E4;
    text-shadow: -4px 0 black, 0 4px black, 4px 0 black, 0 -4px black;

    @media screen and (max-width: 780px) {
        flex-direction: column;
    }
`

const Img = styled.img`
    position: relative;
    top: 50px;
    left: 50px;
    width: 45%;
    height: auto;

    @media screen and (max-width: 780px) {
        display: block;
        top: 50px;
        left: 0px;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
`

const IntroTitle = styled.div`
    position: relative;
    top: 75px;
    left: 100px;

    font-family: 'CookieRun-Regular';
    font-size: 60px;
    line-height: 75px;
    text-align: right;

    color: #BF78E4;
    text-shadow: -3.5px 0 black, 0 3.5px black, 3.5px 0 black, 0 -3.5px black;

    @media screen and (max-width: 780px) {
        top: 75px;
        left: 0px;
        font-size: 30px;
        line-height: 35px;
        text-align: center;
    }
`

const IntroSubTitle = styled.div`
    position: relative;
    top: 125px;
    left: 100px;
    font-family: 'CookieRun-Regular';
    font-size: 25px;
    line-height: 40px;
    text-align: right;
    color: white;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;

    @media screen and (max-width: 780px) {
        top: 100px;
        left: 0px;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
    }
`

const B = styled.b`
    color: #BF78E4;
`

const NavBtn = styled.div`
    position: relative;
    top: 200px;
    left: 350px;
    display: flex;

    @media screen and (max-width: 780px) {
        top: 125px;
        left: 50px;
        text-align: center;
    }
`

const LoginModalBtn1 = styled.button`
    margin-right: 20px;
    border-radius: 25px;
    background-color: white;
    border-color: #BF78E4;
    color: #BF78E4;
    cursor: pointer;
    width: 150px;
    height: 50px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;

    
    &:hover {
        color: white;
        background-color: #BF78E4;
    }

    @media screen and (max-width: 780px) {
        width: 100px;
        height: 40px;
    }
`;

const LoginModalBtn2 = styled.button`
    border-radius: 25px;
    background-color: white;
    border-color: #BF78E4;
    color: #BF78E4;
    cursor: pointer;
    width: 150px;
    height: 50px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
    
    &:hover {
        color: white;
        background-color: #BF78E4;
    }

    @media screen and (max-width: 780px) {
        width: 100px;
        height: 40px;
    }
`;

const Flex = styled.div `
    display: flex;

    @media screen and (max-width: 780px) {
        flex-direction: column;
    }
`

const LandingPage = ({resetStore}) => {
    const [login, setLogin] = useState(false)
    const [trialLogin, setTrialLogin] = useState(false)
    const history = useHistory()

    useEffect(() => {
        localStorage.clear()
        resetStore()
    })


    const handleLoginModal = () => {
        setLogin(!login)
    }

    const handleSettingLoginModal = () => {
        // setTrialLogin(!trialLogin)
        history.push('/mymy')
    }

    return (
        <div>
            <Landing1>
                    <Title>DieAlmond</Title>

                

                <Flex>
                    <Img src={devilLanding}></Img>   
                    <div>
                        <IntroTitle>
                            죽음은 지금 이 순간에도 
                            <br />
                            다가오고 있습니다.
                        </IntroTitle>
                        <IntroSubTitle>
                            우리는 언젠가 죽습니다. 
                            <br />
                            피할 수 없는 이 죽음이라는 운명을 
                            <br/>
                            외면하지 않고 선택의 순간에 활용한다면 
                            <br/>
                            더 진실 된 삶을 살 수 있습니다.
                            <br/>
                            <B>지금 바로 남은 수명을 확인해보세요!</B>
                        </IntroSubTitle>

                        <NavBtn>
                            <LoginModalBtn1 onClick={handleLoginModal}>회원가입 / <br/>로그인</LoginModalBtn1>
                                {login === false ?
                                    null :
                                    <LoginModal handleLoginModal={handleLoginModal}/>
                                }
                                <LoginModalBtn2 onClick={handleSettingLoginModal}>비회원</LoginModalBtn2>
                                {/* {trialLogin === false ?
                                    null :
                                    <SettingModal />
                                } */}
                        </NavBtn>
                    </div> 
                </Flex>
            </Landing1>

            <Footer />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return { resetStore: () => dispatch(actionCreators.resetInfo())}
}

export default connect(null,mapDispatchToProps)(LandingPage);