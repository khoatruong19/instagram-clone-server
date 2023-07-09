import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Follower } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FollowersService {
  constructor(
    @InjectRepository(Follower)
    private readonly followersRepository: Repository<Follower>,
  ) {}

  async getFollowedUsersIds(currentUserId: number) {
    const followers = await this.followersRepository.find({
      where: {
        followedUser: {
          id: currentUserId,
        },
      },
      relations:{
        followerUser: true
      },
      select:{
        followerUser:{
          id: true
        }
      }
    });

    const ids = _.map(followers, (follower) => follower.followerUser.id)
    return ids
  }
}
