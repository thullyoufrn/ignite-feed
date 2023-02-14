import { Avatar } from './Avatar';
import { Comment } from './Comment';

// date-fns format method documentation: 
// https://date-fns.org/v2.29.3/docs/format

import { format, formatDistanceToNow } from 'date-fns'; 

import styles from './Post.module.css';

import { ChangeEvent, FormEvent, useState } from 'react';

import { Author, Content } from '../App'

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const publishedDateFormatted = format(publishedAt, "d LLLL y 'at' h':'mm aaaa")

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    addSuffix: true
  })

  const [comments, setComments] = useState<string[]>([])

  const [newCommentText, setNewCommentText] = useState('')

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value)
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletedOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header className={styles.header}>
        <div className={styles.author}>
          <Avatar src={author.authorPhotoUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(item => {
          if (item.type === 'paragrath') {
            return <p key={item.content}>{item.content}</p>
          } else if (item.type === 'link') {
            return (
              <p key={item.content}>
                <a href={item.content} target='_blank'>#github</a>
              </p>
            );
          }
        })}
      </div>

      {/* Try your best to code using declarative programming */}
      <form onSubmit={handleCreateNewComment} className={styles.contentForm}>
        <strong>Leave your feedback</strong>

        <textarea 
          name='input'
          placeholder='Leave a comment...'
          value={newCommentText}
          onChange={handleNewCommentChange}
          required
        />
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>
            Post
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment 
              key={comment}  
              content={comment} 
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  );
}
