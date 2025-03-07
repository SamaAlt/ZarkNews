import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [section, setSection] = useState('');
    const [displayType, setDisplayType] = useState('');
    const [visibleArticles, setVisibleArticles] = useState(10); // State to track the number of visible articles

    const fetchFilteredArticles = useCallback(async (filters = {}) => {
        try {
            const params = { ...filters };
            const response = await axios.get('/api/articles/filter', { params });
    
            if (JSON.stringify(response.data.articles) !== JSON.stringify(articles)) {
                setArticles(response.data.articles);
                setVisibleArticles(10); // Reset visible articles to 10 when new filters are applied
            }
        } catch (error) {
            console.error("Failed to fetch filtered articles:", error);
        }
    }, [articles]); // Add `articles` as a dependency

    const loadMoreArticles = useCallback(() => {
        setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 10); // Increase the number of visible articles by 10
    }, []);

    return (
        <FilterContext.Provider value={{ 
            articles: articles.slice(0, visibleArticles), // Only show the first `visibleArticles` articles
            fetchFilteredArticles, 
            setSection, 
            setDisplayType, 
            section, 
            displayType,
            loadMoreArticles,
            hasMoreArticles: articles.length > visibleArticles // Indicate if there are more articles to load
        }}>
            {children}
        </FilterContext.Provider>
    );
};

export { FilterContext, FilterProvider };