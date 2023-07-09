import { Controller, Get, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuardJwt } from 'src/common/guards/auth-guard.jwt';
import { User } from 'src/typeorm';
import { StoriesService } from './stories.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { storageOptions } from 'src/config/storage.config';

@Controller('stories')
export class StoriesController {
  constructor(
    private readonly storiesService: StoriesService,
  ) {}

  @Get()
  @UseGuards(AuthGuardJwt)
  getStories(@CurrentUser() user: User) {
    return this.storiesService.getStories(user.id);
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(FilesInterceptor('files', 10, storageOptions))
  createStories(@UploadedFiles() files: Array<Express.Multer.File>, @CurrentUser() user: User) {
    return this.storiesService.createStories({authorId: user.id, files})
  }
}
