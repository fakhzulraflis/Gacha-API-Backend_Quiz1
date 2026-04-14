module.exports = (db) =>
  db.model(
    'GachaLog',
    db.Schema(
      {
        username: {
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
