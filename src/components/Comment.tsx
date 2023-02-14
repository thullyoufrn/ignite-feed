import { Avatar } from './Avatar';

import { Trash, ThumbsUp } from 'phosphor-react';

import styles from './Comment.module.css';
import { useState } from 'react';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void; // You can use another name to 'comment', it's not a must.
}

export function Comment({ content, onDeleteComment }: CommentProps) {
  function handleDeleteComment() {
    onDeleteComment(content)
  }

  const [applaudCount, setApplaudCount] = useState(0)

  function handleApplaudComment() {
    setApplaudCount(applaudCount + 1);
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/thullyoufrn.png"/>

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Thullyo Damasceno</strong>
              <time title='9 February 2023 at 12:13 p.m.' dateTime='09-02-2023 12:13:30'>Commented just now</time>
            </div>

            <button onClick={handleDeleteComment} title='Delete comment'>
              <Trash size={24}/>
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleApplaudComment}>
            <ThumbsUp />
            Applaud <span>{applaudCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
