import React, {useState} from 'react';
import styled from 'styled-components';
import EasterEgg from '../EasterEgg/EasterEgg'

const Al = styled.div`
    display: flex;
    width: 100%;
    bottom: 0px;
    position: relative;
    flex-direction: column;
    transform: translateY(0%)
`;

const Almond = ({userInfo}) => {

    const [start, setStart] = useState(false);

    const handleEasterEgg = () => {
        setStart(!start)
    }
   
    // Dummy Data. 라이프 퍼센티지 데이터 필요
    let { age, sleep, smoking, alcohol, restLife  } = userInfo

    const percentOfLife = (age, restLife) => {
        const total = age + restLife;
        return age/total*100
    }

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

    const per = percentOfLife(age, restLife);

    const Img = styled.img`
        display: flex;
        flex-direction: column;
        position: fixed;
        max-width: 200px;
        height : auto;
        margin : 0px;
        padding: 0px;
        position: relative;
        /* 변수로 지정 필요 수명 퍼센티지 - 3 */
        left: ${per - 4}%;
        cursor: pointer;

        @media only screen and (max-width: 600px) {
            max-width: 130px;
        }
    `;

    // 흡연 x 음주 x 수면
    if(userInfo.smoking > 0 && userInfo.alcohol > 0 && (userInfo.sleep > 9 || userInfo.sleep < 7)) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_sleep_smoking_alcohol.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 흡연 x 음주 
    if(userInfo.smoking > 0 && userInfo.alcohol > 0) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_alcohol_smoking.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 흡연 x 수면
    if(userInfo.smoking > 0 && (userInfo.sleep > 9 || userInfo.sleep < 7)) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_sleep_smoking.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 음주 x 수면
    if(userInfo.alcohol > 0 && (userInfo.sleep > 9 || userInfo.sleep < 7)) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_sleep_alcohol.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }


    // 흡연
    if(userInfo.smoking > 0) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_smoking.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 음주
    if(userInfo.alcohol > 0) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_alcohol.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 수면
    if(userInfo.sleep > 9 || userInfo.sleep < 7) {
        return (
            <div>
                <Img onClick={handleEasterEgg} src={require("../../img/almond_sleep.gif").default}/>
                {start === false ? null : <EasterEgg />}
            </div>
        );
    }

    // 정상
    return (
        <Al>
            <Img onClick={handleEasterEgg} src={require("../../img/almond.gif").default}/>
            {start === false ? null : <EasterEgg />}
        </Al>
    );
};

export default Almond;