module.exports = (db) =>
  db.model(
    'Gacha',
    db.Schema(
      {
        userEmail: {
          type: String,
          required: true,
        },

        prize: {
          type: String,
          default: null,
        },

        gachaDate: {
          type: String,
          required: true,
        },
      },
      {
        timestamps: true,
      }
    )
  );
