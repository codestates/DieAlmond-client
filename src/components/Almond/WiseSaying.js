import React from 'react';
import styled from 'styled-components';

const Wise = styled.p`
    margin-top: 30px;
    color: #BF78E4;
    border : solid 3px #BF78E4;
    border-radius: 5px;
    padding: 10px;
    font-size: 2rem;
    max-width: 20rem;
    line-height: 3rem;
    font-family: 'CookieRunOTF-Black';
    text-align: center;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;

    @media only screen and (max-width: 600px) {
        margin: 0 auto;
        max-width: 17rem;
        margin-top: 20px;
    }
`;

const WiseSaying = () => {

    const wiseSaying = [
        `사람은 어떻게 죽느냐가 문제가 아니라 어떻게 사느냐가 문제야.`,
        `인간이 품고 있는 죽음의 공포는 모두 자연에 대한 인식의 결여에서 나온거야.`,
        `인생이 끝나면 우리는 빈손으로 가지.`,
        `잘 보낸 하루가 편안한 잠을 주듯이 잘 쓰인 일생은 평안한 죽음을 줘.`,
        `항상 죽을 각오를 하고 있는 사람만이 참으로 자유로운 인간이야.`,
        `죽음은 마지막 성장의 기회야`,
        `오늘날 죽음이 없다면, 죽음을 발명 해야해.`,
        `삶이 만든 최고의 발명품이 죽음이야.`,
        `죽음이 있기에, 인생이 더 가치있는 법이야.`,
        `인생은 여행이고 죽음은 그 종점이야`
    ]

    return (
            <Wise>
                ☠️ 명언 ☠️ 
                <br/>
                {wiseSaying[Math.floor(Math.random() * 10)]}
            </Wise>
    )
}

export default WiseSaying;