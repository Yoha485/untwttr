import { useState } from 'react';
import styles from '../../styles/components/Post.module.scss';
import { Post, useStore } from '../../store/store';
import Headline from '../Headline';

import Reply from '../Reply';
import { translateTimestamp } from '../../utils';

type PostProps = {
  post: Post;
};

const Post: React.FC<PostProps> = ({ post }) => {
  const feedType = useStore((state) => state.feedType);

  const [seeMore, setSeeMore] = useState(false);
  const repliesWithLikes = post[1]
    .filter((item) => item.likes > 0)
    .map((reply, index) => <Reply key={index} reply={reply} />);

  return (
    <div>
      <Headline
        headlineContent={post[0]}
        repliesAmount={post[1].length}
        timestamp={translateTimestamp(Number(post[1][0]?.timestamp))}
      />
      <div>
        {feedType === 'latest' ? (
          <>
            {post[1].map((reply, index) => (
              <Reply key={index} reply={reply} />
            ))}
          </>
        ) : (
          <>
            {!seeMore ? (
              <>{repliesWithLikes}</>
            ) : (
              <>
                {post[1].map((reply, index) => (
                  <Reply key={index} reply={reply} />
                ))}
              </>
            )}
          </>
        )}
      </div>
      {feedType === 'popular' && !seeMore && (
        <button
          onClick={() => setSeeMore(true)}
          className={repliesWithLikes.length ? `${styles.seeMore} ${styles.getHigher}` : styles.seeMore}
        >
          see more
        </button>
      )}
    </div>
  );
};

export default Post;
