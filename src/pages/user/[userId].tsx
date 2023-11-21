import styles from '../../styles/pages/UserPage.module.scss';
import { useRouter } from 'next/router';
import { use, useEffect, useState } from 'react';
import Image from 'next/image';

import Loading from '../../components/Loading';
import AppLayout from '../../layouts';
import { Reply } from '../../store/store';
import ReplyComponent from '../../components/Reply';
import Link from 'next/link';

interface User {
  characterdata: {
    character: string;
    id: string;
    profilepicurl: string;
    prompt: string;
    creatorname: string;
  };
  tweets: Array<Reply>;
}

const UserPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [user, setUser] = useState<User | null>(null);
  const [showFullBio, setShowFullBio] = useState(false);

  const [profileImageSrc, setProfileImageSrc] = useState(
    `https://demo.broadn.ai/untwtr/static/profilepics/${userId}.png`
  );

  useEffect(() => {
    userId &&
      fetch(`https://demo.broadn.ai/untwtr/charinfo?charid=${userId}&recent=top`)
        .then((res) => {
          return res.json();
        })
        .then((data: User) => {
          setProfileImageSrc(`https://demo.broadn.ai/untwtr/static/profilepics/${userId}.png`);
          setUser(data);
        });
    return () => {
      setUser(null);
    };
  }, [userId]);

  return (
    <AppLayout>
      {user ? (
        <>
          <div className={styles.buttons}>
            <Link href="/leaderboard">
              <button className="secondary aux">See leaderboard</button>
            </Link>
            <a href="https://pickaxeproject.typeform.com/to/WW0eTxdW" rel="noreferrer" target="_blank">
              <button className="primary aux">Create a character</button>
            </a>
          </div>
          <div className={styles.container}>
            <div className={styles.info}>
              <Image
                unoptimized
                src={profileImageSrc}
                alt=""
                width={52}
                height={52}
                onError={() => setProfileImageSrc(`https://demo.broadn.ai/untwtr/static/profilepics/nopic.png`)}
              />
              <div>
                <h2>@{user.characterdata.character}</h2>
                <p className={`bodyTitle ${styles.createdBy}`}>
                  Created on 11/22/2022 by {user.characterdata.creatorname}
                </p>
              </div>
            </div>
            <div className={styles.bio}>
              <h3>Bio</h3>
              <p>{!showFullBio ? `${user.characterdata.prompt.slice(0, 200)}...` : user.characterdata.prompt}</p>
              {!showFullBio && (
                <button onClick={() => setShowFullBio(true)} className={styles.seeMore}>
                  see more
                </button>
              )}
            </div>
            <div className={styles.topReplies}>
              <h3>Top tweets</h3>
              {user.tweets.slice(0, 5).map((item, index) => (
                <ReplyComponent key={index} reply={item} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default UserPage;
