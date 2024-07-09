import React, { useState, ChangeEvent } from 'react';
import './PostProperty.css'; // Import your CSS file for styling

const PostProperty: React.FC = () => {
  const [propertyData, setPropertyData] = useState({
    _id: "1",
    address: "123 Main Street, Cityville, State",
    size: 120,
    category: "apartment",
    title: "Modern Apartment in City Center",
    favourite: false,
    description: "Spacious and modern apartment located in the heart of the city. Close to amenities and public transportation.",
    images: [
      "image1.jpg",
      "image2.jpg",
      "image3.jpg"
    ],
    operation: "rent",
    date_of_creation: "2024-07-07",
    rooms: 2,
    bathrooms: 1,
    visits: {
      dates: [
        "2024-07-10",
        "2024-07-15",
        "2024-07-22"
      ]
    },
    amenities: {
      parking: false,
      ac: false,
      furnished: false,
      pool: false,
      microwave: false,
      near_subway: false,
      beach_view: false,
      alarm: false,
      garden: false
    }
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkboxValue = (e.target as HTMLInputElement).checked; // Cast e.target to HTMLInputElement
      setPropertyData(prevData => ({
        ...prevData,
        amenities: {
          ...prevData.amenities,
          [name]: checkboxValue
        }
      }));
    } else {
      setPropertyData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the submission of propertyData, e.g., send it to an API or perform other actions
    console.log(propertyData); // Example: Log to console for demonstration
    // Reset form or perform other actions after submission
    setPropertyData({
      _id: '',
      address: '',
      size: 0,
      category: 'apartment',
      title: '',
      favourite: false,
      description: '',
      images: [],
      operation: 'rent',
      date_of_creation: '',
      rooms: 0,
      bathrooms: 0,
      visits: {
        dates: []
      },
      amenities: {
        parking: false,
        ac: false,
        furnished: false,
        pool: false,
        microwave: false,
        near_subway: false,
        beach_view: false,
        alarm: false,
        garden: false
      }
    });
  };

  return (
    <div className="post-property-container">
      <h2>Post Your Property</h2>
      <form onSubmit={handleSubmit} className="property-form">
        <label className="form-label">
          Address:
          <input type="text" name="address" value={propertyData.address} onChange={handleInputChange} required className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Size (sqm):
          <input type="number" name="size" value={propertyData.size} onChange={handleInputChange} required className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Category:
          <select name="category" value={propertyData.category} onChange={handleInputChange} required className="form-select">
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="office">Office</option>
            <option value="studio">Studio</option>
            <option value="penthouse">Penthouse</option>
          </select>
        </label>
        <br />
        <label className="form-label">
          Title:
          <input type="text" name="title" value={propertyData.title} onChange={handleInputChange} required className="form-input" />
        </label>
        <br />
        <label className="form-label">
          Description:
          <textarea name="description" value={propertyData.description} onChange={handleInputChange} required className="form-textarea" />
        </label>
        <br />
        <div className="amenities-title">Amenities:</div>
        <div className="amenities-container">
          <div className="amenity-checkbox"> 
            <label className="amenity-label">Parking</label>
            <input type="checkbox" name="parking" checked={propertyData.amenities.parking} onChange={handleInputChange} className="form-checkbox" />
           
          </div>
          <div className="amenity-checkbox">
            <label className="amenity-label">Air Conditioning</label>
            <input type="checkbox" name="ac" checked={propertyData.amenities.ac} onChange={handleInputChange} className="form-checkbox" />
           
          </div>
          <div className="amenity-checkbox"> 
            <label className="amenity-label">Furnished</label>
            <input type="checkbox" name="furnished" checked={propertyData.amenities.furnished} onChange={handleInputChange} className="form-checkbox" />
           
          </div>
          <div className="amenity-checkbox"> 
            <label className="amenity-label">Pool</label>
            <input type="checkbox" name="pool" checked={propertyData.amenities.pool} onChange={handleInputChange} className="form-checkbox" />
           
          </div>
          <div className="amenity-checkbox">
            <label className="amenity-label">Microwave</label>
            <input type="checkbox" name="microwave" checked={propertyData.amenities.microwave} onChange={handleInputChange} className="form-checkbox" />
            
          </div>
          <div className="amenity-checkbox">
            <label className="amenity-label">Near Subway</label>
            <input type="checkbox" name="near_subway" checked={propertyData.amenities.near_subway} onChange={handleInputChange} className="form-checkbox" />
           
          </div>
          <div className="amenity-checkbox">
            <label className="amenity-label">Beach View</label>
            <input type="checkbox" name="beach_view" checked={propertyData.amenities.beach_view} onChange={handleInputChange} className="form-checkbox" />
            
          </div>
          <div className="amenity-checkbox">
            <label className="amenity-label">Alarm</label>
            <input type="checkbox" name="alarm" checked={propertyData.amenities.alarm} onChange={handleInputChange} className="form-checkbox" />
            
          </div>
          <div className="amenity-checkbox">
            <label className="amenity-label">Garden</label>
            <input type="checkbox" name="garden" checked={propertyData.amenities.garden} onChange={handleInputChange} className="form-checkbox" />
           
          </div>
        </div>
        <br />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default PostProperty;
