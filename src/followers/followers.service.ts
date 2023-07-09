import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly followersRepository: Repository<Follower>,
  ) {}

  async getFollowedUsersIds(currentUserId: number) {
    return await this.followersRepository.find({
      where: {
        followedUser: {
          id: currentUserId,
        },
      },
    });
  }
}
