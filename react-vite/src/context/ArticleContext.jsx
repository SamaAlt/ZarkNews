import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const ArticleContext = createContext();

export const useArticleContext = () => {
    return useContext(ArticleContext);
};

export const ArticleProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);
    const [userArticles, setUserArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 5;

    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    const fetchArticles = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/articles?page=${page}&limit=${articlesPerPage}&sort=id:desc`);
            setArticles(prevArticles => [...prevArticles, ...response.data.articles]);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserArticles = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/articles/user`);
            setUserArticles(response.data.articles);
        } catch (error) {
            console.error("Error fetching user articles:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ArticleContext.Provider 
            value={{ 
                articles, 
                userArticles, 
                loading, 
                currentPage, 
                setCurrentPage, 
                fetchUserArticles 
            }}
        >
            {children}
        </ArticleContext.Provider>
    );
};
