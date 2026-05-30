/**
 * Cleans NewsAPI content artifacts and truncates for API usage.
 * @param {string} text - The article content to clean.
 * @returns {string} - Cleaned and truncated text.
 */
export const cleanArticleContent = (text) => {
  if (!text) return '';
  // Remove [+N chars] or [+N char] patterns
  return text.replace(/\[\+\d+ chars?\]/g, '').trim().substring(0, 1500);
};
