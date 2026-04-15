const express = require('express');

const gachaController = require('./gacha-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  // Melakukan gacha
  route.post('/', authMiddleware, gachaController.gacha);

  // Lihat histori gacha user
  route.get('/history', authMiddleware, gachaController.getHistory);

  // Lihat daftar hadiah + sisa kuota
  route.get('/prizes', gachaController.getPrizes);

  // Lihat daftar pemenang (nama disamarkan)
  route.get('/winners', gachaController.getWinners);
};
