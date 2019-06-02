import { Request, Response, NextFunction } from 'express';

export const home = (req: Request, res: Response, next: NextFunction) => {
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
};

export const calculate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const post = req.body;
    console.log(post);
    res.status(200).json({
      message: 'Post success!!!',
      crypto: req.body.crypto,
      exchange: req.body.exchange,
      file: req.body.file
    });
  } catch {
    res.status(500).send('Server Error!');
  }
};
