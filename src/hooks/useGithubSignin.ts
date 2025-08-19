
const useGitHubSignin = () => {

    const github = async () => {
        // try {
        //     const result = await signInWithPopup(firebaseAuth, googleAuthProvider)
        //     const user = result.user;
        //     const docRef = doc(firebaseStore, "users", user.uid);
        //     const docSnap = await getDoc(docRef);
        //     if (docSnap.exists()) {
        //         dispatch(signIn(docSnap.data()))
        //         Cookies.set("loggedin", "true");
        //         router.push('/chatter');
        //     } else {
        //         const userInfo = {
        //             uid: user?.uid, displayName: user?.displayName, email: user?.email,
        //             profile_tagline: "", location: "",
        //             bio: "", twitter: "", github: "", instagram: "",
        //             website: "", linkedin: "", youtube: "", facebook: "", topics: [],
        //             photoURL: user?.photoURL
        //         }
        //         await setDoc(doc(firebaseStore, "users", user?.uid), userInfo);
        //         dispatch(signIn(userInfo))
        //         router.push('/add-topics');
        //         Cookies.set("loggedin", "true");
        //     }
        // } catch (error: any) {
        //     // Handle Errors here.
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     // The email of the user's account used.
        //     const email = error.customData.email;
        //     // The AuthCredential type that was used.
        //     // const credential = GoogleAuthProvider.credentialFromError(error);
        //     // ...
        // }
    }
    return { github }
}
export default useGitHubSignin