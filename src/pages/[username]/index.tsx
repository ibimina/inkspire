import { Key, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import Head from "next/head";
import { useRouter } from "next/router";
import styles from '@/styles/editor.module.css'
import { ArticleCard, LinkIcon } from "@/components";
import FeedLayout from "@/container/feedslayout";
import { useGetUserById } from "@/services/user.service";
import { useCurrentUserState } from "@/store/user.store";
import { toast } from "react-toastify";
import { followRequest } from "@/services/follow.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { addUserTopicsReq } from "@/services/topic.service";
import { useBookmarkArticle } from "@/services/bookmark.service";


function ViewProfile() {
    const router = useRouter();
    const username = router.query.username
    const [viewFollowers, setViewFollowers] = useState(false)
    const [viewFollowing, setViewFollowing] = useState(false)
    const [viewTopic, setIsViewTopic] = useState(false)
    const { currentUser } = useCurrentUserState();
    const { user } = useGetUserById(username as string);
    const { mutate, isPending } = useBookmarkArticle("user")
    const queryClient = useQueryClient();


    const { mutate: handelFollow, isPending: pending } = useMutation({
            mutationFn: followRequest,
            onSuccess: async (response) => {
                toast.success(response.data.message);
                queryClient.invalidateQueries({ queryKey: ["user"] });
            },
            onError: (error: AxiosError) => {
                toast.error('An error occurred'), console.error(error);
            },
    });
    
       const { mutate: handelTopic, isPending: topicPending } = useMutation({
            mutationFn: addUserTopicsReq,
            onSuccess: async (response) => {
                toast.success(response.data.message);
                queryClient.invalidateQueries({ queryKey: ["user"] });
            },
            onError: (error: AxiosError) => {
                toast.error('An error occurred'), console.error(error);
            },
       });

    return (<>
        <Head>
            <title>{`${user?.username} profile`}</title>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="IE=7" />
            <meta name="description" content="" />
        </Head>
        <FeedLayout>
            <main className={` md:w-8/12 mx-auto `}>
                <div className="flex items-center mb-6 gap-4">
                    <button
                        // onClick={handleRoute}
                        className={`${styles.back} cursor-pointer lg:hidden`}
                        aria-label='menu'
                    ></button>

                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center mb-6 gap-4">
                        <Image src={user?.profile_image || "/images/icons8-user.svg"} alt={`${user?.username}`} width={150} height={150} className="rounded-full" />
                        <div>
                            <div className="mb-4">
                                <p className="font-bold text-3xl capitalize">{user?.username}</p>
                                <p>{user?.username}</p>
                                <p>{user?.profile_tagline}</p>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <p className="font-semibold flex items-center flex-col md:flex-col">{user.articles_count} <span>article{user.articles_count > 1 ? "s" : ""}</span> </p>
                                <button onClick={() => setViewFollowers(!viewFollowers)} className="font-semibold flex items-center flex-col md:flex-col">{user?.followers_count} <span>follower{user?.followers_count > 1 ? "s" : ""}</span> </button>
                                <button onClick={() => setViewFollowing(!viewFollowing)} className="font-semibold flex items-center flex-col md:flex-col">{user?.following_count} <span>following</span> </button>
                            </div>
                        </div>
                    </div>
                    {viewFollowers &&
                        <div onClick={() => setViewFollowers(!viewFollowers)} className="fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-50 flex items-center justify-center">
                            <div className="bg-gray-50 max-w-sm w-full px-4 py-2 rounded mx-4" >
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-current text-lg font-medium">Followers</p>
                                    <button onClick={() => setViewFollowers(!viewFollowers)} className="cursor-pointer bg-close-icon bg-no-repeat bg-center w-3 h-3 hover:bg-slate-200" title=""></button>
                                </div>
                                {user?.followers_count === 0 ? <p>No followers yet</p>
                                    : <ul>
                                        {user?.followers?.map((follower: any, index: Key) => {
                                            return (
                                                <div className="flex items-center justify-between mb-3" key={index}>
                                                    <div className="flex items-center gap-1">
                                                        <Image className="rounded-full" src={follower.profile_image ? follower.profile_image : "/images/icons8-user-64.png"} height={24} width={24} alt="follower" />
                                                        <p className="text-gray-500">  {follower.username}</p>
                                                    </div>
                                                    {
                                                        currentUser?.id !== follower?.id ?
                                                            <button className="bg-slate-400 px-3 py-1 w-15"
                                                            onClick={() => handelFollow(follower.id)}
                                                            >
                                                                {`${(currentUser?.following?.some((f: {id: string }) => f.id === follower.id)) ? "following" : "follow"}`}
                                                            </button>
                                                            : ""
                                                    }
                                                </div>)
                                        })}
                                    </ul>
                                }
                            </div>
                        </div>
                    }
                    {viewFollowing &&
                        <div className="fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-50 flex items-center justify-center z-40">
                            <div className="bg-gray-50 max-w-sm w-full py-2 z-50  rounded mx-4" >
                                <div className="flex items-center justify-between px-3 mb-4">
                                    <p className="text-current text-lg font-medium">Following</p>
                                    <button onClick={() => setViewFollowing(!viewFollowing)} className="cursor-pointer bg-close-icon bg-no-repeat bg-center w-3 h-3 hover:bg-slate-200" title=""></button>
                                </div>
                                <div className="grid grid-cols-2 mb-4 items-center justify-between">
                                    <button onClick={() => setIsViewTopic(!viewTopic)} className={`p-2 border-b-2 ${!viewTopic ? " border-current" : "border-gray-300"}`}>People</button>
                                    <button onClick={() => setIsViewTopic(!viewTopic)} className={`p-2 border-b-2 ${viewTopic ? " border-current" : "border-gray-300"}`}>Topics</button>
                                </div>

                                {!viewTopic && user?.following_count > 0 &&
                                    <ul className="px-4">

                                        {user.following?.map((user: { username: string, profile_image: string, id: string }, index: Key) => {
                                            return (
                                                <div className="flex items-center justify-between mb-3" key={index}>

                                                    <div className="flex items-center gap-1">
                                                        <Image className="rounded-full" src={user?.profile_image ? user?.profile_image : "/images/icons8-user-64.png"} height={24} width={24} alt="like" />
                                                        <p className="text-gray-500">  {user?.username}</p>
                                                    </div>
                                                    {
                                                        currentUser?.id !== user.id &&
                                                        <button
                                                            onClick={() => handelFollow(user.id)}
                                                            className="bg-slate-400 px-3 py-1 w-15"
                                                        >
                                                            {`${(currentUser?.following?.some((f: { id: string }) => f.id === user.id)) ? "following" : "follow"}`}
                                                        </button>

                                                    }
                                                </div>
                                            )
                                        })
                                        }
                                    </ul>
                                }
                                {!viewTopic && user?.following_count === 0 && <p className="text-center mb-4">no following</p>}
                                {viewTopic && user?.interested_topics?.length === 0 && <p className="text-center mb-4">no topics</p>}

                                {viewTopic && user.interested_topics?.length > 0 &&
                                    <ul className="px-4">
                                        {
                                            user.interested_topics?.map((topic: any, index: Key) => {
                                                return (
                                                    <div key={index} className="flex items-center justify-between">
                                                        <Link className={`px-4 py-3 font-medium`} href={`/topic?q=${topic.title}`}>
                                                            <p>{topic.title}</p>
                                                            <p>{topic.count}</p>
                                                        </Link>
                                                        <button
                                                            onClick={() => handelTopic(topic.id)}
                                                            className="bg-slate-400 px-3 py-1 w-15">
                                                            {`${currentUser?.interested_topics?.includes(topic.title) ? "following" : "follow"}`}</button>
                                                    </div>)
                                            })}
                                    </ul>
                                }
                            </div>
                        </div>
                    }

                    <div className="flex gap-1 items-center mb-3 lg:mb-0">

                        {
                           currentUser.id === user.id &&
                            <Link href="/settings" className="bg-violet-900 text-white py-1 px-6 rounded-2xl w-max">Edit</Link>
                        }
                        {
                            currentUser.id !== user.id &&
                            <button
                                onClick={() => handelFollow(user.id )}
                                className="cursor-pointer bg-violet-700 text-white rounded-2xl px-4 py-2"
                            >
                                { currentUser.following?.some((f: { id: string }) => f.id === user.id)  ? "following" : "follow +"}
                            </button>
                        }
                        <button onClick={() => router.push(`/messages?q=${username}`)} className="cursor-pointer bg-slate-300 rounded-2xl px-4 py-2">
                            message
                        </button>
                    </div>

                </div>

                {/* add a button to click follow writer */}

                <div className="flex items-center gap-2 justify-center">
                    <LinkIcon src="/images/icons8-twitter.svg" alt="twitter" href={user?.twitter_url} />
                    <LinkIcon src="/images/icons8-facebook.svg" alt="facebook" href={user?.facebook_url} />
                    <LinkIcon src="/images/icons8-linkedin.svg" alt="linkedin" href={user?.linkedin_url} />
                    <LinkIcon src="/images/icons8-website-24.png" alt="website" href={user?.website_url} />
                    <LinkIcon src="/images/icons8-instagram.svg" alt="instagram" href={user?.instagram_url} />
                    <LinkIcon src="/images/icons8-youtube.svg" alt="youtube" href={user?.youtube_url} />
                    <LinkIcon src="/images/icons8-github.svg" alt="github" href={user?.github_url} />
                </div>
                <p>{user?.location}</p>

                <p>{user?.bio}</p>
                {
                   
                    <div className="mb-8">
                        <p className="my-3 font-medium">My Topics</p>
                        <ul className="flex items-center gap-2 flex-wrap">
                            {user?.interested_topics?.length > 0 ?
                                user?.interested_topics?.map((doc: { title: string }, index: Key) =>
                                    <>
                                        <li key={index} className="bg-violet-500 p-2 rounded-sm text-white">
                                            {doc.title}
                                        </li>
                                    </>
                                )
                                :
                                (
                                    <p className="text-center">No topics yet</p>
                                )
                            }
                        </ul>
                    </div>
                }
                <div>
                    <p className="font-semibold mb-3 text-3xl text-violet-900">Articles</p>
                    <ul>
                        {user.articles?.length > 0 ? user?.articles?.map((article: any, index: Key) =>
                            <ArticleCard key={index} feed={article}
                                update={mutate}
                            />
                        ) :
                            (
                                <p className="text-center">No articles yet</p>
                            )

                        }
                    </ul>
                </div>
            </main>

        </FeedLayout>
    </>);
}

export default ViewProfile;