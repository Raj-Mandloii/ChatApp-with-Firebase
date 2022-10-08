import { collection, query, getDocs, where, setDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext"
import { useContext } from 'react';
export const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext)

  const handleSeach = async () => {
    try {
      const q = query(collection(db, "users"), where("displayName", "===", username))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data)
      });
    } catch (e) {
      setErr(true)
    }
  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSeach();
  }

  const handleSelect = async () => {
    // 1st check the chat between 2 people exist or not if not 
    // then create else open it..!
    const combinedId = currentUser.uid > user.uid ? currentUser + user.uid : user.uid + currentUser.uid;
    try {
      const res = await getDocs(db, "chats", combinedId)
      if (!res.exists()) {
        await setDoc(doc, (db, "chats", combinedId), {
          messages: []
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,

            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })
      }

    } catch (e) {

    }
  }
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text"
          placeholder='Find a user'
          onChange={e => setUsername(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span>User Not Found</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}
