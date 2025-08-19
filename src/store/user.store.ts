import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TUserType } from "@/types/user";

const defaultUser: TUserType = {
  id: "",
  email: "",
  username: "",
  profile_image: "",
  interested_topics: [],
  articles:[],
  profile_tagline: "",
  location: "",
  bio: "",
  twitter_url: "",
  github_url: "",
  instagram_url: "",
  website_url: "",
  linkedin_url: "",
  youtube_url: "",
  facebook_url: "",
  articles_count: 0,
  following: [],
  followers:[]
};


const useCurrentUserStore = create(
  persist<{
    currentUser: TUserType;
    setCurrentUser: (user: TUserType) => void;
    updateCurrentUser: (user: Partial<TUserType>) => void;
  }>(
    (set) => ({
      currentUser: defaultUser,
      setCurrentUser: (user: TUserType) => set({ currentUser: user }),
      updateCurrentUser: (user: Partial<TUserType>) =>
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            ...user,
          },
        })),
        
    }),
    {
      name: "user",
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    },
  ),
);

export function useCurrentUserState() {
  const {
    currentUser,
    setCurrentUser,
    updateCurrentUser,
  } = useCurrentUserStore();

  return {
    currentUser,
    setCurrentUser(user: TUserType) {
      setCurrentUser(user);
    },
    updateCurrentUser(user: Partial<TUserType>) {
      updateCurrentUser(user);
    }
  };
}
