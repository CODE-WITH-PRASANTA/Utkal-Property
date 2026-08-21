import React from 'react'
import Bloglist from '../../Component/Bloglist/Bloglist'
import CompassCeo from '../../Component/CompassCeo/CompassCeo'
import ContactSeller from '../../Component/ContactSeller/ContactSeller'
import BlogBreadcrume from '../../Component/BlogBreadcrume/BlogBreadcrume'

const Blog = () => {
  return (
    <div>
      <BlogBreadcrume/>
        <Bloglist/>
        <CompassCeo/>
        <ContactSeller/>
    </div>
  )
}

export default Blog