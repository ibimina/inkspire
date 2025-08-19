import React from 'react';
import { EditorHeader, Editor } from '@/components/index';
import useEditor from '@/hooks/useEditor';
import Head from 'next/head';

const MarkdownEditor = () => {
    const { articleDetails, handleValueChange,
        isUnsplashVisible, toggleUnsplash,
        unsplashSearch, getUnsplashTerm, insertMarkdown, getUnSplashUrl,
        publishArticle, changeRoute, removeTag,isDiasbled,
        isvisible, toggleVisible, isPublishing, togglePublishing, addTag
    } = useEditor()
  

    return (
        <>
            <Head>
                <title>Create an Article  on InkSpire</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <meta name="description" content="Create a new Article" />
            </Head>
            <EditorHeader
                isvisible={isvisible}
                handleVisible={toggleVisible}
                changeRoute={changeRoute}
                togglePublishing={togglePublishing}
            />
            <Editor
                articleDetails={articleDetails}
                isvisible={isvisible}
                handleVisible={toggleVisible}
                isUnsplashVisible={isUnsplashVisible}
                toggleUnsplash={toggleUnsplash}
                unsplashSearch={unsplashSearch}
                getUnsplashTerm={getUnsplashTerm}
                handleValueChange={handleValueChange}
                insertMarkdown={insertMarkdown}
                getUnSplashUrl={getUnSplashUrl}
                publishArticle={publishArticle}
                isPublishing={isPublishing}
                togglePublishing={togglePublishing}
                addTag={addTag}
                removeTag={removeTag}
                isDiasbled={isDiasbled}
            />
        </>
    );
};
export default MarkdownEditor;
