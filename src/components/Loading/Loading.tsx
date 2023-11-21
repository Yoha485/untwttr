import styles from '../../styles/components/Loading.module.scss';

interface LoadingProps {
  small?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ small }) => {
  return (
    <div className={styles.container}>
      <div className={styles.ldsRing} style={{ width: small ? '25px' : '80px', height: small ? '25px' : '80px' }}>
        <div style={{ width: small ? '20px' : '64px', height: small ? '20px' : '64px' }}></div>
        <div style={{ width: small ? '20px' : '64px', height: small ? '20px' : '64px' }}></div>
        <div style={{ width: small ? '20px' : '64px', height: small ? '20px' : '64px' }}></div>
        <div style={{ width: small ? '20px' : '64px', height: small ? '20px' : '64px' }}></div>
      </div>
    </div>
  );
};

export default Loading;
