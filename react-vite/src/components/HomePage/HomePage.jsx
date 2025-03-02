import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [headlineArticles, setHeadlineArticles] = useState([]);
  const [listArticles, setListArticles] = useState([]);
  const [adArticles, setAdArticles] = useState([]);
  const [otherArticles, setOtherArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch headline, sidebar articles
        const headlineResponse = await axios.get('/api/articles', {
          params: {
            display_types: ['headline', 'sidebar_1', 'sidebar_2', 'sidebar_3'],
            per_page: 4, // Adjust as needed
          },
        });
        setHeadlineArticles(headlineResponse.data.articles);

        // Fetch list articles with valid sections
        const listResponse = await axios.get('/api/articles', {
          params: {
            display_types: ['list'],
            sections: ['national', 'world', 'business', 'sports', 'entertainment', 'technology'],
            per_page: 8,
          },
        });
        setListArticles(listResponse.data.articles);

        // Fetch ad articles
        const adResponse = await axios.get('/api/articles', {
          params: {
            display_types: ['ads_1', 'ads_2'],
            per_page: 2, // Adjust as needed
          },
        });
        setAdArticles(adResponse.data.articles);

        // Fetch other articles (excluding those already fetched)
        const otherResponse = await axios.get('/api/articles', {
          params: {
            exclude_ids: [
              ...headlineResponse.data.articles.map((a) => a.id),
              ...listResponse.data.articles.map((a) => a.id),
              ...adResponse.data.articles.map((a) => a.id),
            ],
            per_page: 10, // Adjust as needed
          },
        });
        setOtherArticles(otherResponse.data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Zark News</h1>

      {/* Headline and Sidebar Section */}
      <section>
        <h2>Headlines and Sidebar</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {headlineArticles.map((article) => (
            <div key={article.id} style={{ margin: '10px', width: '30%' }}>
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </section>

      {/* List Articles Section */}
      <section>
        <h2>Recent List Articles</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {listArticles.map((article) => (
            <div key={article.id} style={{ margin: '10px', width: '23%' }}>
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ad Articles Section */}
      <section>
        <h2>Advertisements</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {adArticles.map((article) => (
            <div key={article.id} style={{ margin: '10px', width: '45%' }}>
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Articles Section */}
      <section>
        <h2>Other Articles</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {otherArticles.map((article) => (
            <div key={article.id} style={{ margin: '10px', width: '30%' }}>
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;