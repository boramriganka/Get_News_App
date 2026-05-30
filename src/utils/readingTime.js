/**
 * Estimates reading time for a given text.
 * @param {string} text - The text to estimate reading time for.
 * @returns {number} - Estimated reading time in minutes (minimum 1).
 */
export const estimateReadingTime = (text) => {
  if (!text) return 1;
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes);
};
