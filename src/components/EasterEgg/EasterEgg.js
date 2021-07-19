import React, {useState} from 'react';
import styled, { keyframes} from 'styled-components';
import devil from './img/devil.png'

const EasterEgg = () => {

    let Frame = styled.div`
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    `
    
    const jumpUp = keyframes `
        0% {
        top: 50%;
        }

        25% {
            top: 45%;
        }

        50% {
            top: 40%;
        }

        75% {
            top: 45%;
        }

        100% {
            top: 50%;
        }
    `

    const block = keyframes `
        0% {
            left: 110%;
        }
        
        100% {
            left: -10%;
        }
    `

    const Devil = styled.div`
        width: 200px;
        height: 200px;
        position: relative;
        top: 60%;
        background-image: url(${devil});
        background-size: 200px 200px;
        animation: ${block} 1s infinite linear;

        @media only screen and (max-width: 600px) {
            width: 100px;
            height: 100px;
            top: 72.5%;
            background-size: 100px 100px;
            animation: ${block} 1.2s infinite linear;
        }
    `


    const [start, setStart] = useState(false);

    const toggleModal = () => {
        setStart(!start)
    }

    return (
        <div>
            {start === false ? 
                    <Frame onClick={toggleModal}>
                        <Devil />
                    </Frame> 
                : null}
        </div>
    )
}

export default EasterEgg