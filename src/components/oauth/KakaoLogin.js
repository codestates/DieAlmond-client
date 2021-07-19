import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import img from '../../img/kakaologin.png'
import {connect} from 'react-redux';
import { actionCreators } from '../../store';

const ButtonWrap = styled.button`
  border: 2px solid black;
  position: relative;
  width: 183px;
  height: 45px;
  background-image: url(${img});
`;

const { Kakao } = window

const KakaoLogin = ({addUserInfo}) => {
    const [data, setData] = useState('') // 요청한 유저 데이터값 저장 위해서
    const [kakaoToken, setKakaoToken] = useState('')
    const [kakaoIslogin, setKakaoIsLogin] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if(window.Kakao.Auth.getAccessToken()) {
            setKakaoIsLogin(!kakaoToken)
        }
    })


    const KakaoLog = () => {
        setKakaoIsLogin(!kakaoIslogin)
        Kakao.Auth.login({
            scope: 'profile_nickname, account_email, gender',
            success: function (authObj) {
                
                setKakaoToken(authObj.access_token)
                addUserInfo({kakao: authObj.access_token})
                window.Kakao.API.request({
                    url: '/v2/user/me', // 로그인한 사용자의 정보 가져옴
                    // 라우팅 추가 메인페이지로
                    success: res => {
                        const Kakao_account = res.kakao_account
                        setData(Kakao_account)
                        history.push('/main')
                    }
                })
            } 
        })
    }

    const KakaoOut = () => {
        // 로그인할때 상태에 토큰하나 만들어줘서 그걸 props로 내려받아오기
        if (window.Kakao.Auth.getAccessToken()) {
            // 로그인할때 받아온 토큰값이 있으면
            window.Kakao.Auth.logout(() => {
                addUserInfo({kakao: null})
                alert('카카오 로그아웃')
                history.push('/')
            })
        }
    }

    return (
        <div>
            {
                kakaoIslogin === false ?
                <button  onClick={KakaoLog}>카카오 로그인</button> :
                <button onClick={KakaoOut}>카카오 로그아웃</button>
            }
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return {addUserInfo: (kakaoToken) => dispatch(actionCreators.addInfo(kakaoToken))}
}

export default connect(null, mapDispatchToProps)(KakaoLogin);