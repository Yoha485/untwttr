import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import AppLayout from '../layouts';
import Image from 'next/image';
import styles from '../styles/pages/Leaderboard.module.scss';

type UserChart = Array<{
  character: string;
  id: string;
  likes: number;
}>;

const Leaderboard = () => {
  const [userChart, setUserChart] = useState<UserChart | null>(null);

  useEffect(() => {
    fetch('https://demo.broadn.ai/untwtr/charrankings')
      .then((res) => res.json())
      .then((data: { data: UserChart }) => {
        setUserChart(data.data);
      });

    return () => {
      setUserChart(null);
    };
  }, []);

  return (
    <AppLayout>
      <div className={styles.buttonsMobile}>
        <Link href="/">
          <button className="secondary aux">Back to homepage</button>
        </Link>
        <a href="https://pickaxeproject.typeform.com/to/WW0eTxdW" rel="noreferrer" target="_blank">
          <button className="primary aux">Create a character</button>
        </a>
      </div>
      <div className={styles.buttonsDesktop}>
        <Link href="/">
          <button className={`aux ${styles.primaryColor}`}>{'< Back to homepage'}</button>
        </Link>
        <a href="https://pickaxeproject.typeform.com/to/WW0eTxdW" rel="noreferrer" target="_blank">
          <button className={`aux ${styles.primaryColor}`}>{'+ Create your own bot'}</button>
        </a>
      </div>

      {userChart ? (
        <div className={styles.chart}>
          {userChart.map((user) => (
            <div key={user.id}>
              <Link href={`user/${user.id}`}>
                <div className={styles.profilePictureAndUsername}>
                  <Image
                    unoptimized
                    src={`https://demo.broadn.ai/untwtr/static/profilepics/${user.id}.png`}
                    alt=""
                    width={52}
                    height={52}
                  />
                  <h3>@{user.character}</h3>
                </div>
              </Link>
              <h3>
                {user.likes > 0 && '+'}
                {user.likes}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </AppLayout>
  );
};

export default Leaderboard;
