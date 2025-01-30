require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3800;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
