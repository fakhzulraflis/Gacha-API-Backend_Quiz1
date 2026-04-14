const gachaRepository = require('./gacha-repository');

const getTodayString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const doGacha = async (username) => {
  const today = getTodayString();
  const todayCount = await gachaRepository.countTodayGacha(username, today);

  if (todayCount >= 5) {
    return {
      success: false,
      message:
        'Kamu sudah mencapai batas maksimal gacha hari ini nih, coba lagi besok yuk (5 kali)',
    };
  }

  const winnerCounts = await Promise.all(
    gachaRepository.prizeList.map((prize) =>
      gachaRepository.countPrizeWinners(prize.name)
    )
  );

  const availablePrizes = gachaRepository.prizeList.filter(
    (prize, index) => winnerCounts[index] < prize.quota
  );

  const isWin = Math.random() < 0.3;

  let wonPrize = null;

  if (isWin && availablePrizes.length > 0) {
    // pilih hadiah secara random dari yang masih ada kuota
    const randomIndex = Math.floor(Math.random() * availablePrizes.length);
    wonPrize = availablePrizes[randomIndex].name;
  }

  await gachaRepository.saveGachaLog(username, wonPrize, today);

  if (wonPrize) {
    return {
      success: true,
      message: 'Yeayy, Kamu berhasil memenangkan hadiahnya nih!',
      prize: wonPrize,
    };
  }
  return {
    success: true,
    message: 'Oh no...., kamu gagal nih. Coba lagi yuk!',
    prize: null,
  };
};

const getGachaHistory = async (username) => {
  const logs = await gachaRepository.getGachaHistoryByUser(username);

  const history = logs.map((log) => ({
    prize: log.prize || 'Tidak menang',
    date: log.gachaDate,
    createdAt: log.createdAt,
  }));

  return {
    success: true,
    username,
    totalGacha: logs.length,
    history,
  };
};

const getPrizeList = async () => {
  const winnerCounts = await Promise.all(
    gachaRepository.prizeList.map((prize) =>
      gachaRepository.countPrizeWinners(prize.name)
    )
  );

  const result = gachaRepository.prizeList.map((prize, index) => ({
    no: index + 1,
    prize: prize.name,
    totalQuota: prize.quota,
    winnersCount: winnerCounts[index],
    remaining: prize.quota - winnerCounts[index],
  }));

  return {
    success: true,
    prizes: result,
  };
};

const maskName = (name) => {
  const words = name.split(' ');
  const maskedWords = words.map((word) => {
    if (word.length <= 1) return word;

    let masked = word[0];
    for (let i = 1; i < word.length - 1; i += 1) {
      masked += Math.random() < 0.6 ? '*' : word[i];
    }
    masked += word[word.length - 1];
    return masked;
  });
  return maskedWords.join(' ');
};

const getWinnersList = async () => {
  const allWinners = await Promise.all(
    gachaRepository.prizeList.map((prize) =>
      gachaRepository.getWinnersByPrize(prize.name)
    )
  );

  const result = gachaRepository.prizeList.map((prize, index) => ({
    prize: prize.name,
    winners: allWinners[index].map((w) => maskName(w.username)),
  }));

  return {
    success: true,
    data: result,
  };
};

module.exports = {
  doGacha,
  getGachaHistory,
  getPrizeList,
  getWinnersList,
};
