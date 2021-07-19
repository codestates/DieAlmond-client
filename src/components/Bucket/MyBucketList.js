import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import font from '../../font.css'

const MyBucketList = (props) => {
    const [propsId, setPropsId] = useState(props)
    const [isDone, setIsDone] = useState(props.isChecked)

    const Flex = styled.span`
        display:flex;
        align-items: center;
        font-size: medium;
        margin: 25px;
        width: 500px;
        height: 75px;
        font-size: 1.3em;
        padding: 8px;
        border-radius: 15px;
        cursor: pointer;
        color: black;
        border: 2.5px solid #BF78E4;

        :hover {
        transform: scale(1.05);
        transition: all 0.8s ease-out;
        background: white;
        }

        @media only screen and (max-width: 600px) {
            width: 350px;
            transform: translateY(15px);
            margin-top: 30px;   
            margin-left: 130px;         
            border: 1px solid #BF78E4;
            transition: all 0.5s ease-in;

            :hover {
                transform: translateY(0px)
            }
        }
    `;

    const DeleteBtn = styled.button`
            padding: 0.375rem 0.75rem;
            border-radius: 0.25rem;
            font-size: 1rem;
            line-height: 1.5;
            border: 1px solid #BF78E4;
            background-color: white;
            color: #BF78E4;
            border-radius: 20px;
            font-family: 'CookieRun-Regular';
            -webkit-transition: all 1s cubic-bezier(0.390, 0.500, 0.150, 1.360);
	        -moz-transition: all 1s cubic-bezier(0.390, 0.500, 0.150, 1.360);
            transition: all 1s cubic-bezier(0.390, 0.500, 0.150, 1.360);

    `;

    const LineToText = styled.div`
        display:flex;
        height:30px;
        margin: 5px;
        color: #BF78E4;
        align-items: center;
        justify-content: space-between;
        text-decoration: ${isDone === true ? 'line-through' : 'none'}
    `;

    const InputCheckbox = styled.input`
        margin: 10px;
        width: 25px; /*Desired width*/
        height: 25px; /*Desired height*/

        color: #BF78E4;
    `

    const DeleteBucketList = () => {
        if (window.confirm("버킷리스트를 삭제하시겠습니까?")) {
            axios.delete(`http://localhost:80/bucket`, {

                headers: {
                    "sns": "google",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${props.userInfo.google}`
                },
                withCredentials: true,

                data: { id: props.id }
            }).then(res => {
                setPropsId({ id: 0 })
                props.renderDelete()
            })
                .catch(e => alert("삭제 실패했습니다."))
        }
    }

    const toggleCheckBox = () => {
        axios.patch(`http://localhost:80/bucket/check`, {
            id: props.id,
            isChecked: !isDone
        }, {
            headers: {
                "sns": "google",
                "Content-Type": "application/json",
                "authorization": `Bearer ${props.userInfo.google}`
            },
            withCredentials: true,
        }).then(res => {
            setIsDone(!isDone)

        })
    }

    return (
        <Flex>
            <LineToText>
                <InputCheckbox type="checkbox" checked={isDone} onChange={toggleCheckBox} />
                {props.description}
            </LineToText>
            <DeleteBtn onClick={DeleteBucketList}>삭제</DeleteBtn>
        </Flex>
    );
};

export default MyBucketList;