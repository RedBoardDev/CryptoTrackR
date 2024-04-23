import app from './app';

const PORT = process.env.PORT || 4000;

app.get('/health', (_, res) => {
  res.send('Server is healthy');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
