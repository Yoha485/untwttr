import styles from '../../styles/components/Reply.module.scss';

import Image from 'next/image';

import { Reply } from '../../store/store';
import { useState } from 'react';
import Likes from '../Likes';
import { useRouter } from 'next/router';
import { translateTimestamp } from '../../utils';

type ReplyProps = {
  reply: Reply;
};

const Reply: React.FC<ReplyProps> = ({ reply }) => {
  const [profileImageSrc, setProfileImageSrc] = useState(
    `https://demo.broadn.ai/untwtr/static/profilepics/${reply.charid}.png`
  );
  const router = useRouter();

  const onClickProfileImageOrUsername = () => {
    router.push(`/user/${reply.charid}`);
  };

  return (
    <div className={styles.reply}>
      <Image
        className={styles.profileImage}
        onClick={onClickProfileImageOrUsername}
        unoptimized
        src={profileImageSrc}
        alt=""
        width={52}
        height={52}
        onError={() => setProfileImageSrc(`https://demo.broadn.ai/untwtr/static/profilepics/nopic.png`)}
      />
      <div>
        <div className={styles.authorAndLikes}>
          <h3 onClick={onClickProfileImageOrUsername}>@{reply.name}</h3>
          <div className={styles.likes}>
            <Likes replyId={reply.randid}>{reply.likes}</Likes>
          </div>
        </div>

        <p className={styles.replyContent}>{reply.content}</p>

        <p className={`meta ${styles.meta}`}>{translateTimestamp(Number(reply.timestamp))}</p>
      </div>
    </div>
  );
};

export default Reply;
