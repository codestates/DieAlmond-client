import axios from 'axios';
import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../../store';
import styled from 'styled-components';

const Button = styled.div`
    margin-right: 20px;
    border-radius: 4px;
    background-color: #BF78E4;
    border: outset 2px #BF78E4;
    color: white;
    cursor: pointer;
    width: 65px;
    height: 40px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    border-radius: 50px;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    text-align: center;
    
    &:hover {
        border: inset 2px white;
        color: #BF78E4;
        background-color: white;
    }
`

const ButtonLogout = styled.div`
    margin-right: 20px;
    border-radius: 4px;
    background-color: #BF78E4;
    border: outset 2px #BF78E4;
    color: white;
    cursor: pointer;
    width: 65px;
    height: 40px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    border-radius: 50px;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    text-align: center;
    padding-top: 8px;
    
    &:hover {
        border: inset 2px white;
        color: #BF78E4;
        background-color: white;
    }
`

const clientId = '709242535333-pl44ipg3ggctlk8ko6hgji008vgbl25s.apps.googleusercontent.com'

const GooLogin = ({ addUserInfo }) => {
    const [isLogin, setIslogin] = useState(false)
    const history = useHistory()

    const onSuccess = (res) => {
        console.log(res)
        if(res.accessToken) {
            axios.post('http://localhost:80/google',{
              
            }, {
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${res.accessToken}`
                }, withCredentials: true
            },
            ).then((res) => {
                setIslogin(!isLogin)
                const realToken = res.data.access_token
                addUserInfo({ google: realToken.slice(7) })
                localStorage.setItem("isLogin", "login");
                history.push('/main')
            }).catch((e) => alert(e))
        }
    }


    const onFailure = (res) => {
        // console.log('[Login failed] res:', res);
    }

    const onLogoutSuccess = (res) => {

        alert('로그아웃이 완료되었습니다!');
        setIslogin(!isLogin)
        addUserInfo({ google: null })
        localStorage.clear()
        history.push('/')
    }

    return (
        <>
            {
                isLogin === false ?
                        <GoogleLogin
                        clientId={clientId}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true} 
                        render={renderProps => (
                            <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>로그인</Button>
                          )}
                        />
                    :
                    <GoogleLogout
                        clientId={clientId}
                        icon={false}
                        onLogoutSuccess={onLogoutSuccess}
                        render={renderProps => (
                            <ButtonLogout onClick={renderProps.onClick} disabled={renderProps.disabled}>로그아웃</ButtonLogout>
                          )}
                        />
            }
        </>
    );
};

function mapDispatchToProps(dispatch) {
    return { addUserInfo: (googleToken) => dispatch(actionCreators.addInfo(googleToken)) }
}

export default connect(null, mapDispatchToProps)(GooLogin);