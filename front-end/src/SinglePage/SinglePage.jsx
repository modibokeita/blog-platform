import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const posts = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  // Add more posts as needed
];

function SinglePage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Find the post with the matching id
    const foundPost = posts.find((post) => post.id === parseInt(id));
    setPost(foundPost);
  }, [id]);

  if (!post) {
    return <div>Loading...</div>; // Display loading while the post is being fetched
  }

  return (
    <div className="single-post">
      <h1>{post.title}</h1>
      <img src={post.img} alt={post.title} />
      <p>{post.desc}</p>
      <button>Read More</button>
    </div>
  );
}

export default SinglePage;


