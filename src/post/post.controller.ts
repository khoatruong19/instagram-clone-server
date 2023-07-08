import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuardJwt } from 'src/common/guards/auth-guard.jwt';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { filesStorageSetting, storage } from 'src/config/storage.config';
import { Observable, of } from 'rxjs';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Get()
  getAll() {
    return this.postsService.getAllPosts();
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  createPost(@Body() data: CreatePostDto) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage
  }))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log({files})
    return "OK"
  }
}
