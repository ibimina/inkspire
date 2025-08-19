import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/chatter.module.css';
import { Header } from '@/components/index';
import Link from 'next/link';
import { useRouter } from 'next/router';

function FeedLayout({ children }: { children: React.ReactNode }) {
    const [isvisible, seIsVisible] = useState(false);
    const router = useRouter();
    const handleNav = () => {
        seIsVisible(!isvisible);
    };
    const access = typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;


    return (
        <>
            {
                access === null ?
                    <>
                        <header className={`flex items-center justify-between p-2 bg-white shadow-md`}>
                            <div className={`flex items-center gap-2`}>
                                <h1 className={`font-bold text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-br  from-purple-700 to-blue-400 `}>InkSpire</h1>
                            </div>
                            <div className={`flex items-center gap-3`}>
                                <Link href='/' className={`text-violet-500 font-medium `}>
                                    Login
                                </Link>
                                <Link href='/signup'>
                                    <button className={` bg-violet-700 text-white px-4 py-2 rounded-md hover:bg-black`}>Signup</button>
                                </Link>
                            </div>
                        </header>
                    </>
                    :
                    <Header handleNav={handleNav} />
            }



            {/* the main section that displays the feed and the sidebar */}
            <section
                className={`relative md:flex md:gap-4 p-4  lg:items-start mt-4`}>
                <aside className={` ${styles.aside} md:w-full  lg:w-3/12`} data-visible={isvisible}>
                    <ul className={`h-full w-9/12 lg:w-full pl-4  lg:p-5 pt-12 md:w-5/12 bg-gray-100 lg:rounded-xl ${styles.ul}`}>
                        {
                            access === null ?
                                <>
                                    <div className='mb-3'>
                                        <h2 className="text-xl font-semibold">Sign Up Now! </h2>
                                        <h3 className="text-sm font-semibold">Unlock More Features</h3>
                                    </div>
                                    <div className="grid gap-1">
                                        <div className="px-2 py-4 border-b-2 border-b-slate-300">
                                            <h3 className="text-lg font-semibold mb-1">Personalized feeds</h3>
                                            <p className=' text-sm'>Get access to personalized bookmarks and curated feeds..</p>
                                        </div>
                                        <div className="px-2 py-4 border-b-2 border-b-slate-300">
                                            <h3 className="text-lg font-semibold mb-1">Bookmark Your Favorites</h3>
                                            <p className=' text-sm'>Never lose track of your favorite articles. Save them to your bookmarks for easy access.</p>
                                        </div>
                                        <div className="px-2 py-4 border-b-2 border-b-slate-300">
                                            <h3 className="text-lg font-semibold mb-1">Explore New Content</h3>
                                            <p className=' text-sm'>Discover a wide range of articles and expand your knowledge with our diverse selection.</p>

                                        </div>
                                        <a href="#" className=" bg-gradient-to-br  from-purple-700 to-blue-400 text-white text-center px-4 py-2 rounded-md mt-4 inline-block">Sign Up</a>
                                    </div>

                                </>
                                : <>
                                    <li className={`mb-3 font-medium hover:scale-105`}>
                                        <Link href='/chatter' className={`flex items-center gap-2 hover:text-blue-500`}>
                                            <Image
                                                src='/images/icons8-home-48.png'
                                                height={44}
                                                width={34}
                                                alt='home'
                                            />
                                            Home
                                        </Link>
                                    </li>
                                    <li className={`mb-3 font-medium hover:scale-105`}>
                                        <Link href='/explore' className={`flex items-center gap-2 hover:text-blue-500`}>
                                            <Image
                                                src='/images/icons8-explore-48.png'
                                                height={44}
                                                width={34}
                                                alt='explore'
                                            />
                                            Explore
                                        </Link>
                                    </li>
                                    <li className={`mb-3 font-medium hover:scale-105`}>
                                        <Link href='/post' className={`flex items-center gap-2 hover:text-blue-500`}>
                                            <Image
                                                src='/images/icons8-article.svg'
                                                height={44}
                                                width={34}
                                                alt='articles'
                                            />
                                            My article
                                        </Link>
                                    </li>
                                    <li className={`flex items-center gap-1 mb-3 font-medium hover:scale-105`}>
                                        <Link href='/post' className={`flex items-center gap-2 hover:text-blue-500`}>
                                            <Image
                                                src='/images/icons8-article-50.png'
                                                height={34}
                                                width={34}
                                                alt='draft'
                                            />
                                            Drafts
                                        </Link>
                                    </li>
                                    <li className={`mb-3 font-medium hover:scale-105`}>
                                        <Link href='/bookmarks' className={`flex items-center gap-2 hover:text-blue-500`}>
                                            <Image
                                                src='/images/icons8-bookmark-64.png'
                                                height={24}
                                                width={34}
                                                alt='bookmark'
                                            />
                                            Bookmarks
                                        </Link>
                                    </li>
                                    <li className={`font-medium hover:scale-105 `}>
                                        <Link href='/messages' className={`flex items-center gap-2 hover:text-blue-500`}>
                                            <Image
                                                src='/images/icons8-message-50.png'
                                                height={44}
                                                width={34}
                                                alt='message'
                                            />
                                            Message

                                        </Link>

                                    </li>
                                </>
                        }
                    </ul>
                    <button
                        aria-label='close'
                        className={` top-1 brightness-100 invert right-2 absolute lg:hidden ${styles.close}`}
                        onClick={() => seIsVisible(!isvisible)}></button>
                </aside>
                {children}
            </section >
        </>
    );
}
export default FeedLayout;
