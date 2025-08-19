import FeedLayout from "@/container/feedslayout"
import styles from '../styles/tags.module.css'
import Head from "next/head";
import Link from "next/link";
import { addUserTopicsReq, useGetAllTopics } from "@/services/topic.service";
import { useCurrentUserState } from "@/store/user.store";

export default function Explore() {
    const { topics, isLoading } = useGetAllTopics()

const {currentUser} = useCurrentUserState()

    const addUserTopic = async (e: React.MouseEvent, tag: string) => {
        e.preventDefault();
        let addBtn = e.currentTarget.getAttribute('aria-pressed');
        if (addBtn === 'false') {
            e.currentTarget.setAttribute('aria-pressed', 'true');
      
        }
        else {
            e.currentTarget.setAttribute('aria-pressed', 'false');
    
        }
       await addUserTopicsReq(tag)
    }

    return (
        <>
            <Head>
                <title>Explore popular topics on InkSpire</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <meta name="description" content="Explore more topics" />
            </Head>
            <FeedLayout>
                <main className={`md:w-4/6`}>
                    <h1 className="font-medium text-lg mb-2">
                        Explore Tech Topics
                    </h1>
                    <p className="mb-4  font-serif">
                        Explore the most popular tech blogs from the community. A constantly updating list of popular tags and the best minds in tech.
                    </p>
                    <ul>
                        <li className="text-violet-700 font-serif font-normal text-lg">Trending Topics</li>
                    </ul>
                    <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-3 my-8`}>
                        {topics && topics.map((topic:{title: string, id:string}) =>
                            <div key={topic.title} className={`flex justify-between items-center bg-stone-200 hover:bg-zinc-300  cursor-pointer`} aria-selected='false'>
                                <Link className={`px-4 py-3 font-medium`} href={`/topic?q=${topic?.title}`}>{topic?.title} </Link>
                                <button
                                    onClick={(e) => addUserTopic(e, topic.id)}
                                    className={`bg-contain bg-no-repeat bg-center w-5 h-5 m-2 ${styles.add}`}
                                    aria-label="add tag"
                                    aria-pressed={currentUser.interested_topics.find(t => t.title.toLowerCase() === topic?.title.toLowerCase()) ? "true" : "false"}>
                                </button>

                            </div>
                        )}
                    </div>
                </main>
            </FeedLayout>
        </>
    );
}
