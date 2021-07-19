import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyBucketList from '../components/Bucket/MyBucketList';
import { connect } from 'react-redux';
import AllBucketList from '../components/AllBucketList';
import styled, {createGlobalStyle} from 'styled-components';
import { actionCreators } from '../store';
import { useHistory } from 'react-router-dom';
import star from "../img/bucket.jpeg"

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

const Screen1 = styled.div`
    height: 100vh;
    width: 100vw;
`

const Text = styled.div`
    margin: 20px 35px 20px 0;
    font-size: 2.5rem;
    font-family: 'CookieRun-Regular';
    color: #BF78E4;
    text-align: center;
    text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;

    @media only screen and (max-width: 600px) {
        margin: 20px 0 20px 20px;
    }
`

const AllText = styled.div`
    margin-bottom: 20px;
    margin-top: 20px;
    font-size: 2.5rem;
    font-family: 'CookieRun-Regular';
    color: #BF78E4;
    text-align: center;
    text-shadow: -3px 0 black, 0 3px black, 3px 0 black, 0 -3px black;

    @media only screen and (max-width: 600px) {
        display: flex;
        flex-direction: row;
        margin-top: 40px;
    }
`

const MyPage = styled.span`
        display:flex;
        flex-direction: row;
        width: 100%;
        margin: 0 auto;
        background-color: white;
        font-family: 'CookieRun-Regular';
        text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;

        @media only screen and (max-width: 600px) {
            flex-direction: column;
        }
    `;

const AllBucket = styled.div`
        display:flex;
        margin: 0px;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        font-family: 'CookieRun-Regular';

        @media only screen and (max-width: 600px) {
            margin-left: 110px;
        }
`;

const BucketList = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 10px;
        width: 100%;
        font-family: 'CookieRun-Regular';
`;

const Inputform = styled.div`
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
        font-family: 'CookieRun-Regular';

        @media only screen and (max-width: 600px) {
            flex-direction:column;
        }
`;

const Input = styled.input`
        width: 500px;
        height: 50px;
        margin: 10px;
        border-radius: 4px;
        border: 2px solid #BF78E4;
        font-size: 2rem;
        font-family: 'CookieRun-Regular';
        color: #BF78E4;
        text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;

        :focus {
            outline: none;
        }

        @media only screen and (max-width: 600px) {
            justify-content: center;
            margin: 0 auto;
            width: 360px;
            margin-bottom: 20px;
        }
`;

const AddButton = styled.button`
        width: 100px;
        height: 50px;
        margin: 10px;
        font-size: 1.3rem;
        cursor: pointer;
        border-radius: 4px;
        background-color: #BF78E4;
        border: 2px solid #BF78E4;
        transition: all 0.5s ease;
        font-family: 'CookieRun-Regular';
        color: white;
        text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
        
        :hover {
            transform: scale(1.2);
            color:#BF78E4;
            background-color: white;
        }

        @media only screen and (max-width: 600px) {
            justify-contetn: center;
            margin: 0 auto;
        }
`;

const ScrollBar = styled.div`
        width: 600px;
        height:600px;
        border: 10px;

        overflow: scroll;
        overflow-x: hidden;
        -webkit-overflow-style: visible;
        &::-webkit-scrollbar {
            display: visible
        }
`;
const Loader = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 120px;
    height: 120px;
    margin: -76px 0 0 -76px;
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #BF78E4;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Div = styled.div`
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        width: 120px;
        height: 120px;
        margin: 80px 0 0 -76px;
        font-weight: bold;
`

const BackButton = styled.button`
    -webkit-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    -moz-transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    transition: all 0.8s cubic-bezier(0.390, 0.500, 0.150, 1.360);
    max-width: 180px;
    text-decoration: none;
    border-radius: 30px;
    border-color: #BF78E4;
    background-color: white;
    padding: 10px 30px;
    margin: 10px;
    font-family: 'CookieRun-Regular';
    color: #BF78E4;
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;

    :hover {
        color: rgba(255, 255, 255, 0.85);
        background-color: #BF78E4;
	    box-shadow: rgba(30, 22, 54, 0.7) 0 0px 0px 40px inset;
        text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
    }
