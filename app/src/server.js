const express = require('express');
const client = require('prom-client');

const app = express();
const PORT = 4000;

// Default metrics (CPU, memory, etc.)
client.collectDefaultMetrics();

// Custom metric
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});

// Middleware
app.use((req, res, next) => {
  httpRequestCounter.inc();
  next();
});

// Your existing route
app.get('/', (req, res) => {
  res.send("DevSecOps App Running 🚀");
});

// 👉 THIS IS THE IMPORTANT PART
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
