// import firestore from '@react-native-firebase/firestore';

// const updateProfit = async (adminEmail: string, profitChange: number) => {
//   try {
//     const userDocRef = firestore().collection('users').doc(adminEmail);

//     const userDoc = await userDocRef.get();
    
//     if (userDoc.exists) {
//       const currentProfit = userDoc.data()?.profit || 0;
//       await userDocRef.update({
//         profit: currentProfit + profitChange
//       });
//       console.log('Profit updated successfully');
//     } else {
//       console.log('User not found');
//     }
//   } catch (error) {
//     console.error('Error updating profit:', error);
//   }
// };
