import React, { useState } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import Calendar from '../components/SettingModal/Calendar'
import SleepSlider from '../components/SettingModal/SleepSlider';
import SmokingSlider from '../components/SettingModal/SmokingSlider'
import AlcoholSlider from '../components/SettingModal/AlcoholSlider'
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import font from '../font.css'
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

const Container = styled.div`
    padding: 20px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    vertical-align: middle;
    font-family: 'CookieRun-Regular';
`

const Title = styled.h1`
    font-size: 2rem;
    text-align: center;
    color: #BF78E4;
    font-family: 'CookieRun-Regular';
    text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;
`;

const Input = styled.input`
    width: 200px;
    height: 3rem;
    color: #BF78E4;
    margin: 1rem;
    font-size: 1.5rem;
    text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
    border: solid 5px #BF78E4;
    border-radius: 5px;

    :focus {
        outline: none;
    }

    ::placeholder {
        color: white;
        font-size: 1.25rem;
    }
`

const Radio = styled.input`

    margin: 10px;
    width:20px;
    height:20px;

    :focus {
        outline: none;
    }
`

const Div = styled.div`
    font-weight: bold;
    color: #BF78E4;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`

const Span = styled.span`
    font-weight: bold;
    color: #BF78E4;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`

const Button = styled.button`
    margin: 30px;
    text-align:center;
    background:#BF78E4;
    color:white;
    border:none;
    position:relative;
    height:40px;
    width: 110px;
    font-size:1.3rem;
    padding:0 1rem;
    cursor:pointer;
    transition:300ms ease all;
    outline:none;
    border-radius: 30px;
    margin: 0.5rem;
    font-family: 'CookieRun-Regular';
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;

    :hover{
        background: white;
        color: #BF78E4;
        border: solid 2px #BF78E4;
}
`

const Form = styled.form`
    border: 3px solid #BF78E4;
    padding: 3rem;
    border-radius: 60px;
`



const MyPage = ({ userInfo, addUserInfo, resetStore }) => {

    const [nickname, setNickName] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState([]);
    const [sleep, setSleep] = useState(0);
    const [smoking, setSmoking] = useState(0);
    const [alcohol, setAlcohol] = useState(0);
    const history = useHistory();


    const onChange = (e) => {
        setNickName(e.target.value);
    }

    const onChangeSex = (e) => {
        setGender(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (nickname === '' || gender === '' || birth.length === 0 || sleep === 0) {
            return alert("모든 항목을 빠짐없이 기입해주세요 :)")
        } else {
            let date = JSON.stringify(birth);
            date = date.slice(1, 11).split('-')
            date = date.map(e => parseInt(e))
            const [year, month, day] = date;

            // 2. 만 나이 계산
            let today = new Date();
            let birthDate = new Date(year, month, day);

            let age = today.getFullYear() - birthDate.getFullYear();
            let m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            addUserInfo({
                nickname: nickname,
                gender: gender,
                age: age,
                year: year,
                month: month,
                day: day,
                sleep: parseInt(sleep),
                smoking: parseInt(smoking),
                alcohol: parseInt(alcohol)
            })

            if (userInfo.google) {
                axios.post('http://localhost:80/setting', {
                    nickName: nickname,
                    gender: gender,
                    birth: date,
                    year: year,
                    age: age,
                    month: month,
                    day: day,
                    sleep: parseInt(sleep),
                    smoking: parseInt(smoking),
                    alcohol: parseInt(alcohol)
                }, {
                    headers: {
                        'sns': 'google',
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${userInfo.google}`
                    },
                    withCredentials: true
                })
                    .then((res) => {
                        addUserInfo({ restLife: parseInt(res.data.life) })
                        alert('변경 완료 :)')
                        localStorage.setItem("info", JSON.stringify({
                            'nickname': nickname,
                            'gender': gender,
                            'birth': date,
                            'year': year,
                            'age': age,
                            'month': month,
                            'day': day,
                            'sleep': parseInt(sleep),
                            'smoking': parseInt(smoking),
                            'alcohol': parseInt(alcohol),
                            'restLife': parseInt(res.data.life)
                        }))
                    })
                    .then((res) => {
                        history.push('/main')
                    })
                    .catch(e => e)
            } else {
                axios.post('http://localhost:80/setting', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                    nickname: nickname,
                    gender: gender,
                    birth: date,
                    year: year,
                    age: age,
                    month: month,
                    day: day,
                    sleep: parseInt(sleep),
                    smoking: parseInt(smoking),
                    alcohol: parseInt(alcohol)
                })
                    .then((res) => {
                        addUserInfo({ restLife: parseInt(res.data.life) })
                        alert('변경을 완료했습니다 :)')
                        localStorage.setItem("info", JSON.stringify({
                            'nickname': nickname,
                            'gender': gender,
                            'birth': date,
                            'year': year,
                            'age': age,
                            'month': month,
                            'day': day,
                            'sleep': parseInt(sleep),
                            'smoking': parseInt(smoking),
                            'alcohol': parseInt(alcohol),
                            'restLife': parseInt(res.data.life)
                        }))
                    })
                    .then((res) => {
                        history.push('/main')
                    })
                    .catch(e => e)
            }
        }

    }

    const onClick = () => {
        history.push('/main')
    }

    const withdrawal = () => {
        if (window.confirm("정말 탈퇴 하시겠어요?")) {
            axios.delete('http://localhost:80/withdrawal', {
                headers: {
                    "sns": "google",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userInfo.google}`
                },
                withCredentials: true,
            }).then(res => {
                alert('좋은 일만 가득하길 빌게요!')
                localStorage.clear()
                resetStore()
                history.push('/')
            })
                .catch(e => alert(e))
        }

    }

    return (
        <Container>
            <Global/>
            <Form onSubmit={onSubmit}>
                <Title>정보를 입력해서 기대 수명을 확인해보세요 🙌</Title>
                {/* input text */}
                <Div>닉네임 입력</Div>
                <Input type='text' placeholder='닉네임을 입력하세요.' onChange={onChange} value={nickname}></Input>
                {/* <Input /> */}
                <hr />
                {/* radio : gender */}
                <Div>성별 선택</Div>
                <Radio type='radio' id='male' name='gender' value='male' checked={gender === 'male'} onChange={onChangeSex} />
                <Span>남성</Span>
                <Radio type='radio' id='female' name='gender' value='female' checked={gender === 'female'} onChange={onChangeSex} />
                <Span>여성</Span>
                <hr />

                <Div>생년월일 입력</Div>
                <Calendar setBirth={setBirth} birth={birth} />
                <hr />
                <SleepSlider setSleep={setSleep} />
                <SmokingSlider setSmoking={setSmoking} />
                <AlcoholSlider setAlcohol={setAlcohol} />
                <hr />
                <Button>완료</Button>
                {typeof (userInfo.nickname) === 'string' ?
                    <div>
                        <Button onClick={onClick}>메인 화면</Button>
                        {typeof (userInfo.google) === 'string' ? <Button onClick={withdrawal}>회원탈퇴</Button> : null}
                    </div>
                    : null}
            </Form>
        </Container>
    );
};

function mapStateToProps(state) {
    return { userInfo: state }
}

function mapDispatchToProps(dispatch) {
    return { 
        addUserInfo: (info) => dispatch(actionCreators.addInfo(info)),
        resetStore: () => dispatch(actionCreators.resetInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);