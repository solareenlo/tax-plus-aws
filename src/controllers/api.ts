import { Request, Response, NextFunction } from 'express';

export const home = (req: Request, res: Response, next: NextFunction) => {
  const posts = [
    {
      id: '123',
      title: 'First title',
      content: 'First content',
      imagePath: 'http://localhost:3001/images'
    },
    {
      id: '456',
      title: 'Secont title',
      content: 'Secont content',
      imagePath: 'http://localhost:3001/images'
    },
    {
      id: '456',
      title: 'Secont title',
      content: 'Secont content',
      imagePath: 'http://localhost:3001/images'
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
    const url = `${req.protocol}://${req.get('host')}`;
    const post = {
      title: req.body.title,
      content: req.body.content,
      imagePath: `${url}/images/${req.file.filename}`
    };
    const id = Date.now();
    // const post = req.body;
    console.log(post);
    res.status(200).json({
      message: 'Post success!!!',
      post: {
        id: id,
        title: post.title,
        content: post.content,
        iamgePath: post.imagePath
      }
    });
  } catch {
    res.status(500).send('Server Error!');
  }
};
