import { Header } from "@/components";
import Image from "next/image";
import { Key, useEffect, useState } from "react";
import Head from "next/head";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useCurrentUserState } from "@/store/user.store";


function User() {
    const [addTag, setAddTag] = useState('')
    const [success, setSuccess] = useState(false)
    const { currentUser } = useCurrentUserState()
    //create a usestate for form and social links
    const [form, setForm] = useState({
      ...currentUser
        
    })

    // useEffect(() => {
    //     setForm(state.user)
    // }, [state?.user])
    const updateInfo = async (e: React.FormEvent) => {
        e.preventDefault()
        let errorLinks = []

        // if (form.twitter.startsWith("https://twitter.com/") || form.twitter === "" || form.twitter.startsWith("https://www.twitter.com/")) {
        //     dispatch({ type: "TWITTER", payload: form.twitter })
        // } else {
        //     errorLinks.push(form.twitter)
        // }
        // if (form.linkedin.startsWith("https://linkedin.com/in/") || form.linkedin === "" || form.linkedin.startsWith("https://www.linkedin.com/in/")) {
        //     dispatch({ type: "LINKEDIN", payload: form.linkedin })
        // } else {
        //     errorLinks.push(form.linkedin)
        // } if (form.youtube.startsWith("https://youtube.com/") || form.youtube === "" || form.youtube.startsWith("https://www.youtube.com/")) {
        //     dispatch({ type: "YOUTUBE", payload: form.youtube })
        // } else {
        //     errorLinks.push(form.linkedin)
        // } if (form.website.startsWith("https://") || form.website === "" || form.website.startsWith("https://www.")) {
        //     dispatch({ type: "WEBSITE", payload: form.website })
        // } else {
        //     errorLinks.push(form.website)
        // } if (form.instagram.startsWith("https://instagram.com/") || form.instagram === "" || form.instagram.startsWith("https://www.instagram.com/")) {
        //     dispatch({ type: "INSTAGRAM", payload: form.instagram })
        // } else {
        //     errorLinks.push(form.instagram)
        // } if (form.github.startsWith("https://github.com/") || form.github === "" || form.github.startsWith("https://www.github.com/")) {
        //     dispatch({ type: "GITHUB", payload: form.github })
        // } else {
        //     errorLinks.push(form.github)
        // }
        // if (errorLinks.length > 0) {
        //     alert(`The following links are not valid: ${errorLinks.join(", ")}`)
        //     return
        // } else {
        //     const { user } = state
        //     //update user name and image in user     
        //     // const userRef = doc(firebaseStore, 'users', state?.user?.uid);
        //     // await setDoc(userRef, { ...user }, { merge: true });
        //     // //update user name and image in article and comments
        //     // await updateInArticles()
        //     // //update user name and image in notification
        //     // await updateInNotification()
        //     // //update user name and image in following
        //     // await updateUserFollowing()
        //     // //update user name and image in followers
        //     // await updateFollowers()
        //     // //update user name and image in chats
        //     // await updateInChats()
        // }
        setSuccess(true)
    }

    const updateInput = (e: React.ChangeEvent, action: string, value: string) => {
        setForm({ ...form, [action]: value })
    }
    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        // const uploadpath = `thumbnails/profile/${firebaseAuth.currentUser?.uid}/${file.name}`
        // const storageRef = ref(firebaseStorage, uploadpath)
        // await uploadBytes(storageRef, file)
        // const photoUrl = await getDownloadURL(storageRef)
        // dispatch({ type: "PHOTO", payload: photoUrl })
    }
    useEffect(() => {
        if (success) setInterval(() => setSuccess(false), 6000)
    }, [success])

    return (<>
        <Head>
            <title>Change settings  on InkSpire</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="IE=7" />
            <meta name="description" content={`Update user profile details`} />
        </Head>
        <Header handleNav={function (): void {
            throw new Error("Function not implemented.");
        }} />

        <form className="bg-slate-50 mt-4 px-8 py-4 relative" onSubmit={updateInfo}>
            {
                success &&
                <p className="bg-green-500 text-white absolute  bottom-1/4 right-1 px-3 py-4 rounded">Profile update successfully</p>

            }
            <div className="grid lg:grid-cols-2 gap-8">
                <div>
                    <p className="font-bold text-4xl mb-4">Basic info</p>
                    <label className="block mb-4">
                        <span className="block">Full name</span>
                        <input type="text" placeholder="Enter your full name" value={form.username ?? ""}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            className="block w-full rounded-lg py-3 px-2" />
                    </label>
                    <label className="block mb-4">
                        <span className="block">Profile Tagline</span>
                        <input type="text" placeholder="What's your tagline e.g Frontend developer"
                            onChange={(e) => setForm({ ...form, profile_tagline: e.target.value })}
                            value={form?.profile_tagline} className="block w-full rounded-lg py-3 px-2" />
                    </label>
                    <div className="mb-4">
                        <p className="mb-2">Profile Photo</p>
                        {
                            form?.profile_image ?
                                <div className="relative">
                                    <button
                                        onClick={() => setForm({ ...form, profile_image: '' })}
                                        className={`absolute top-1 cursor-pointer left-28 w-7 h-7 bg-no-repeat bg-delete-icon`}>
                                    </button>
                                    <Image className=" rounded-full" src={form.profile_image} width={150} height={100} alt={form?.username ?? "anynonmous"} />
                                </div> :
                                <label className="inline-block w-max h-min">
                                    <input type="file" className="appearance-none w-0 h-0" onChange={uploadImage} />
                                    <div className="w-40 h-40 rounded-full cursor-pointer bg-slate-200 flex items-center justify-center">
                                        <span className="">upload photo</span>
                                    </div>
                                </label>
                        }
                    </div>

                    <label className="block mb-4">
                        <span className="block">location</span>
                        <input type="text" placeholder="Location"
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            value={form.location} className="block w-full rounded-lg py-3 px-2" />
                    </label>
                    <label className="block mb-2">
                        <span className="block">About you</span>
                        <span className="block">Profile Bio</span>
                        <input type="text" placeholder="bio"
                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            value={form.bio} className="block w-full rounded-lg py-3 px-2" />
                    </label>

                    <label className="block mb-4">
                        <span className="block">Topics</span>
                        <div className="flex items-center gap-4">
                            <input type="text" placeholder="Add more topics" value={addTag} onChange={(e) => setAddTag(e.target.value)}
                                className="block w-9/12 rounded-lg py-3 px-2" />
                            <button
                                className="bg-violet-900 text-white py-2 px-6 rounded-2xl"
                                onClick={() => {
                                    // if (addTag?.trim().length > 2 && !currentUser?.topics.includes(addTag)) {
                                    //     dispatch({ type: "ADDTAG", payload: addTag })
                                    //     setAddTag('')
                                    // }
                                }}>add</button>
                        </div>

                    </label>
                    <ul className="flex items-center gap-2 flex-wrap mt-8">
                        {currentUser &&
                            form?.interested_topics?.map((doc: { title: string }, index: Key) =>
                                <li key={index} className="bg-violet-200 p-2 rounded-sm text-current flex items-center gap-3">
                                    <p className="">
                                        {doc.title}
                                    </p>
                                    <button className="bg-no-repeat bg-center w-3 h-3 bg-close-icon cursor-pointer"
                                     onClick={() => {
                                        // dispatch({ type: "REMOVETAG", payload: doc })
                                    }}></button>
                                </li>
                            )}
                    </ul>
                </div>
                <div>

                    <p className="font-bold text-4xl mb-4">Social</p>
                    <label className="block mb-4">
                        <span>Twitter</span>
                        <input type="text" placeholder="https://twitter.com/@username"
                            onChange={(e) => { updateInput(e, "twitter_url", e.target.value) }}
                            value={form.twitter_url} className="block w-full rounded-lg py-3 px-2" />
                    </label>
                    <label className="block mb-4">
                        <span>Linkedin</span>
                        <input type="text" placeholder="https://www.linkedin.com/in/username"
                            onChange={(e) => updateInput(e, "linkedin_url", e.target.value)}
                            value={form.linkedin_url} className="block w-full rounded-lg py-3 px-2" />
                    </label>
                    <label className="block mb-4">
                        <span>Facebook</span>
                        <input type="text" placeholder="https://www.facebook.com/username"
                            onChange={(e) => updateInput(e, "facebook_url", e.target.value)}
                            value={form.facebook_url} className="block w-full rounded-lg py-3 px-2" />
                    </label>
                    <label className="block mb-4">
                        <span>Instagram</span>
                        <input type="text" placeholder="https://www.instagram.com/username" onChange={(e) => updateInput(e, "instagram_url", e.target.value)} value={form.instagram_url} className="block w-full rounded-lg py-3 px-2" />
                    </label>
                    <label className="block mb-4">
                        <span>Github</span>
                        <input type="text" placeholder="https://www.github.com/username" onChange={(e) => updateInput(e, "github_url", e.target.value)} value={form.github_url} className="block w-full rounded-lg py-3 px-2" />
                    </label>
                    <label className="block mb-4">
                        <span>Website</span>
                        <input type="text" placeholder="https://www.ibimina-hart.com" onChange={(e) => updateInput(e, "website_url", e.target.value)} value={form.website_url} className="block w-full rounded-lg py-3 px-2" />
                    </label>
                    <label className="block mb-2">
                        <span>Youtube</span>
                        <input type="text" placeholder="https://www.youtube.com/ibimina-hart" onChange={(e) => updateInput(e, "youtube_url", e.target.value)} value={form.youtube_url} className="block w-full rounded-lg py-3 px-2" />
                    </label>
                </div>
            </div>
            <input type="submit" className="bg-gradient-to-br from-purple-700 to-blue-400 cursor-pointer text-white py-2 px-4 rounded-xl mt-8 block lg:ml-auto" value="Update" />
        </form>
    </>);
}

export default User;