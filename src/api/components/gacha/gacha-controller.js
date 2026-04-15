const gachaService = require('./gacha-service');

// controller untuk endpoint gacha utama
async function gacha(request, response, next) {
  try {
    const { email } = request.user;

    const result = await gachaService.doGacha(email);

    if (!result.success) {
      return response.status(429).json(result);
    }

    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getHistory(request, response, next) {
  try {
    const { email } = request.user;

    const result = await gachaService.getGachaHistory(email);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getPrizes(request, response, next) {
  try {
    const result = await gachaService.getPrizeList();
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const result = await gachaService.getWinnersList();
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  gacha,
  getHistory,
  getPrizes,
  getWinners,
};
