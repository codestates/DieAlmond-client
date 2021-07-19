import React from 'react';
import styled from 'styled-components';

const Now = styled.div `
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    @media only screen and (max-width: 600px) {
        margin: 0 auto;
    }
`

const Today = () => {
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });

    return (
        <Now>
            🗓 {dateString}
        </Now>
    );
};

export default Today;