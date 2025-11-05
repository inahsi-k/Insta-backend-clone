import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import M from 'materialize-css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');

  const submitPost = () => {
    if (!title || !body || !image) {
      M.toast({ html: 'Please fill all fields', classes: '#c62828 red darken-3' });
      return;
    }

    // Step 1: Upload image to Cloudinary
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta_upload"); // your Cloudinary preset
    data.append("cloud_name", "dtgqnxmc7");       // your Cloudinary name

    fetch("https://api.cloudinary.com/v1_1/dtgqnxmc7/image/upload", {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(imgData => {
        console.log("Cloudinary response:", imgData);

        // Step 2: Send title, body, and image URL to backend
        return fetch("http://localhost:5000/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            title,
            body,
            image: imgData.url
          })
        });
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create post");
        return res.json();
      })
      .then(data => {
        console.log("Backend response:", data);
        if (data.error) {
          M.toast({ html: data.error, classes: '#c62828 red darken-3' });
        } else {
          M.toast({ html: "Post created successfully!", classes: '#43a047 green darken-1' });
          navigate('/');
        }
      })
      .catch(err => {
        console.error("Error:", err);
        M.toast({ html: "Something went wrong!", classes: '#c62828 red darken-3' });
      });
  };

  return (
    <div className="card input-field"
         style={{ margin: '30px auto', maxWidth: '500px', padding: '20px', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <div className="file-field input-field">
        <div className="btn">
          <span>Upload Image</span>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" placeholder="Upload file name" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={submitPost}
      >
        Submit Post
      </button>
      <br /><br />
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default CreatePost;

