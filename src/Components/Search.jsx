import { collection, query, getDocs,getDoc, where, 
  setDoc, doc, updateDoc, 
  serverTimestamp } from 'firebase/firestore'
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

  const handleSearch = async () => {
    try {
      const q = query(collection(db, "users"), 
      where("displayName", "==", username))

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (e) {
      setErr(true)
    }
  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  }

  const handleSelect = async () => {
    // 1st check the chat between 2 people exist or not if not 
    // then create else open it..!
    const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
  try {
    const res = await getDoc(doc(db, "chats", combinedId));

    if (!res.exists()) {
      //create a chat in chats collection
      await setDoc(doc(db, "chats", combinedId), { messages: [] });

      //create user chats
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  } catch (err) {}

  setUser(null);
  setUsername("")
};
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type="text"
          placeholder='Find a user'
          value={username}
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
