import React, { useEffect, useState } from 'react';
import LoginModal from '../components/LoginModal';
import Footer from '../components/Footer'
import styled, {createGlobalStyle} from 'styled-components';
import devilLanding from '../img/devilLanding.png'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import star from "../img/main.jpg"

const Global = createGlobalStyle`
    body {
        height: 100%;
        margin: 0;
        background: no-repeat url(${star});
        background-size: cover; 
    }
    html {
        height: 100%;
    }
   
`;

const Landing1 = styled.div`
    display: flex;
    flex-direction: column;
    postition: relative;
    top: 20px;
    margin: 0;
    width: 100vw;
    min-height: 100%;
    
`

const Title = styled.div`
    position: center;
    padding-top: 50px;
    font-size: 40px;
    font-family: 'CookieRunOTF-Black';
    text-align: center;
    color: #BF78E4;
    text-shadow: -4px 0 black, 0 4px black, 4px 0 black, 0 -4px black;
`

const Img = styled.img`
    position: relative;
    top: 100px;
    right: 40px;
    width: 40%;
    height: 450px;

    @media screen and (max-width: 600px) {
        top: -40px;
        left: 0px;
        height: 200px;
        width: 50%;
    }
`

const IntroTitle = styled.div`
    position: relative;
    top: 75px;

    font-family: 'CookieRun-Regular';
    font-size: 60px;
    line-height: 75px;
    text-align: right;

    color: #BF78E4;
    text-shadow: -3.5px 0 black, 0 3.5px black, 3.5px 0 black, 0 -3.5px black;

    @media screen and (max-width: 600px) {
        top: 0;
        left: 0px;
        font-size: 30px;
        line-height: 35px;
        text-align: center;
    }
`

const IntroSubTitle = styled.div`
    position: relative;
    top: 125px;
    font-family: 'CookieRun-Regular';
    font-size: 25px;
    line-height: 40px;
    text-align: right;
    color: white;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;

    @media screen and (max-width: 600px) {
        top: 30px;
        left: 0px;
        width: 100%;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
    }
`

const B = styled.b`
    color: #BF78E4;
`

const NavBtn = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 150px;
    margin-bottom: 0px;

    @media screen and (max-width: 600px) {
        justify-content: center;
        margin-bottom: 30px;
        margin-top: 40px;
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

    @media screen and (max-width: 600px) {
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

    @media screen and (max-width: 600px) {
        width: 100px;
        height: 40px;
    }
`;

const Flex = styled.div `
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 600px;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 600px) {
        flex-direction: column;
    }
`

const Foot = styled.footer`
position: absolute;
bottom: 0;
left: 0;
right: 0;
`;


const LandingPage = ({resetStore}) => {
    const [login, setLogin] = useState(false)
    const history = useHistory()

    useEffect(() => {
        localStorage.clear()
        resetStore()
    })


    const handleLoginModal = () => {
        setLogin(!login)
    }

    const handleSettingLoginModal = () => {
        history.push('/mymy')
    }

    return (
        <div>
            <Global/>
            <Landing1>
                    <Title>DieAlmond</Title>

                

                <Flex>
                    <Img src={devilLanding}></Img>   
                    <div>
                        <IntroTitle>
                            ????????? ?????? ??? ???????????? 
                            <br />
                            ???????????? ????????????.
                        </IntroTitle>
                        <IntroSubTitle>
                            ????????? ????????? ????????????. 
                            <br />
                            ?????? ??? ?????? ??? ??????????????? ????????? 
                            <br/>
                            ???????????? ?????? ????????? ????????? ??????????????? 
                            <br/>
                            ??? ?????? ??? ?????? ??? ??? ????????????.
                            <br/>
                            <B>?????? ?????? ?????? ????????? ??????????????????!</B>
                        </IntroSubTitle>
                        <NavBtn>
                            <LoginModalBtn1 onClick={handleLoginModal}>???????????? / <br/>?????????</LoginModalBtn1>
                                {login === false ?
                                    null :
                                    <LoginModal handleLoginModal={handleLoginModal}/>
                                }
                                <LoginModalBtn2 onClick={handleSettingLoginModal}>?????????</LoginModalBtn2>
                            </NavBtn>
                   </div>
                </Flex>
                <Foot><Footer/></Foot>               
            </Landing1>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return { resetStore: () => dispatch(actionCreators.resetInfo())}
}

export default connect(null,mapDispatchToProps)(LandingPage);