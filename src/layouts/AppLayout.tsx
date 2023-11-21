import styles from '../styles/layouts/AppLayout.module.scss';

import Header from '../components/Header';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className={styles.appLayout}>
      <Header />
      {children}
    </div>
  );
};

export default AppLayout;
