const { fetchPersonalizedNews } = require("./news.service");
const { status } = require("http-status");

const getPersonalizedNews = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const news = await fetchPersonalizedNews(userId);
    res.status(status.OK).json({
      message: "Personalized news retrieved successfully",
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPersonalizedNews };
