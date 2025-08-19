export type TUserType = {
	id: string;
	email: string | null;
	username: string | null;
	profile_image: string | null;
	interested_topics: {title:string, id:string}[] ;
	profile_tagline: string;
	location: string;
	bio: string;
	twitter_url: string;
	github_url: string;
	instagram_url: string;
	website_url: string;
	linkedin_url: string;
	youtube_url: string;
	facebook_url: string;
	following: TUserType[];	
	articles_count: number;
	articles: { is_published: boolean; id: string; title: string, content: string; }[];
		followers: TUserType[];	

}
