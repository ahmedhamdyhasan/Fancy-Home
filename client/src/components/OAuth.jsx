
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { signInSuccess } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

const OAuth = () => {
const dispatch = useDispatch()
const handleGoogleClick=async ()=>{
try {
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const result = await signInWithPopup(auth,provider)
const res = await fetch('api/auth/google',{
    method:"POST",
    headers:{
        "Content-type": "application/json",
    },body:JSON.stringify({
        name:result.user.displayName,email:result.user.email,photo:result.user.photoURL
    })
})
 const data = res.json( )
 dispatch(signInSuccess(data))
} catch (error) {
    console.log(error)
}
}

  return (
    <button onClick={handleGoogleClick} type="button" className=" bg-red-700 p-3 text-white rounded-lg uppercase hover:opacity-95">
      continue with google
    </button>
  );
};

export default OAuth;
