import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const ShowRandom = styled.div`
    width:100%;
    line-height: 1.8rem;
    padding: 2px;
    background-color: #BF78E4;
    color: white;
    margin-bottom: 10px;
    border-radius: 10px;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

const BucketAdd = styled.button`
    margin-right: 20px;
    justify-content: center;
    border-radius: 4px;
    background-color: white;
    border: outset 4px #BF78E4;
    color: #BF78E4;
    cursor: pointer;
    width: 15rem;
    height: 50px;
    font-family: 'CookieRunOTF-Bold';
    font-size: 15px;
    font-weight: 900;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    
    &:hover {
        border: inset 4px white;
        color: white;
        background-color: #BF78E4;
    }

    @media only screen and (max-width: 600px) {
        margin: 0 auto;
    }

    @media only screen and (max-width: 600px) {
        margin: 0 auto;
    }
`

const Div = styled.div`
    justify-content: center;
    width: 15rem;

@media only screen and (max-width: 600px) {
    margin: 0 auto;
}
`;

const BucketLists = ({userInfo}) => {
    const history = useHistory();
    const onClick = () => {
        if(userInfo.email){
            history.push('/bucket')
        } else if (window.confirm('로그인하실래요?')){
            history.push('/')
        }
    }

    return (
        <Container>
            <br/>
                {userInfo.list === undefined || userInfo.list.length === 0 ? 
                    null
                    :
                    <Div>
                        {userInfo.list.filter(e => e.isChecked === false).map(e => <ShowRandom key={e.id}>{e.bucketName}</ShowRandom>).slice(0, 5)}
                    </Div>
                }
            <BucketAdd onClick={onClick}>버킷리스트 추가</BucketAdd>
        </Container>
    );
};

export default BucketLists;