`;

const Nav = styled.nav`
    display: flex;
    flex-direction: reverse;
    font-family: 'CookieRun-Regular';
    text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
`;

const MyBucketListPage = ({ userInfo, addInfo }) => {
    const [desc, setDesc] = useState('')
    const [objlist, setObjList] = useState([{}])
    const [isChecked, setIsChecked] = useState(false)
    const [render, setRender] = useState(true)
    const [allBucket, setAllbucket] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory()

    if (typeof (userInfo.nickname) !== 'string') {
        addInfo(JSON.parse(localStorage.getItem("info")))
    }
    useEffect(() => {
        axios.get("http://localhost:80/bucket", {
            headers: {
                "sns": "google",
                "Content-Type": "application/json",
                "authorization": `Bearer ${userInfo.google}`
            },
            withCredentials: true
        }).then(res => {
            const newObjlist = []
            res.data.user.bucketlist.map(el => {
                newObjlist.push(el)
            })
            setObjList(newObjlist)
        })
    }, [render])

    useEffect(() => {
        axios.get("http://localhost:80/bucket", {
            headers: {
                "sns": "google",
                "Content-Type": "application/json",
                "authorization": `Bearer ${userInfo.google}`
            },
            withCredentials: true
        }).then(res => {
            const newObjlist = []
            res.data.user.bucketlist.map(el => {
                newObjlist.push(el)
            })

            setObjList(newObjlist)
            setIsLoading(false)
        })
    }, [])

    const addBucketListBtn = () => {
        if (desc.length === 0) {
            return alert("버킷리스트 작성해주세요")
        } else {
            axios.patch("http://localhost:80/bucket/add", {
                id: Date.now(),
                nickName: userInfo.nickname,
                bucketName: desc,
                isChecked: isChecked
            }, {
                headers: {
                    "sns": "google",
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${userInfo.google}`
                },
                withCredentials: true
            }).then(res => {
                const bb = [...objlist]
                bb.push(res.data)
                setObjList(bb)
                setDesc('')
                setRender(!render)
                setAllbucket(!allBucket)
                document.querySelector('input').value = ''
            })
        }
    }

    const renderDelete = () => {
        setRender(!render)
    }

    console.log(objlist)
    return (
        <>
        <Global/>
            {isLoading ? <div><Loader /><Div>잠시만 기다려주세요.</Div></div> : 
            <>
            <Nav>
                <BackButton onClick={() => history.push('/main')}>메인 화면</BackButton>
            </Nav>
            <Screen1>
                <Inputform>
                    <Input type='text' onChange={(e) => setDesc(e.target.value)} />
                    <AddButton onClick={addBucketListBtn}>버킷 추가</AddButton>
                </Inputform>

                <MyPage>
                    <BucketList>
                        <div>
                            <Text>나의 버킷리스트</Text>
                            <ScrollBar>
                                {objlist.filter(el => el.id !== undefined)
                                    .map((list) => <MyBucketList key={list.id} description={list.bucketName}
                                        id={list.id} isChecked={list.isChecked} userInfo={userInfo} renderDelete={renderDelete} />)}
                            </ScrollBar>
                        </div>
                    </BucketList>

                    <AllBucket>
                    <div>
                        <AllText>모든 사용자들의 버킷리스트</AllText>
                        <ScrollBar><AllBucketList render={render} /></ScrollBar>
                        </div>
                    </AllBucket>
                </MyPage> 
                </Screen1>
                </>
            }
        </>
    );
};

function mapStateToProps(state) {
    return { userInfo: state }
}

function mapDispatchToProps(dispatch) {
    return { addInfo: (info) => { dispatch(actionCreators.addInfo(info)) } }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyBucketListPage);