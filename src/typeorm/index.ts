import { Comment } from './entities/Comment';
import { CommentLike } from './entities/CommentLike';
import { Follower } from './entities/Follower';
import { Post } from './entities/Post';
import { PostImage } from './entities/PostImage';
import { PostLike } from './entities/PostLike';
import { Profile } from './entities/Profile';
import { Story } from './entities/Story';
import { User } from './entities/User';

const entities = [
  User,
  Profile,
  Follower,
  Post,
  PostLike,
  Comment,
  CommentLike,
  PostImage,
  Story
];

export default entities;

export {
  User,
  Profile,
  Follower,
  Post,
  PostLike,
  PostImage,
  Comment,
  CommentLike,
  Story
};
