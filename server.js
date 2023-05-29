import express from 'express';
import router from './router.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Use the router for handling routes starting with "/api"
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
