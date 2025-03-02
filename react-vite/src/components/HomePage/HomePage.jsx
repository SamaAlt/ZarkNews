import React from 'react';
import Headline from './Headline'; // Ensure the path is correct
import Sidebars from './Sidebars'; // Ensure the path is correct
import Ads from './Ads'; // Ensure the path is correct
import ListArticles from './ListArticles';

const HomePage = () => {
  return (
    <div>
      <h1>Zark News</h1>
      <Headline />
      <Sidebars />
      <Ads />
      <ListArticles />
    </div>
  );
};

export default HomePage;