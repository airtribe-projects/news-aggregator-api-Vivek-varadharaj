const apiClient = require("../../utils/apiClient");
const env = require("../../config/env");
const Preference = require("../../models/preferences.model");
const status = require("http-status");
const crypto = require("crypto");
const { getCache, setCache } = require("../../utils/cache");

const CACHE_TTL = 300;

const fetchPersonalizedNews = async (userId) => {
  const preferences = await Preference.findOne({ user: userId });

  if (!preferences) {
    const error = new Error("User preferences not found");
    error.statusCode = status.BAD_REQUEST;
    throw error;
  }

  const cacheKey = buildCacheKey(preferences);
  const cachedNews = await getCache(cacheKey);

  if (cachedNews) {
    console.log("Returning news from cache");
    return cachedNews;
  }

  const { categories, language, country } = preferences;

  const params = {
    apiKey: env.apiKey,
    language,
    country,
  };

  if (categories?.length) {
    params.category = categories[0];
  }

  try {
    const response = await apiClient.get(
      `${env.newsApiBaseUrl}/top-headlines`,
      { params },
    );

    const normalizedArticles = normalizeArticles(response.data.articles);

    await setCache(cacheKey, normalizedArticles, CACHE_TTL);

    console.log("Returning news from API");

    return normalizedArticles;
  } catch (err) {
    const error = new Error("Failed to fetch news from external API");
    error.statusCode = status.SERVICE_UNAVAILABLE;
    throw error;
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

const buildCacheKey = (prefs) => {
  const rawKey = JSON.stringify({
    country: prefs.country,
    language: prefs.language,
    categories: prefs.categories,
  });

  return `news:${crypto.createHash("md5").update(rawKey).digest("hex")}`;
};

module.exports = { fetchPersonalizedNews };
