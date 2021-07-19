import React from 'react';
import styled from 'styled-components';
import font from '../font.css'

const Foot = styled.footer`
        display: flex;
        width: 100%;
        bottom: 0px;
        position: fixed;
        flex-direction: column;
        align-items: center;
        background-color: #BF78E4;
        text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
    `;

    const FooterText = styled.div`
        font-family: 'CookieRun-Regular';
        color: white;
        text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;
    `

    const A = styled.a`
        font-family: 'CookieRun-Regular';
        color : white;
        text-decoration: none;
        margin: 5px;
        text-shadow: -1.5px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1.5px black;

        :hover {
            color: hotpink;
        }
    `

const Footer = () => {
    return (
        <Foot>
            <FooterText>DieAlmond</FooterText>
            <FooterText>
                <A href="https://github.com/habasa/" target="_blank">김성진 <i class="fab fa-github-square"></i></A>
                <A href="https://github.com/kilo718/" target="_blank">박준수 <i class="fab fa-github-square"></i></A>
                <A href="https://github.com/creamereos/" target="_blank">이진태 <i class="fab fa-github-square"></i></A>
                <A href="https://github.com/zoossone/" target="_blank">주상원 <i class="fab fa-github-square"></i></A>
            </FooterText>
            <FooterText>2021 DieAlmond - All rights reserved</FooterText>
        </Foot>
    );
};

export default Footer;