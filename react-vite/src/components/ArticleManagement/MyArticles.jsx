import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileButton from '../ProfileButton';
import Sidebar from '../Sidebar/Sidebar';

const MyArticles = () => {
    const [userArticles, setUserArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchUserArticles = async () => {
          try {
              const response = await fetch('/api/articles/my-articles', {
                  credentials: 'include', // Include cookies for authentication
              });
              if (response.ok) {
                  const data = await response.json();
                  setUserArticles(data.articles);
              } else {
                  console.error('Failed to fetch articles:', response.statusText);
              }
          } catch (error) {
              console.error('Error fetching articles:', error);
          } finally {
              setLoading(false);
          }
      };
  
      fetchUserArticles();
  }, []);

    return (
        <div>
            <nav>
                <ProfileButton />
            </nav>
            <Sidebar />
            <h1>My Articles</h1>
            {loading && <p>Loading...</p>}
            {!loading && userArticles.length === 0 && <p>No articles found.</p>}
            <ul style={{ border: '1px solid red' }}>
                {userArticles.map((article) => {
                    console.log('Rendering user article:', article); // Debugging
                    return (
                        <li key={article.id} style={{ border: '1px solid blue', margin: '10px', padding: '10px' }}>
                            <h2>{article.title}</h2>
                            <p>{article.content.substring(0, 100)}...</p>
                            <Link to={`/articles/${article.id}`}>Read More</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MyArticles;