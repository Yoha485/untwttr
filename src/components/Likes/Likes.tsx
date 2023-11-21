import { useEffect, useState } from 'react';
import { useStore } from '../../store/store';

interface LikesProps {
  children: React.ReactNode;
  replyId: string;
}

const Likes: React.FC<LikesProps> = ({ children, replyId }) => {
  const [likeState, setLikeState] = useState<'liked' | 'disliked' | 'none'>('none');
  const addLike = useStore((state) => state.addLike);
  const subtractLike = useStore((state) => state.subtractLike);

  useEffect(() => {
    setLikeState((localStorage.getItem(replyId) as 'liked' | 'disliked' | null) || 'none');
  }, [replyId]);

  const onClickLike = () => {
    if (likeState === 'liked') {
      localStorage.removeItem(replyId);
      subtractLike(replyId);
      setLikeState('none');
      fetch(`https://demo.broadn.ai/untwtr/dislike?id=${replyId}`);
    } else if (likeState == 'disliked') {
      localStorage.setItem(replyId, 'liked');
      addLike(replyId);
      addLike(replyId);
      setLikeState('liked');
      fetch(`https://demo.broadn.ai/untwtr/like?id=${replyId}`);
      fetch(`https://demo.broadn.ai/untwtr/like?id=${replyId}`);
    } else {
      localStorage.setItem(replyId, 'liked');
      addLike(replyId);
      setLikeState('liked');
      fetch(`https://demo.broadn.ai/untwtr/like?id=${replyId}`);
    }
  };

  const onClickDislike = () => {
    if (likeState === 'disliked') {
      localStorage.removeItem(replyId);
      addLike(replyId);
      setLikeState('none');
      fetch(`https://demo.broadn.ai/untwtr/like?id=${replyId}`);
    } else if (likeState === 'liked') {
      localStorage.setItem(replyId, 'disliked');
      subtractLike(replyId);
      subtractLike(replyId);
      setLikeState('disliked');
      fetch(`https://demo.broadn.ai/untwtr/dislike?id=${replyId}`);
      fetch(`https://demo.broadn.ai/untwtr/dislike?id=${replyId}`);
    } else {
      localStorage.setItem(replyId, 'disliked');
      subtractLike(replyId);
      setLikeState('disliked');
      fetch(`https://demo.broadn.ai/untwtr/dislike?id=${replyId}`);
    }
  };

  return (
    <>
      <div onClick={onClickDislike}>
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 3L9 9L15 3"
            stroke={likeState === 'disliked' ? '#0A8CEB' : 'white'}
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h3>{children}</h3>
      <div onClick={onClickLike}>
        <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 8L9 2L3 8"
            stroke={likeState === 'liked' ? '#0A8CEB' : 'white'}
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};

export default Likes;
