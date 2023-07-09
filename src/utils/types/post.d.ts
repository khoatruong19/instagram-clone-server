type CreatePostData = {
    caption: string;
    images: Array<Express.Multer.File>;
    authorId: number;
  };
  
  type DeletePostData = {
      authorId: number;
      postId: number
  };
    
  type UpdatePostData = {
      caption?: string
      images?: Array<Express.Multer.File>
      authorId: number
      postId: number
  }