import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    // req.locals is a Map
    let verify = req.cookies.get("loggedin");
    let url = req.url

    if (!verify && url.includes('/settings') || !verify && url.includes('/chatter') || !verify && url.includes('/add-topics') || !verify && url.includes('/bookmarks') || !verify && url.includes('/explore') || !verify && url.includes('/post') || !verify && url.includes('/edit') || !verify && url.includes('/draft') || !verify && url.includes('/n') || !verify && url.includes('/notifications')|| !verify && url.includes('/search') || !verify && url.includes('/messages')) {
        let url = req.nextUrl.clone()
        url.pathname = '/'
        return NextResponse.redirect(url);
    }

    if (verify && req.nextUrl.pathname === '/' || verify && req.nextUrl.pathname === '/signup' || verify && req.nextUrl.pathname === '/forgotpassword' || verify && req.nextUrl.pathname === '/resetpassword') {
        let url = req.nextUrl.clone()
        url.pathname = '/chatter'
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/','/bookmarks', '/chatter', '/explore', '/post', '/settings',"/signup", '/add-topics', '/edit', '/draft', '/n', '/notifications','/search', '/forgotpassword','/messages','/resetpassword'],
}