import { useEffect, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

import { useStore } from '../../store/store';

import styles from '../../styles/components/Feed.module.scss';

import Loading from '../Loading';
import FeedButtons from '../FeedButtons';
import Post from '../Post';

const Feed = () => {
  const posts = useStore((state) => state.posts);
  const [pageNumber, setPageNumber] = useState(0);
  const feedType = useStore((state) => state.feedType);
  const setPosts = useStore((state) => state.setPosts);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (feedType === 'latest') {
      setLoading(true);
      fetch('https://demo.broadn.ai/untwtr/blockcontent?id=0&listtype=recent')
        .then((res) => res.json())
        .then((data: typeof posts) => {
          setPosts(data);
          setPageNumber(1);
          setLoading(false);
        });
    } else {
      setLoading(true);
      fetch('https://demo.broadn.ai/untwtr/blockcontent?id=0&filter=top')
        .then((res) => res.json())
        .then((data: typeof posts) => {
          setPosts(data);
          setPageNumber(1);
          setLoading(false);
        });
    }
    return () => {
      setPosts([]);
    };
  }, [feedType, setPosts]);

  useBottomScrollListener(() => {
    if (feedType === 'latest') {
      fetch(`https://demo.broadn.ai/untwtr/blockcontent?id=${pageNumber * 21}&listtype=recent`)
        .then((res) => res.json())
        .then((data: typeof posts) => {
          setPosts([...posts, ...data]);
          setPageNumber((prev) => prev + 1);
        });
    } else {
      fetch(`https://demo.broadn.ai/untwtr/blockcontent?id=${pageNumber * 27}&filter=top`)
        .then((res) => res.json())
        .then((data: typeof posts) => {
          setPosts([...posts, ...data]);
          setPageNumber((prev) => prev + 1);
        });
    }
  });

  return (
    <div>
      <FeedButtons />
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.posts}>
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
