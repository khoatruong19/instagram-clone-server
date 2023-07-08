import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post, PostImage } from 'src/typeorm';
import { deleteUploadFile } from 'src/utils/files';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(PostImage)
    private readonly postImagesRepository: Repository<PostImage>,
  ) {}

  async addPostImages(images: Array<Express.Multer.File>, postId: number) {
    return Promise.all(
      images.map((image) => {
        const newImage = this.postImagesRepository.create({
          post: { id: postId },
          url: 'posts/images/' + image.filename,
          filename: image.filename,
        });

        return this.postImagesRepository.save(newImage);
      }),
    );
  }

  async deletePostImages(images: PostImage[]) {
    return Promise.all(
      images.map(async (image) => {
        const isFileDeleted = await deleteUploadFile(image.filename);
        if (!isFileDeleted)
          throw new NotImplementedException('Cant delete uploaded file!');

        return this.postImagesRepository.delete({ id: image.id });
      }),
    );
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postsRepository.find({
      relations: {
        author: true,
        images: true,
      },
    });
  }

  async getPostById(postId: number): Promise<Post>{
    return await this.postsRepository.findOne({where: {id: postId}})
  }

  async createPost(data: CreatePostData): Promise<Post> {
    const { authorId, caption, images } = data;

    const newPost = this.postsRepository.create({
      author: { id: authorId },
      caption,
    });

    const savedPost = await this.postsRepository.save(newPost);

    if (!savedPost)
      throw new NotImplementedException(
        'Something wrong when create post. Try again!',
      );

    const newImages = await this.addPostImages(images, savedPost.id);

    return { ...savedPost, images: newImages };
  }

  async updatePost(data: UpdatePostData): Promise<any> {
    const { authorId, postId, caption, images } = data;

    let existingPost = await this.postsRepository.findOne({
      where: { id: postId, author: { id: authorId } },
      relations: {
        author: true,
      },
      select: {
        id: true,
        author: { id: true },
        caption: true,
      },
    });

    if (!existingPost) throw new NotFoundException('Post is not found!');
    if (caption) existingPost = { ...existingPost, caption };

    let newImages: PostImage[] = [];

    if (images.length > 0) {
      newImages = await this.addPostImages(images, existingPost.id);
      await this.deletePostImages(existingPost.images);
    }

    if(newImages.length > 0)
    existingPost = { ...existingPost, images: newImages };

    return await this.postsRepository.save(existingPost);
  }

  async deletePost(data: DeletePostData): Promise<string> {
    const { authorId, postId } = data;

    const existingPost = await this.postsRepository.findOne({
      where: { id: postId },
      relations: {
        author: true,
      },
      select: {
        id: true,
        author: { id: true },
      },
    });

    if (!existingPost) throw new NotFoundException('Post is not found!');

    if (existingPost.author.id !== authorId)
      throw new BadRequestException('You are not the owner of this post!');

    await this.deletePostImages(existingPost.images);

    await this.postsRepository.delete({ id: existingPost.id });

    return 'Post deleted successfully!';
  }
}
