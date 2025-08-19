import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ArticleSide from "./articlesaside";
import LinkRenderer from "./linkrender";
import Buttons from "./markdownbutton";
import styles from "../styles/editor.module.css";
import Image from "next/image";
import { EmojiClickData } from "emoji-picker-react";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import { useCurrentUserState } from "@/store/user.store";

interface NewType {
    articleDetails: any;
    handleValueChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    insertMarkdown: (markdownSyntax: string) => void;
    unsplashSearch: string;
    getUnsplashTerm: (e: React.ChangeEvent<HTMLInputElement>) => void;
    getUnSplashUrl: (url: string) => void;
    isUnsplashVisible: boolean;
    toggleUnsplash: () => void;
    isvisible: boolean;
    handleVisible: (e: React.MouseEvent) => void;
    publishArticle: (e: React.MouseEvent) => void;
    isPublishing: boolean;
    togglePublishing: (e: React.MouseEvent) => void;
    addTag: (e: React.FormEvent) => void;
    removeTag: (tag: string) => void;
    isDiasbled: boolean;
}

function Editor({ unsplashSearch, isUnsplashVisible, isvisible, isDiasbled,
    toggleUnsplash, getUnsplashTerm, removeTag, isPublishing, togglePublishing,
    articleDetails, handleValueChange, insertMarkdown, getUnSplashUrl, handleVisible, publishArticle, addTag }: NewType) {

    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
    const [hide, setHide] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const router = useRouter();
    const { currentUser } = useCurrentUserState()
    const toggleEmojiPicker = () => {
        return setShowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiSelect = (emoji: EmojiClickData) => {
        setShowEmojiPicker(false);
        insertMarkdown(`${emoji.emoji} `);
    };

    const { fetchedData, getSearchData } = useFetch(unsplashSearch, page)
    const getPicturesFromUnsplash = async (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1)
        getSearchData()
    };

    const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if (scrollHeight - scrollTop === clientHeight) {
            setPage((page) => page + 1)
        }
    }

    useEffect(() => {
        if (router.pathname.includes("/edit") && currentUser?.id) {
            setHide(false)
        }
    }, [router.pathname, currentUser?.id])
    return (
        <>
            <main className={`lg:grid lg:grid-cols-9 gap-6 px-4 md:px-8 ${styles.editorGrid}`}>
                <ArticleSide isvisible={isvisible} handleVisible={handleVisible} />
                <section className={`col-start-3  ${styles.editSection}`} data-shrink={isvisible}>
                    {
                        articleDetails?.cover_image ?
                            <div className={`relative w-full h-96 mb-2`}>
                                <Image src={articleDetails?.cover_image} alt="cover image" fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,  33vw" />
                            </div>
                            : <button className={`mb-3 font-medium`}>Add cover image</button>
                    }
                    <div>
                        <div className={`relative`}>
                            {hide && <div className={`flex items-center mb-1 gap-2`}>
                                <button onClick={toggleUnsplash} className={`${styles.unsplash}`} >Unsplash</button>
                                <div data-visible={isUnsplashVisible} className={`${styles.unsplashDropdown} bg-gray-100 mt-3`} onScroll={onScroll}>
                                    <form onSubmit={getPicturesFromUnsplash} className="p-2">
                                        <input value={unsplashSearch} onChange={getUnsplashTerm} type="text"
                                            placeholder='Search Unsplash Image' className={`block w-full border-2 px-2 py-1 border-violet-200 rounded-lg`} />
                                    </form>
                                    <div className={`grid grid-cols-2 bg-gray-200`}>
                                        {fetchedData &&
                                            fetchedData.map((item, index) => {
                                                return <button key={index} className={`relative ${styles.imageContainer}`}
                                                    onClick={() => getUnSplashUrl(item?.urls?.regular)}>
                                                    <Image src={item?.urls?.full} fill sizes="(max-width: 768px) 100vw,
                                                (max-width: 1200px) 50vw,  33vw" className={`${styles.unsplashImage}`}
                                                        alt={item.alt_description} />
                                                    <span className={`absolute bottom-2 text-slate-200 `}>{item?.user?.name}</span>
                                                </button>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>}
                        </div>
                        {
                            hide ?
                                <textarea placeholder='Title' name="title" rows={1}
                                    value={articleDetails?.title} className={`block mb-2 w-full p-2`}
                                    onChange={handleValueChange} /> :
                                <h1 className={`font-bold text-3xl mb-4`}>{articleDetails?.title}</h1>

                        }
                        {
                            hide ?
                                <textarea placeholder='subtitle' name="subtitle" rows={1}
                                    value={articleDetails?.subtitle} className={`block mb-2 w-full p-2`}
                                    onChange={handleValueChange}
                                />
                                : <h2 className={`font-medium text-2xl mb-4`}>{articleDetails?.subtitle}</h2>
                        }

                        {hide && <Buttons
                            handleClick={insertMarkdown}
                            toggleEmojiPicker={toggleEmojiPicker}
                            showEmojiPicker={showEmojiPicker}
                            selectEmoji={handleEmojiSelect}
                        />}

                        <div className={`grid grid-cols-2 w-full gap-2 ${styles.markdownWrapper}`}>
                            {
                                hide && <div className={`w-full`}>
                                    <h1 className={`font-medium  max-w-max p-2 rounded-lg`}>Editor</h1>
                                    <textarea
                                        name="content"
                                        id="markdownTextarea"
                                        rows={10}
                                        value={articleDetails?.content}
                                        onChange={(e) => handleValueChange(e)}
                                        placeholder="Enter Markdown text"
                                        className={` ${styles.textarea} w-full p-3 border-2 border-solid border-current`}
                                    />
                                </div>

                            }
                            <div className={`${hide ? "col-span-1" : "col-span-2"}`}>
                                <div className={`flex items-center gap-2 mb-2`}>
                                    {hide && <h2 className={` font-medium  max-w-max p-2 rounded-lg`}>Preview</h2>}
                                    <button
                                        onClick={() => setHide(!hide)}
                                        className={`border-2 border-violet-400 font-medium
                                          max-w-max py-1 px-6 rounded-3xl`}>
                                        {hide && router ? "close" : "edit"}</button>
                                </div>

                                <ReactMarkdown remarkPlugins={[remarkGfm]}
                                    components={{ a: LinkRenderer }}
                                    className={` prose prose-headings:m-0 prose-p:mt-0 prose-p:mb-1 prose-li:m-0 prose-li:mb-1 prose-ol:m-0 prose-ul:m-0 prose-ul:leading-6
                            hr-black prose-hr:border-solid prose-hr:border prose-hr:border-black
                             marker:text-gray-400 ${styles['markdownPreview']}`} >
                                    {articleDetails?.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {
                isPublishing &&
                <div className={`fixed top-0 left-0 w-full h-full bg-slate-900 bg-opacity-50`}>
                    <div className={`bg-white p-4 w-full md:w-9/12  ml-auto h-full relative`}>
                        <div className="flex items-center justify-between mb-6">
                            <button className={`mb-2`} disabled={isDiasbled} onClick={togglePublishing}>Close</button>
                            <button className={`p-2 rounded-2xl ${isDiasbled ? "bg-gray-500 text-black" : "text-white bg-violet-700"}`} disabled={isDiasbled} onClick={publishArticle}> {`${isDiasbled ? "Publishing" : "Publish now"}`}</button>
                        </div>
                        <p className="mb-8">Add or change topics (up to 5) so readers know what your story is about</p>

                        <form
                            onSubmit={addTag}
                            className="flex items-center mb-2 gap-2 w-full"
                        >
                            <input type="text" name="tags" className="block p-2 border-2 w-9/12 border-gray border-solid rounded-md" />
                            <button type="submit" disabled={isDiasbled} className="bg-violet-500 cursor-pointer text-gray-100 p-2 rounded-md">Add</button>
                        </form>
                        <p className="mb-8">Topics are optional, but they help surface your story to the right readers</p>

                        <div className="flex items-center gap-3 flex-wrap">
                            {articleDetails?.topics && articleDetails?.topics?.length > 0 && articleDetails?.topics?.map((topic: string, index: number) => {
                                return <button onClick={() => removeTag(topic)} key={index} className={`bg-gray-300 flex items-center gap-2 p-2 rounded-xl`}>
                                    {topic}
                                    <Image src="/images/icons8-close.svg" width={15} height={15} alt="close" />
                                </button>
                            })}
                        </div>
                    </div>
                </div>
            }
        </>);
}

export default Editor;
