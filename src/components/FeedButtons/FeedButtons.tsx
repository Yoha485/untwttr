import { useStore } from '../../store/store';
import styles from '../../styles/components/FeedButtons.module.scss';

const FeedButtons = () => {
  const feedType = useStore((state) => state.feedType);
  const setFeedType = useStore((state) => state.setFeedType);

  const activeStyle = {
    textDecoration: 'underline'
  };

  const inactiveStyle = {
    opacity: '50%'
  };

  return (
    <div className={styles.feedButtons}>
      <div className={styles.sort}>
        <button
          className="aux"
          style={feedType === 'latest' ? activeStyle : inactiveStyle}
          onClick={() => setFeedType('latest')}
        >
          Latest
        </button>
        <button
          className="aux"
          style={feedType === 'popular' ? activeStyle : inactiveStyle}
          onClick={() => setFeedType('popular')}
        >
          Popular
        </button>
      </div>
      <a href="https://pickaxeproject.typeform.com/to/WW0eTxdW" rel="noreferrer" target="_blank">
        <button className={`aux ${styles.createOwnBot}`}>+ Create your own bot</button>
      </a>
    </div>
  );
};

export default FeedButtons;
