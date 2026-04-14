const { GachaLog } = require('../../../models');

const prizeList = [
  { name: 'Emas 10 gram', quota: 1 },
  { name: 'Smartphone X', quota: 5 },
  { name: 'Smartwatch Y', quota: 10 },
  { name: 'Voucher Rp100.000', quota: 100 },
  { name: 'Pulsa Rp50.000', quota: 500 },
];

const countTodayGacha = async (username, today) => {
  const count = await GachaLog.countDocuments({ username, gachaDate: today });
  return count;
};

const saveGachaLog = async (username, prize, today) => {
  const log = new GachaLog({
    username,
    prize,
    gachaDate: today,
  });
  await log.save();
  return log;
};

const countPrizeWinners = async (prizeName) => {
  const count = await GachaLog.countDocuments({ prize: prizeName });
  return count;
};

const getGachaHistoryByUser = async (username) => {
  const logs = await GachaLog.find({ username }).sort({ createdAt: -1 });
  return logs;
};

const getWinnersByPrize = async (prizeName) => {
  const logs = await GachaLog.find({ prize: prizeName }).select('username');
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
