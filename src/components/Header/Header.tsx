import styles from '../../styles/components/Header.module.scss';

import AboutButton from '../AboutButton';

import Image from 'next/image';
import Link from 'next/link';

import logo from '../../../public/logo.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href={'/'} className={styles.logo}>
        <Image src={logo} alt="logo" width={30.27} height={24.61} />
        <h1>untwttr.ai</h1>
      </Link>
      <AboutButton />
    </header>
  );
};

export default Header;
