import React, { useState } from 'react'
import img from "../assets/addImage.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate} from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [error, setErr] = useState(false)
    const handleSubmit = async (e) => {
        // setLoading(true);
        e.preventDefault();
        setLoading(true)
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

       try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/login");
          } catch (err) {
            // console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
      setLoading(false)
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };




    return (
        <div>
            <div className='formContainer'>

                <div className='formWrapper'>
                    <span className="logo">Chat With Firebase</span>
                    <span className="title">Register</span>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Display name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input style={{ display: "none" }} type="file" id="file" />
                        <label htmlFor='file'>
                            <img src={img} />
                            <span>Add An Avatar</span>
                        </label>
                        <button>{loading ? "... Loading" :"Sign Up"}</button>
                        {error && <span>Something went wrong</span>}
                    </form>
                    <p>If you don't have account ? <Link to={"/login"}>Log In</Link></p>

                </div>
            </div>
        </div>
    )
}
