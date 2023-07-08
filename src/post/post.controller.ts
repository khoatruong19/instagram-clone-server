import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuardJwt } from 'src/common/guards/auth-guard.jwt';
import { storageOptions } from 'src/config/storage.config';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from 'src/typeorm';
import { Response } from 'express';
import { join } from 'path';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Get()
  getAll() {
    return this.postsService.getAllPosts();
  }

  
  @Get(":postid")
  getOne(@Param('postid', ParseIntPipe) postId) {
    return this.postsService.getPostById(postId);
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(FilesInterceptor('files', 10, storageOptions))
  async createPost(
    @CurrentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createPostInput: CreatePostDto,
  ) {
    if (files.length === 0)
      throw new BadRequestException('Please upload at least 1 image!');
    const newPost = await this.postsService.createPost({
      ...createPostInput,
      images: files,
      authorId: user.id,
    });
    return newPost;
  }

  @Get('images/:imagename')
  findPostImage(@Param('imagename') imagename, @Res() res: Response) {
    return res.sendFile(join(process.cwd(), 'upload/' + imagename));
  }

  @Patch(':postid')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(FilesInterceptor('files', 10, storageOptions))
  updatePost(
    @CurrentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('postid', ParseIntPipe) postId,
    @Body() createPostInput: UpdatePostDto
  ) {
    return this.postsService.updatePost({
      authorId: user.id,
      postId,
      images: files,
      ...createPostInput
    });
  }

  @Delete(':postid')
  @UseGuards(AuthGuardJwt)
  deletePost(@CurrentUser() user: User, @Param('postid', ParseIntPipe) postId) {
    return this.postsService.deletePost({ authorId: user.id, postId });
  }
}
