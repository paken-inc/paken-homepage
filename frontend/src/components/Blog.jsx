import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import {useState, useEffect} from 'react';
import axios from 'axios';
import config from '../config.json';

export default function Blog() {
  const [posts, setPosts] = useState([]);

  function getPosts() {
    axios.get(config.BACKEND_URL + '/api/posts/list')
    .then(function(response) {
      setPosts(response['data']);
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h3 className="mb-3">Blog</h3>
        <ul className="posts">
          {posts.map((post) => 
              <li key={post['id']}>
                <h5>{post['title']}</h5>
                <p>{post['content']}</p>
              </li>
          )}
          {posts.length < 1 &&
            <h3>There are no posts to display</h3>
          }
        </ul>
      </div>
      <Footer />
    </>
  )
}
