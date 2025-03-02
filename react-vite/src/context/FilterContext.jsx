import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const FilterContext = createContext();

const FilterProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [section, setSection] = useState('');
    const [displayType, setDisplayType] = useState('');

    const fetchFilteredArticles = useCallback(async (filters = {}) => {
        try {
            const params = { ...filters };
            console.log('Fetching filtered articles with params:', params);
            const response = await axios.get('/api/articles/filter', { params });
    
            // Check if the new articles are different from the current ones
            if (JSON.stringify(response.data.articles) !== JSON.stringify(articles)) {
                setArticles(response.data.articles);
                console.log('Fetched filtered articles:', response.data.articles);
            }
        } catch (error) {
            console.error("Failed to fetch filtered articles:", error);
        }
    }, [articles]); // Add `articles` as a dependency
    
    return (
        <FilterContext.Provider value={{ articles, fetchFilteredArticles, setSection, setDisplayType, section, displayType }}>
            {children}
        </FilterContext.Provider>
    );
};

export { FilterContext, FilterProvider };