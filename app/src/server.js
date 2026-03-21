const express = require('express');
const app = express();

const PORT = 4000;

app.use(express.static(__dirname + '/public'));

// Root route
app.get('/', (req, res) => {
  res.send('🚀 DevSecOps Pipeline App is Running');
});

// Health check (for Kubernetes later)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// API endpoint (for UI later)
app.get('/api/status', (req, res) => {
  res.json({
    status: 'Running',
    environment: 'Production',
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
