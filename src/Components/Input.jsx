import React, { useContext } from 'react'
import openFile from "../assets/openFile.png"
import attach from "../assets/attach.png"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useState } from 'react';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from "uuid"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
export const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className='input'>
      <input type="text" placeholder='Type Something .....'
        onChange={e => setText(e.target.value)}
      />
      <div className="send">
        <img src={attach} alt="" />
        <input type="file" style={{ display: "none" }} id="file"
          onChange={e => setImg(e.target.value)}
        />
        <label htmlFor="file">
          <img src={openFile} alt=""

          />
        </label>
        <button onClick={handleSend}>Send</button>

      </div>

    </div>
  )
}
