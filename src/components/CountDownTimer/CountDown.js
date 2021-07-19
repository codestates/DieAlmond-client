import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

const ReverseTimer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const RestLife = styled.div`
    font-size: 50px;
    color: hotpink;
    margin-top: 2rem;
    text-shadow: -4px 0 black, 0 4px black, 4px 0 black, 0 -4px black;
    
`;

const Timer = styled.div `
    font-family: CookieRunOTF-Black;
    font-size: 5rem;
    margin-top: 5rem;
    color: hotpink;
    margin-top: 5rem;
    line-height: 6rem;
    text-shadow: -4px 0 black, 0 4px black, 4px 0 black, 0 -4px black;

    @media only screen and (max-width: 600px) {
        font-size: 2.5rem;
        margin: 20px 0 0 10px;
        padding: 0px;
    }
`

const FontSize = styled.div`
    font-size: 7rem;
    margin-top: 30px;

    @media only screen and (max-width: 600px) {
        font-size: 5rem;
        margin-top: -10px;
    }
`;

const CountDown = ({ userInfo }) => {
    let { sleep, smoking, alcohol, restLife } = userInfo

    if (smoking > 21) {
        restLife = restLife - 10;
    } else if (10 < smoking && smoking < 21) {
        restLife = restLife - 5;
    } else if (0 < smoking && smoking < 11) {
        restLife = restLife - 2.5;
    }

    // 4-2. 술 : 1번 당 3년 단축
    if (alcohol === 7) {
        restLife = restLife - 20
    } else {
        restLife = restLife - (alcohol * 3)
    }

    // 4-3. 수면 : 12~10 / 9~7 / 6~4
    if (sleep > 9) {
        restLife = restLife - 5
    } else if (sleep < 7) {
        restLife = restLife - 5
    }

    const now = new Date();
    let dead = {
        days: Math.round(restLife * 365) - 1,
        hours: 23 - now.getHours(),
        minutes: 59 - now.getMinutes(),
        seconds: 59 - now.getSeconds(),
        milliseconds: 99
    }

    const { days, hours, minutes, seconds, milliseconds } = dead

    const [[day, hrs, mins, secs, mss], setTime] = useState([days, hours, minutes, seconds, milliseconds]);

    const tick = () => {
        // Time Over
        if (days === 0 && hrs === 0 && mins === 0 && secs === 0 && mss === 0) {
            alert('끝')
        }
        else if (hrs === 0 && mins === 0 && secs === 0 && mss === 0) {
            setTime([days - 1, 23, 59, 59, 99]);
        }
        else if (mins === 0 && secs === 0 && mss === 0) {
            setTime([days, hrs - 1, 59, 59, 99]);
        } else if (secs === 0 && mss === 0) {
            setTime([days, hrs, mins - 1, 59, 99]);
        } else if (mss === 0) {
            setTime([days, hrs, mins, secs - 1, 99]);
        } else {
            setTime([days, hrs, mins, secs, mss - 1]);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => tick(), 10);
        return () => clearInterval(timer);
    });

    // padaytart : 스트링.padaytart(스트링의 길이, 채울 스트링)
    return (
        <ReverseTimer>
            <RestLife>
                {
                    `${day.toString()}일..`
                }
            </RestLife>
            <Timer>
                {
                    `
                        ${hrs.toString().padStart(2, '0')} 시간        
                        ${mins.toString().padStart(2, '0')} 분        
                        ${secs.toString().padStart(2, '0')} 초 `
                }
                <br/>
                <FontSize>
                {
                        `
                        ${mss.toString().padStart(2, '0')}
                    `
                }
                </FontSize>
            </Timer>
        </ReverseTimer>
    );
}

export default CountDown;