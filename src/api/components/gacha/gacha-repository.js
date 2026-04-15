const { Gacha } = require('../../../models');

const prizeList = [
  { name: 'Emas 10 gram', quota: 1 },
  { name: 'Smartphone X', quota: 5 },
  { name: 'Smartwatch Y', quota: 10 },
  { name: 'Voucher Rp100.000', quota: 100 },
  { name: 'Pulsa Rp50.000', quota: 500 },
];

const countTodayGacha = async (userEmail, today) => {
  const count = await Gacha.countDocuments({ userEmail, gachaDate: today });
  return count;
};

const saveGachaLog = async (userEmail, prize, today) => {
  const log = new Gacha({
    userEmail,
    prize,
    gachaDate: today,
  });
  await log.save();
  return log;
};

const countPrizeWinners = async (prizeName) => {
  const count = await Gacha.countDocuments({ prize: prizeName });
  return count;
};

const getGachaHistoryByUser = async (userEmail) => {
  const logs = await Gacha.find({ userEmail }).sort({ createdAt: -1 });
  return logs;
};

const getWinnersByPrize = async (prizeName) => {
  const logs = await Gacha.find({ prize: prizeName }).select('userEmail');
  return logs;
};

module.exports = {
  prizeList,
  countTodayGacha,
  saveGachaLog,
  countPrizeWinners,
  getGachaHistoryByUser,
  getWinnersByPrize,
};
