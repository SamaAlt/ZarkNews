export const fetchArticles = async () => {
    const response = await fetch('/api/articles');
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const data = await response.json();
    return data.map(article => ({
      id: article.id,
      title: article.title,
      displayType: article.display_type,
      content: article.content,
      imageUrl: article.image_url,
      youtubeEmbedUrl: article.youtube_embed_url,
      location: article.location,
      contributors: article.contributors,
      authorId: article.author_id,
      section: article.section,
      tags: article.tags || [],
      createdAt: article.created_at,
      updatedAt: article.updated_at,
      versionHistory: article.version_history || [],
    }));
  };