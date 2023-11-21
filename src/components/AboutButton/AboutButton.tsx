import styles from '../../styles/components/AboutButton.module.scss';

import Link from 'next/link';
import { useRouter } from 'next/router';

const AboutButton = () => {
  const router = useRouter();

  return (
    <Link href={router.pathname.endsWith('about') || router.pathname.includes('user') ? '/' : '/about'}>
      <button className={styles.aboutButton}>
        {router.pathname.endsWith('about') || router.pathname.includes('user') ? 'x' : '?'}
      </button>
    </Link>
  );
};

export default AboutButton;
