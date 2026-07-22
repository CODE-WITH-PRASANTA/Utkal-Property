import React from 'react';
import './HomeBlog.css';

// React Icons
import { FiFolder, FiArrowRight } from 'react-icons/fi';

// Blog posts data
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Building gains into housing stocks and how to trade the sector',
    date: 'April',
    category: 'Housing',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '#blog-1'
  },
  {
    id: 2,
    title: '92% of millennial homebuyers say inflation has impacted their plans',
    date: 'April',
    category: 'Housing',
    image: 'https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '#blog-2'
  },
  {
    id: 3,
    title: "We are hiring 'moderately,' says Compass CEO",
    date: 'April',
    category: 'Housing',
    image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800',
    link: '#blog-3'
  }
];

const HomeBlog = () => {
  return (
    <section className="HomeBlog">
      <div className="HomeBlog-container">
        
        {/* Section Header */}
        <div className="HomeBlog-header">
          <h2 className="HomeBlog-main-title">Form our blog</h2>
          <p className="HomeBlog-subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio
          </p>
        </div>

        {/* 3-Card Blog Grid */}
        <div className="HomeBlog-grid">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="HomeBlog-card">
              
              {/* Image Container with Badge Overlay */}
              <div className="HomeBlog-img-wrapper">
                <img
                  src={post.image}
                  alt={post.title}
                  className="HomeBlog-img"
                />
                
                {/* Floating Bottom Badge */}
                <div className="HomeBlog-badge">
                  <span className="HomeBlog-badge-date">{post.date}</span>
                  <span className="HomeBlog-badge-divider"></span>
                  <span className="HomeBlog-badge-category">
                    <FiFolder className="HomeBlog-folder-icon" />
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="HomeBlog-card-body">
                <h3 className="HomeBlog-card-title">{post.title}</h3>
                
                <a href={post.link} className="HomeBlog-read-more">
                  Read more <FiArrowRight className="HomeBlog-arrow-icon" />
                </a>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeBlog;