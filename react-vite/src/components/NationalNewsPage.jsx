import React, { useEffect, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

const NationalNewsPage = () => {
  const { articles, fetchFilteredArticles, setSection } = useContext(FilterContext);

    // Set the section to 'national' only once when the component mounts
    useEffect(() => {
        console.log('Setting section to national');
        setSection('national');
    }, [setSection]); // Only run this effect once when the component mounts

    // Fetch articles for the 'national' section only when the section changes
    useEffect(() => {
        console.log('Fetching national articles');
        fetchFilteredArticles({ section: 'national' });
    }, [fetchFilteredArticles]); // Only run this effect when `fetchFilteredArticles` changes

    // Log when articles are updated
    useEffect(() => {
        console.log('national Articles updated:', articles);
    }, [articles]); // Only run this effect when `articles` changes

    return (
        <div>
            <h1>National News</h1>
            <ul>
                {articles.map(article => (
                    <li key={article.id}>{article.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default NationalNewsPage;
