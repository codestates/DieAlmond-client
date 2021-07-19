import React from 'react';
import { Progress } from 'semantic-ui-react'
import styled from 'styled-components';

const Pr = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    flex-direction: column;
`;

const ProgressBar = ({userInfo}) => {
    
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
        restLife = restLife - (alcohol * 2)
    }

    // 4-3. 수면 : 12~10 / 9~7 / 6~4
    if (sleep > 9) {
        restLife = restLife - 5
    } else if (sleep < 7) {
        restLife = restLife - 5
    }

    const per = percentOfLife(age, restLife);
    
    return (
        <Pr>
        <Progress percent={Math.round(per)} active progress color='white'/>
        </Pr>
    );
};

export default ProgressBar;