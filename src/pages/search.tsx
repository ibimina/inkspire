import { ArticleCard } from "@/components";
import FeedLayout from "@/container/feedslayout";
import { queryClient } from "@/context/tanstack-provider";
import { useBookmarkArticle } from "@/services/bookmark.service";
import { getSearchRequest } from "@/services/user.service";
import { ArticleProps, } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { Key, useEffect, useState } from "react";
import { toast } from "react-toastify";


function Search() {

   const [searchString, setSearchString] = useState("")
    const [coll, setColl] = useState('articles')
    const [searchResults, setSearchResults] = useState<any>();


    const { mutate, isPending } = useMutation({
        mutationFn: getSearchRequest,
        onSuccess: async (response) => {
            setSearchResults(response.data);
        },
        onError: (error: AxiosError) => {
            toast.error('An error occurred'), console.error(error);
        },
    });

       const { mutate: handleBookmark } = useBookmarkArticle("user")

    useEffect(() => {
        if (searchString) {
            mutate(searchString)
        }
    }, [searchString])
    return (
        <>
            <Head>
                <title>InkSpire</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <meta name="description" content={`Search on InkSpire`} />
            </Head>
            <FeedLayout>
                <section className="p-5">
                    <form
                        onSubmit={() => setSearchString(searchString)}
                        className={`col-span-4 row-start-2 mt-5 lg:mt-0 lg:col-span-3 lg:row-start-1 lg:col-start-3`}
                    >
                        <input
                            className={`w-full p-2 rounded-xl border-2 border-slate-500`}
                            type='search'
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            placeholder='what would you like to read?'
                        />
                    </form>
                <div className={`flex items-center font-normal gap-3 `}>
                    <button className={`${coll === "articles" ? "border-b-4 border-violet-600" : ""} py-2`} onClick={() => setColl("articles")}>Top Articles</button>
                    <button className={`${coll === "topics" ? "border-b-4 border-violet-600" : ""} p-2`} onClick={() => setColl("topics")}>Topics</button>
                </div>
                <ul className="m max-w-2xl  mt-6">
                    {
                        isPending && <Loader2 className="w-10 h-10 mx-auto text-violet-600 animate-spin" />
                    }
                    {
                        coll === 'articles' && searchResults?.articles?.length > 0 &&
                        searchResults?.articles?.map((article: ArticleProps, index: Key) => {
                            return <ArticleCard key={index} feed={article}
                                update={handleBookmark} />
                        })

                    }
                    {
                        coll === 'articles' && searchResults?.articles?.length === 0 && !isPending &&
                        <p className="font-medium text-4xl text-center"> No Articles found</p>
                    }

                </ul>
                {
                    coll === 'topics' && searchResults?.topics?.length > 0 && searchResults?.topics?.map((topic: { id: Key, title: string; articles: any[]; }) => {
                        return <div key={topic.id} className="mb-2">
                            <h1 className="font-medium text-2xl">{topic?.title}</h1>
                            <Link className="text-xs text-slate-400" href={`/topic?q=${topic?.title}`}>{topic?.articles?.length} Article</Link>
                        </div>
                    })
                }
                {
                    coll === 'topics' && searchResults?.topics?.length === 0 && !isPending &&
                    <p className="font-medium text-4xl text-center">No Topics match</p>
                }

            </section>
            </FeedLayout>
           
        </>);
}

export default Search;
