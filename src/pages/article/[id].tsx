import { Header } from "@/components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { TwitterShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";
import Head from "next/head";
import { useRouter } from "next/router";
import { useGetArticleById } from "@/services/article.service";


//generate meta tags for social media sharing server side

export async function getServerSideProps(context: any) {

    const id = context.query.id
    return {
        props: {
            metaData: {
                title: `InkSpire - Article ${id}`,
                description: `Read the article with ID ${id} on InkSpire`,
                image: `https://ibimina-chatter.vercel.app/api/articles/${id}/cover`,
                url: `https://ibimina-chatter.vercel.app/inkspire/${id}`
            },
            id
        }
    }
}




function Article({ metaData }: { metaData: any }) {
    const router = useRouter();
        const id = router.query.id

    const {         article: articleDetails,
        isLoading,
        error,} = useGetArticleById(id as string)


    const closeModal = (e: React.MouseEvent) => {
        e.preventDefault()
        const loader = document.querySelector(".loader")!
        loader.classList.add("hidden")
    }
 
    return (<>
        {
            articleDetails?.title && articleDetails.title.length > 2 &&
            <Head>
                <meta charSet="utf-8" />

                <title>{`${articleDetails?.title}`}</title>
                <meta name="description" content={articleDetails?.subtitle} />
                <meta property="og:title" content={`${articleDetails?.title}`} />
                <meta property="og:description" content={articleDetails?.subtitle} />
                <meta property="og:image" content={articleDetails?.cover_image} />
                <meta property="og:url" content={`https://ibimina-chatter.vercel.app/inkspire/${articleDetails?.id}`} />
                <meta property="og:site_name" content="InkSpire" />
                <meta property="og:type" content="website" />
                <meta property="og:image:width" content="1140" />
                <meta property="og:image:height" content="600" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@ibimina_" />
                <meta name="twitter:creator" content="@ibimina_" />
                <meta name="twitter:title" content={`${metaData?.title}`} />
                <meta name="twitter:description" content={articleDetails?.subtitle} />
                <meta name="twitter:image" content={articleDetails?.cover_image} />
                <meta name="twitter:image:alt" content={articleDetails?.title} />

            </Head>
        }
        {
            articleDetails?.title &&
            <div
                onClick={closeModal}
                className=" h-screen w-full fixed top-0 right-0 left-0 z-50 flex items-center justify-center loader ">

                <div
                    className="relative bg-slate-200 max-w-md w-11/12 mx-auto text-center p-3 z-50 rounded-xl shadow-2xl">
                    <button
                        className="absolute top-1 right-2 cursor-pointer w-5 h-5 bg-close-icon bg-no-repeat bg-center bg-contain"
                        onClick={closeModal}> <span className="sr-only">close</span></button>
                    <h1 className="mt-3 mb-4 font-medium">Congratulations on publishing a new article 🚀🚀🚀</h1>
                    <p className="text-sm mb-6">Share your article with friends and family</p>
                    <div>
                        <div className="grid grid-cols-3">
                            <button className="flex items-center gap-1 mb-4"
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://ibimina-chatter.vercel.app/${encodeURIComponent(articleDetails?.author.username)}/post/${articleDetails.id}`)
                                    alert("link copied")
                                }}>
                                <Image src="/images/icons8-link-gray-24.png" height={24} width={24} alt="whatsapp" />

                                Copy link
                            </button>
                            <TwitterShareButton className=" flex items-center gap-1 mb-4" url={`https://ibimina-chatter.vercel.app/${encodeURIComponent(articleDetails?.author.username)}/post/${articleDetails?.id}`} title={`${articleDetails?.title} by ${articleDetails?.author?.username}`} >
                                <Image src="/images/icons8-twitter.svg" height={24} width={24} alt="twitter" />
                                twitter
                            </TwitterShareButton>
                            <LinkedinShareButton className="flex items-center gap-1 mb-4" title={`${articleDetails?.title} by ${articleDetails?.author?.name}`} url={`https://ibimina-chatter.vercel.app/${encodeURIComponent(articleDetails?.author.username)}/post/${articleDetails?.id}`}>
                                <Image src="/images/icons8-linkedin.svg" height={24} width={24} alt="linkedin" />
                                linkedin
                            </LinkedinShareButton>
                            <WhatsappShareButton className="flex items-center gap-1" url={`https://ibimina-chatter.vercel.app/${encodeURIComponent(articleDetails?.author.username)}/post/${articleDetails?.id}`} title={`${articleDetails?.title} by ${articleDetails?.author?.name}`} separator=":: ">
                                <Image src="/images/icons8-whatsapp.svg" height={24} width={24} alt="whatsapp" />
                                whatsapp
                            </WhatsappShareButton>
                        </div>
                    </div>
                </div>
                <Image src="/images/giphy.gif" alt="loading" fill objectFit="cover" />
            </div>
        }
        <Header handleNav={function (): void {
            throw new Error("Function not implemented.");
        }} />
        <div className={`w-10/12 lg:w-9-12 mx-auto mb-4 mt-8`}>
            <div className={`flex items-center gap-2 mb-2`}>
                {
                    articleDetails?.cover_image ?
                        <div className={`relative w-full h-96 mb-2`}>
                            <Image src={articleDetails?.cover_image} alt="cover image" fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,  33vw" />
                        </div>
                        : ""
                }
            </div>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className={`prose max-w-none pose-headings:m-0 prose-p:my-0  prose-li:m-0 prose-ol:m-0 prose-ul:m-0 prose-ul:leading-6
                            hr-black prose-hr:border-solid prose-hr:border prose-hr:border-black
                             marker:text-gray-700  break-words whitespace-pre-wrap`}
            >
                {articleDetails?.content ?? ""}
            </ReactMarkdown>
        </div>
    </>);
}

export default Article;