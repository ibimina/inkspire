import React from 'react';
import { EditorHeader, Editor } from '@/components/index';
import useEditor from '@/hooks/useEditor';
import Head from 'next/head';

const MarkdownEditor = () => {
  
    const { articleDetails, handleValueChange, changeRoute, togglePublishing,isPublishing,isDiasbled,
        isUnsplashVisible, toggleUnsplash, unsplashSearch, isvisible, toggleVisible, removeTag, addTag,
        getUnsplashTerm, insertMarkdown, getUnSplashUrl, updateArticleInFirebase } = useEditor()

   
    return (
        <>
        <Head>
                <title>Edit on InkSpire</title>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="IE=7" />
                <meta name="description" content={`Editing "${articleDetails.title}"`} />
        </Head>
            <main>
                <EditorHeader
                    changeRoute={changeRoute}
                    isvisible={isvisible}
                    handleVisible={toggleVisible}
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
            </main>
        </>
      
    );
};
export default MarkdownEditor;
