// import React, { useState } from 'react';
// import { auth } from '../firebase';
// import {getFirestore} from "firebase/firestore"


// const SignIn = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     try {
//       await auth.signInWithEmailAndPassword(email, password);
//       alert('Signed in successfully');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <form onSubmit={handleSignIn}>
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       />
//       <button type="submit">Sign In</button>
//     </form>
//   );
// };

// export default SignIn;
