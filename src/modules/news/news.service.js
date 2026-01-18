const apiClient = require("../../utils/apiClient");
const env = require("../../config/env");
const Preference = require("../../models/preferences.model");
const status = require("http-status");
const crypto = require("crypto");
const { getCache, setCache } = require("../../utils/cache");

const CACHE_TTL = 300;

const fetchPersonalizedNews = async (userId) => {
  const preferenceDoc = await Preference.findOne({ user: userId });

  const preferences = preferenceDoc?.preferences || [];
  console.log("User preferences:", preferences);

  const cacheKey = buildCacheKey(preferences);
  const cachedNews = await getCache(cacheKey);

  if (cachedNews) {
    console.log("Returning news from cache");
    return cachedNews;
  }

  const category = preferences.length > 0 ? preferences[0] : "general";

  const params = {
    apiKey: env.apiKey,
    language: "en",
    country: "us",
    category: category,
  };

  try {
    const response = await apiClient.get(
      `${env.newsApiBaseUrl}/top-headlines`,
      { params },
    );

    const normalizedArticles = normalizeArticles(response.data.articles || []);

    await setCache(cacheKey, normalizedArticles, CACHE_TTL);

    console.log("Returning news from API");

    return normalizedArticles;
  } catch (err) {
    console.error("Failed to fetch news from external API:", err.message);
    return [];
  }
};

const normalizeArticles = (articles = []) => {
  return articles.map((article) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    source: article.source?.name || null,
    publishedAt: article.publishedAt,
  }));
};

const buildCacheKey = (preferences) => {
  const rawKey = JSON.stringify({
    preferences: preferences,
  });

  return `news:${crypto.createHash("md5").update(rawKey).digest("hex")}`;
};

module.exports = { fetchPersonalizedNews };
