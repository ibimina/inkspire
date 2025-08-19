import { ArticleCard } from "@/components";
import FeedLayout from "@/container/feedslayout";
import { useBookmarkArticle } from "@/services/bookmark.service";
import { addUserTopicsReq, useGetTopicByTitle } from "@/services/topic.service";
import { useCurrentUserState } from "@/store/user.store";
import { ArticleProps } from "@/types";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import { useRouter } from "next/router";

function S() {
    const router = useRouter();
    const { q } = router.query;
    const {currentUser} = useCurrentUserState()
    const { mutate: handleBookmark } = useBookmarkArticle("user")
    const { topic, isLoading, error } = useGetTopicByTitle(q as string);

    const handleFollow = async () => {
        addUserTopicsReq(topic?.id)
    }
if(isLoading){
    return(
        <Loader2 className="w-10 h-10 mx-auto text-violet-600 animate-spin" />
    )
}
    return (
        <>
            <Head>
                <title>#{q} on InkSpire</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <meta name="description" content={`Published articles that includes ${q} topic`} />
            </Head>
            <FeedLayout>
                <div className={`md:w-4/6`}>
                    <h1 className="font-bold text-2xl">{q}</h1>
                    <div className="flex items-center gap-2">
                        <div>
                            <p className="text-center font-medium">{topic?.articles?.length} </p>
                            <p>article{topic?.articles?.length > 1 ? "s" : ""}</p>

                        </div>
                        <div>
                            <p className="text-center font-medium">{topic?.interested_users?.length} </p>
                            <p>follower{topic?.interested_users?.length > 1 ? "s" : ""}</p>

                        </div>
                        <button onClick={handleFollow}>{currentUser.interested_topics.includes(topic?.id) ? "Unfollow" : "Follow +"}</button>
                    </div>

                    <ul className="p-4">
                        {
                            topic?.articles?.length > 0 &&
                            topic?.articles?.map((article: ArticleProps) => {
                                return <ArticleCard key={article.id} feed={article} update={handleBookmark} />
                            })
                        }
                    </ul>
                </div>

            </FeedLayout>
        </>);
}

export default S;