import { useEffect, useState } from 'react';

function FetchTest() {
  const BASE_URL = 'http://localhost:5000';
  const [result, setResult] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await fetch(`${BASE_URL}/post`);
    const data = await res.json();
    console.log(data);
    setResult(data);
  }

  async function createPost() {
    const res = await fetch(`${BASE_URL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    console.log(data);
    getData();
    setTitle('');
    setContent('');
  }

  return (
    <>
      <div>
        <h2>create post</h2>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='title'
        />
        <input
          type='text'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='content'
        />
        <button onClick={createPost}>등록</button>
      </div>

      <div>
        <h2>get posts</h2>
        <button onClick={getData}>get posts</button>
        <div>
          <ul>
            {result.map((item) => (
              <li key={item.id}>
                {item.title} / {item.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default FetchTest;
