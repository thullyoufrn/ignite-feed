import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Post } from './components/Post';

import './global.css';
import styles from './App.module.css';

interface Posts {
  id: number;
  author: Author;
  content: Content[];
  publishedAt: Date;
}

export interface Author {
  name: string;
  role: string;
  authorPhotoUrl: string;
}

export interface Content {
  type: 'paragrath' | 'link';
  content: string;
}

const posts: Posts[]  = [
  {
    id: 1,
    author: {
      authorPhotoUrl: 'https://github.com/mullerino.png',
      name: 'Leandro Muller',
      role: 'Software Engineer @ Codeplay',
    },
    content: [
      { type: 'paragrath', content: "What's up guys 👋"},
      { type: 'paragrath', content: "I'm developing projects with React and I'm really enjoying it. This technology is very user-friendly and fluid. Now my goal is to master it. 🚀" },
      { type: 'link', content: "https://github.com/mullerino" },
    ],
    publishedAt: new Date('02-10-2023 16:00:00')
  },
  {
    id: 2,
    author: {
      authorPhotoUrl: 'https://github.com/ayslenon.png',
      name: 'Ayslenon Câmara',
      role: 'Tech Lead @ Codeplay',
    },
    content: [
      { type: 'paragrath', content: "Hello community!"},
      { type: 'paragrath', content: "I'm a full stack developer and I'm working on some Django and Node projects!" },
      { type: 'link', content: "https://github.com/ayslenon" },
    ],
    publishedAt: new Date('02-09-2023 16:00:00')
  }
]

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />

        <main>
          {posts.map(item => {
            return (
              <Post 
                key={item.id}
                author={item.author}
                content={item.content}
                publishedAt={item.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </div>
  );
}
