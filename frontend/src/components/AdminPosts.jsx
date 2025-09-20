import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import config from '../config.json';
import AdminNavbar from './AdminNavbar';

export default function AdminPosts() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    "id": "",
    "username": "",
    "name": "",
    "email": ""
  });
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    "user_id": "",
    "title": "",
    "content": ""
  });

  function changeNewPostTitle(e) {
    setNewPost({
      ...newPost,
      "title": e.target.value
    });
  }

  function changeNewPostContent(e) {
    setNewPost({
      ...newPost,
      "content": e.target.value
    });
  }

  function getPosts() {
    axios.get(config.BACKEND_URL + '/api/posts/list')
    .then(function(response) {
      setPosts(response['data']);
    });
  }

  function loadUser() {
    axios.get(config.BACKEND_URL + "/api/users/get-current-user")
    .then(function(response) {
      console.log(response['data']);
      if (response['data']['status'] == "OK") {
        setUser(response['data']['data']);
        setNewPost({
          ...newPost,
          "user_id": response['data']['data']['id']
        })
      }
      else {
        navigate("/admin/login");
      }
    })
    .catch(function(err) {
      console.log(err.message);
    });
  }

  function submitNewPost(e) {
    e.preventDefault();
    console.log(newPost);
    axios.post(config.BACKEND_URL + '/api/posts/insert', newPost)
    .then(function (response) {
      console.log(response['data']);
      getPosts();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    loadUser();
    getPosts();
  }, []);
  return (
    <>
      <AdminNavbar />
      <div className="container">
        <h3>Posts</h3>

        <div className="row justify-content-center m-5">
          <div className="col-md-12 bg-grey p-5 rounded-corners-lg">
            <h5>Create Post</h5>
            <form onSubmit={submitNewPost}>
              <div className="form-group py-2">
                <label className="control-label">Title</label>
                <div>
                    <input type="text" className="form-control input-lg" name="title" value={newPost.title} onChange={changeNewPostTitle}/>
                </div>
              </div>
              <div className="form-group py-2">
                <label className="control-label">Content</label>
                <div>
                    <textarea className="form-control input-lg" name="content" value={newPost.content} onChange={changeNewPostContent} rows={15}></textarea>
                </div>
              </div>
              <div className="form-group">
                  <div style={{textAlign: "right"}}>
                      <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
              </div>
            </form>
          </div>
        </div>
        
        <ul className="posts">
          {posts.map((post) => 
              <li key={post['id']}>
                <h5>{post['title']}</h5>
                <p>{post['content']}</p>
              </li>
          )}
        </ul>
      </div>
    </>
  )
}
