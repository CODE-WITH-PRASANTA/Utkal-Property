import React from 'react';
import { 
  FaRupeeSign, 
  FaHome, 
  FaArrowsAltH, 
  FaBuilding, 
  FaMapMarkerAlt 
} from 'react-icons/fa';

// Import local assets
import smp1 from '../../assets/smp1.webp';
import smp2 from '../../assets/smp2.webp';

import './PropertyDetailsSimilarProjects.css';

const PropertyDetailsSimilarProjects = () => {
  // Data representing the projects
  const projects = [
    {
      id: 1,
      title: "JB Sierra",
      price: "1.40 Cr",
      type: "Villa",
      sba: "2119-2340 sq.ft.",
      builder: "JB ASSETS",
      location: "Giringaput, Bhubaneswar",
      featured: false,
      image: smp1
    },
    {
      id: 2,
      title: "Metro Kings Kourt",
      price: "1.50 Cr",
      type: "Villa",
      sba: "2100-3820 sq.ft.",
      builder: "Metro Group",
      location: "Jatni Gate, Bhubaneswar",
      featured: true,
      image: smp2
    }
  ];

  // Functional handler for the button
  const handleViewDetails = (projectName) => {
    alert(`Navigating to details page for: ${projectName}`);
  };

  return (
    <div className="PropertyDetailsSimilarProjects-wrapper">
      {/* Section Header */}
      <div className="PropertyDetailsSimilarProjects-section-header">
        <h2 className="PropertyDetailsSimilarProjects-title">Similar Project</h2>
        <div className="PropertyDetailsSimilarProjects-underline"></div>
      </div>

      {/* Projects Grid */}
      <div className="PropertyDetailsSimilarProjects-grid">
        {projects.map((project) => (
          <div key={project.id} className="PropertyDetailsSimilarProjects-card">
            
            {/* Image Section */}
            <div className="PropertyDetailsSimilarProjects-img-container">
              <img 
                src={project.image} 
                alt={project.title} 
                className="PropertyDetailsSimilarProjects-image" 
              />
              {project.featured && (
                <div className="PropertyDetailsSimilarProjects-featured-badge">Featured</div>
              )}
            </div>

            {/* Content Section */}
            <div className="PropertyDetailsSimilarProjects-content">
              <h3 className="PropertyDetailsSimilarProjects-card-title">{project.title}</h3>
              
              <div className="PropertyDetailsSimilarProjects-details-grid">
                {/* Price */}
                <div className="PropertyDetailsSimilarProjects-detail-item">
                  <div className="PropertyDetailsSimilarProjects-icon-box">
                    <FaRupeeSign />
                  </div>
                  <div className="PropertyDetailsSimilarProjects-detail-text">
                    <span className="PropertyDetailsSimilarProjects-detail-label">Price</span>
                    <span className="PropertyDetailsSimilarProjects-detail-val">{project.price}</span>
                  </div>
                </div>

                {/* Type */}
                <div className="PropertyDetailsSimilarProjects-detail-item">
                  <div className="PropertyDetailsSimilarProjects-icon-box">
                    <FaHome />
                  </div>
                  <div className="PropertyDetailsSimilarProjects-detail-text">
                    <span className="PropertyDetailsSimilarProjects-detail-label">Type</span>
                    <span className="PropertyDetailsSimilarProjects-detail-val">{project.type}</span>
                  </div>
                </div>

                {/* SBA */}
                <div className="PropertyDetailsSimilarProjects-detail-item">
                  <div className="PropertyDetailsSimilarProjects-icon-box">
                    <FaArrowsAltH />
                  </div>
                  <div className="PropertyDetailsSimilarProjects-detail-text">
                    <span className="PropertyDetailsSimilarProjects-detail-label">SBA</span>
                    <span className="PropertyDetailsSimilarProjects-detail-val">{project.sba}</span>
                  </div>
                </div>

                {/* Builder */}
                <div className="PropertyDetailsSimilarProjects-detail-item">
                  <div className="PropertyDetailsSimilarProjects-icon-box">
                    <FaBuilding />
                  </div>
                  <div className="PropertyDetailsSimilarProjects-detail-text">
                    <span className="PropertyDetailsSimilarProjects-detail-label">Builder</span>
                    <span className="PropertyDetailsSimilarProjects-detail-val">{project.builder}</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="PropertyDetailsSimilarProjects-location-row">
                <div className="PropertyDetailsSimilarProjects-icon-box">
                  <FaMapMarkerAlt />
                </div>
                <div className="PropertyDetailsSimilarProjects-detail-text">
                  <span className="PropertyDetailsSimilarProjects-detail-label">Location</span>
                  <span className="PropertyDetailsSimilarProjects-detail-val">{project.location}</span>
                </div>
              </div>

              {/* Action Button */}
              <button 
                className="PropertyDetailsSimilarProjects-view-btn"
                onClick={() => handleViewDetails(project.title)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDetailsSimilarProjects;