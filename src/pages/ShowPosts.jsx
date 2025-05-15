import React from 'react'
import Card from '../components/ui_components/Card';
import { mockBlogs } from '../data/mockBlogs';

function ShowPosts() {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };
  return (
    <div>
      {mockBlogs.map((post) => (
        <div className="flex flex-col gap-4" key={post.id}>
          <Card key={post.id} post={post} formatDate={formatDate} />
        </div>
      ))}
    </div>
  )
}

export default ShowPosts