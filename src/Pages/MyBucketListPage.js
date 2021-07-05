import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MyBucketList from '../components/Bucket/MyBucketList';

const MyBucketListPage = () => {
    const [desc, setDesc] = useState('')
    const [objlist, setObjList] = useState([{}])
    const [isChecked, setIsChecked] = useState(false)

    // 기존에 있던 리스트를 요청. 왜냐면 사용자의 버킷리스트를 화면에 흩뿌려줘야하니까..
    // useEffect 두번째인자에 빈배열을 넣어줘서 무조건 한번 렌더링되게 만들어줌.
    // get요청
    useEffect(() => {
        if(objlist[0] !== undefined) {
        axios.get("http://localhost:3001/add", {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then(res => {
            const newObjlist = [...objlist]
            {
                res.data.map(el => {
                    newObjlist.push(el)
                })
            }
            setObjList(newObjlist)
        })}
    }, [])

    const addBucketListBtn = () => {
        if (desc.length === 0) {
            return alert("버킷리스트 작성해주세요")
        } else {
        axios.post("http://localhost:3001/add", {
            id: Date.now(),
            nickName: '세팅모달에서 받아와야함',
            bucketName: desc,
            isChecked: isChecked
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then(res => {
            const bb = [...objlist]
            bb.push(res.data)
            setObjList(bb)
            setDesc('')
            document.querySelector('input').value = ''
        })
        }
    }
    return (
        <div>
            <input onChange={(e) => setDesc(e.target.value)} />
            <button onClick={addBucketListBtn}>버킷추가버튼</button>
            <ul>{objlist.filter(el => el.id !== undefined)
            .map((list, i) => <MyBucketList key={i} description={list.bucketName} id={list.id} isChecked={list.isChecked}/>)}
            </ul>
        </div>
    );
};

export default MyBucketListPage;