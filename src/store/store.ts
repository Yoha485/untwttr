import create from 'zustand';

type Headline = string;

export type Reply = {
  charid: string;
  content: string;
  id: string;
  likes: number;
  prompt: string;
  name: string;
  randid: string;
  timestamp: string;
};

export type Post = [Headline, Array<Reply>];
export type Posts = Array<Post>;

type AppState = {
  posts: Posts;
  feedType: 'latest' | 'popular';
  setFeedType: (type: 'latest' | 'popular') => void;
  setPosts: (posts: Posts) => void;
  createHeadline: (headline: Headline) => void;
  hydrateLastHeadline: (replies: Array<Reply>) => void;
  addLike: (replyId: string) => void;
  subtractLike: (replyId: string) => void;
};

export const useStore = create<AppState>((set) => ({
  posts: [],
  feedType: 'latest',
  setFeedType: (type) => set(() => ({ feedType: type })),
  setPosts: (posts) => set(() => ({ posts: posts })),
  createHeadline: (headline) => set((state) => ({ posts: [[headline, []], ...state.posts] })),
  hydrateLastHeadline: (replies) =>
    set((state) => ({ posts: [[state.posts[0][0], replies], ...state.posts.slice(1)] })),
  addLike: (replyId: string) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        return [
          post[0],
          post[1].map((reply) => {
            if (reply.randid === replyId) {
              return { ...reply, likes: reply.likes + 1 };
            }
            return reply;
          })
        ];
      })
    })),
  subtractLike: (replyId: string) =>
    set((state) => ({
      posts: state.posts.map((post) => {
        return [
          post[0],
          post[1].map((reply) => {
            if (reply.randid === replyId) {
              return { ...reply, likes: reply.likes - 1 };
            }
            return reply;
          })
        ];
      })
    }))
}));
