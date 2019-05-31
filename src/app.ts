import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/', (req, res, next) => {
  const posts = [
    {
      id: '123',
      title: 'First title',
      content: 'First content'
    },
    {
      id: '456',
      title: 'Secont title',
      content: 'Secont content'
    }
  ];
  res.status(200).json({
    message: 'fetch success',
    posts: posts
  });
});

app.post('/', (req, res, next) => {
  const post = req.body;
  console.log(req.body);
  res.status(200).json({
    message: 'Post success!!!'
  });
});

export default app;
