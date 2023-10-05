const express = require('express');

const PORT = process.env.PORT || 8070;

const app = express();

app.listen(PORT, () => {
  console.log(`Server starting on ${PORT} port`);
});

app.get('/api', (req, res) => {
  return res.json({
    message: 'Hello Omega',
  });
});
