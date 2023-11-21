import styles from '../../styles/components/NewPostLoading.module.scss';

import { useEffect, useState } from 'react';
import Loading from '../Loading';

const loadingTexts = ['Generating outrage...', 'Playing god...', 'Sewing chaos...', 'Putting memes in the oven...'];

const NewPostLoading = () => {
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingTextIndex((prev) => {
        if (prev === loadingTexts.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.loading}>
      <Loading small />
      <p>{loadingTexts[loadingTextIndex]}</p>
    </div>
  );
};

export default NewPostLoading;
