import styles from '../../styles/components/Headline.module.scss';
import NewPostLoading from '../NewPostLoading/NewPostLoading';

interface HeadlineProps {
  headlineContent: string;
  repliesAmount: number;
  timestamp: string;
}

const Headline: React.FC<HeadlineProps> = (props) => {
  return (
    <div className={styles.headline}>
      {props.repliesAmount ? (
        <>
          <h3>#realnews</h3>
          <p className={styles.headlineContent}>{props.headlineContent}</p>
          <div className={styles.meta}>
            <p className="meta">{props.repliesAmount} REPLIES</p>
            <p className="meta">{props.timestamp}</p>
          </div>
        </>
      ) : (
        <NewPostLoading />
      )}
    </div>
  );
};

export default Headline;
