import styles from '../../styles/components/CreateHeadline.module.scss';
import { useRef, useState } from 'react';
import { Posts, useStore } from '../../store/store';

const CreatePost = () => {
  const [isGenerateHeadlinePressed, setIsGenerateHeadlinePressed] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const feedType = useStore((state) => state.feedType);
  const createHeadline = useStore((state) => state.createHeadline);
  const hydrateLastHeadline = useStore((state) => state.hydrateLastHeadline);

  const generateHeadline = () => {
    setIsGenerateHeadlinePressed(true);
    if (!isGenerateHeadlinePressed) {
      fetch('https://demo.broadn.ai/untwtr/absurdnewsevent')
        .then((res) => res.json())
        .then((data: {text: string}) => {
          setIsGenerateHeadlinePressed(false);
          if (textareaRef.current !== null) {
            textareaRef.current.value = data.text.trim();
          }
        });
    }
  };

  const onSubmitClick = () => {
    if (textareaRef.current !== null) {
      if (textareaRef.current.value.length === 0) {
        alert('You can not create empty headline');
        return;
      }

      feedType === 'latest' && createHeadline(textareaRef.current.value);
      fetch('https://demo.broadn.ai/untwtr/customer', {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify({ data: textareaRef.current.value })
      }).then(() => {
        feedType === 'latest' &&
          setTimeout(() => {
            fetch('https://demo.broadn.ai/untwtr/blockcontent?id=0&listtype=recent')
              .then((res) => {
                return res.json();
              })
              .then((data: Posts) => {
                hydrateLastHeadline(data[0][1]);
              });
          }, 5000);
      });
      textareaRef.current.value = '';
    }
  };

  return (
    <div>
      <textarea
        ref={textareaRef}
        maxLength={150}
        name="Post Content"
        placeholder="Submit a news event and the AI commentariat will pontificate."
        className={styles.postContent}
      ></textarea>
      <div className={styles.buttons}>
        <button className="aux primary" onClick={() => generateHeadline()}>
          {isGenerateHeadlinePressed ? 'Generating...' : 'Generate Headline'}
        </button>
        <button className="secondary aux" onClick={onSubmitClick}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
