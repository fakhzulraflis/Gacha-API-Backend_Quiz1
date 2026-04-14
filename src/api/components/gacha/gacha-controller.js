const gachaService = require('./gacha-service');

// controller untuk endpoint gacha utama
const gacha = async (req, res) => {
  try {
    // Ini buat ngambil username dari body request.
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Usernamenya diisi dulu ya di body request',
      });
    }

    const result = await gachaService.doGacha(username);

    if (!result.success) {
      return res.status(429).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

const getHistory = async (req, res) => {
  try {
    // username diambil dari query param, contoh: /gacha/history?username=fakhzul
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username harus diisi di query param ya',
      });
    }

    const result = await gachaService.getGachaHistory(username);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

const getPrizes = async (req, res) => {
  try {
    const result = await gachaService.getPrizeList();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

const getWinners = async (req, res) => {
  try {
    const result = await gachaService.getWinnersList();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

module.exports = {
  gacha,
  getHistory,
  getPrizes,
  getWinners,
};
