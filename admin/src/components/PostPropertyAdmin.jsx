import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManagePosts.css';

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchResidences = () => {
    fetch("http://192.168.1.105:5800/houses")
      .then((response) => response.json())
      .then((data) => {
        const mappedResidences = data.map((residence) => ({
          _id: residence._id,
          title: residence.title,
          address: residence.address,
          size: residence.size,
          price: residence.price,
          rooms: residence.rooms,
          bathrooms: residence.bathrooms,
          description: residence.description,
          contact_info: residence.contact_info,
          images: residence.images,
          visits: residence.visits,
          operation: residence.operation,
          amenities: residence.amenities,
          location: residence.location,
          subLocation: residence.subLocation,
          condition: residence.condition,
          favourite: residence.favourite
        }));
        setPosts(mappedResidences);
      })
      .catch((error) => {
        console.error("Error fetching residences:", error);
      });
  };

  useEffect(() => {
    fetchResidences();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await fetch(`http://192.168.1.105:5000/api/deletehouse/${postId}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = (postId) => {
    // Implement your update logic here
    console.log(`Update post with ID: ${postId}`);
  };

  const handleView = (post) => {
    navigate(`/post/${post._id}`);
  };

  const renderItem = (item) => (
    <div className="card" key={item._id}>
      {item.images.length > 0 && (
        <img src={item.images[0]} alt={item.title} className="image" />
      )}
      <div className="card-content">
        <h3 className="title">{item.title}</h3>
        <p className="details">{item.address}</p>
        <p className="details">Price: ${item.price}</p>
        <div className="actions">
          <button className="action-button view-button" onClick={() => handleView(item)}>
            <span className="material-icons">visibility</span> View
          </button>
          <button className="action-button update-button" onClick={() => handleUpdate(item._id)}>
            <span className="material-icons">edit</span> Update
          </button>
          <button className="action-button delete-button" onClick={() => handleDelete(item._id)}>
            <span className="material-icons">delete</span> Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="list">
        {posts.map(renderItem)}
      </div>
    </div>
  );
};

export default ManagePosts;
