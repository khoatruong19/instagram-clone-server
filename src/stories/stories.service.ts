import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowersService } from 'src/followers/followers.service';
import { Story } from 'src/typeorm';
import { In, Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private readonly storiesRepository: Repository<Story>,
    private readonly followersService: FollowersService,
  ) {}

  formatStoriesByUser(storiesByUser: Story[]) {
    return {
      author: storiesByUser[0].author,
      stories: _.map(storiesByUser, (story) => {
        return _.omit(story, 'author');
      }),
    };
  }

  async getMyStories(currentUserId: number) {
    const stories = await this.storiesRepository.find({
      where: {
        author: {
          id: currentUserId,
        },
      },
      relations: {
        author: true,
      },
    });

    const formatedStories = this.formatStoriesByUser(stories);

    return formatedStories;
  }

  async getStoriesOfFollowingUsers(currentUserId: number) {
    const followingIds = await this.followersService.getFollowedUsersIds(
      currentUserId,
    );

    if (_.isEmpty(followingIds)) return [];

    let stories: Story[] = [];

    stories = await this.storiesRepository.find({
      where: {
        author: {
          id: In(followingIds),
        },
      },
      relations: {
        author: true,
      },
    });

    if (_.isEmpty(stories)) return [];

    const gatheredWithSameUserStories = [];

    followingIds.forEach((id) => {
      const storiesByUser = stories.filter((story) => story.author.id === id);
      if (!_.isEmpty(storiesByUser)) {
        gatheredWithSameUserStories.push(
          this.formatStoriesByUser(storiesByUser),
        );
      }
    });

    return gatheredWithSameUserStories;
  }

  async getStories(currentUserId: number) {
    const [myStories, followedUsersStories] = await Promise.all([
      this.getMyStories(currentUserId),
      this.getStoriesOfFollowingUsers(currentUserId),
    ]);

    return [myStories, ...followedUsersStories];
  }

  async createStories(data: CreateStoryData) {
    const { authorId, files } = data;

    const stories = await Promise.all(
      files.map((file) => {
        const story = this.storiesRepository.create({
          author: { id: authorId },
          filename: file.filename,
          url: 'stories/images/' + file.filename,
        });

        return this.storiesRepository.save(story);
      }),
    );

    return stories;
  }
}
