import React from 'react';
import { EditorHeader, Editor } from '@/components/index';
import useEditor from '@/hooks/useEditor';
import Head from 'next/head';

const MarkdownEditor = () => {
    const { articleDetails, handleValueChange, isDiasbled,
        isUnsplashVisible, toggleUnsplash, unsplashSearch, togglePublishing, isPublishing, addTag, removeTag,
        getUnsplashTerm, insertMarkdown, getUnSplashUrl, changeRoute,
        updateArticleInFirebase, isvisible, toggleVisible } = useEditor()

    return (
        <>
            <Head>
                <title>Editing Article on chatter</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <meta name="description" content={`Editing "${articleDetails.title}"`} />
            </Head>
            <EditorHeader
                isvisible={isvisible}
                handleVisible={toggleVisible}
                changeRoute={changeRoute}
                togglePublishing={togglePublishing}
              />
            <Editor
                isvisible={isvisible}
                handleVisible={toggleVisible}
                articleDetails={articleDetails}
                isUnsplashVisible={isUnsplashVisible}
                toggleUnsplash={toggleUnsplash}
                unsplashSearch={unsplashSearch}
                getUnsplashTerm={getUnsplashTerm}
                handleValueChange={handleValueChange}
                insertMarkdown={insertMarkdown}
                getUnSplashUrl={getUnSplashUrl}
                togglePublishing={togglePublishing}
                removeTag={removeTag}
                isPublishing={isPublishing}
                addTag={addTag}
                publishArticle={updateArticleInFirebase} 
                isDiasbled={isDiasbled}
            />
        </>
    );
};
export default MarkdownEditor;
