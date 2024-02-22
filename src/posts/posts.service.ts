/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentConut: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '메이크업 고치고 있는 민지',
    likeCount: 10000,
    commentConut: 2000,
  },

  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 하니',
    content: '춤연습을 하는 하니',
    likeCount: 10000,
    commentConut: 2000,
  },

  {
    id: 3,
    author: 'aespa_official',
    title: '에스파 윈터',
    content: '노래 연습중인 윈터',
    likeCount: 10000,
    commentConut: 2000,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: id,
      },
    });
    if(!post){
      throw new NotFoundException();
    }
    return post
  }

  async createPost(author: string, title: string, content: string) {
    // 1) create method -> 저장할 객체를 생성한다.
    // 2) save method -> 객체를 저장한다. (create 메서드에서 생성한 객체로)
    
    const post = this.postRepository.create({
      author,
      title,
      content,
      likeCount:0,
      commentCount:0,
    });
    
    const newPost = await this.postRepository.save(post)

    return newPost;

  }

  async updatePost(postId: number, author: string, title: string, content: string) {
    // save의 기능
    // 1) 만약 데이터가 없다면 (id 기준으로) 새롭게 생성한다.
    // 2) 만약 데이터가 존재한다면( id 기준으로 ) 존재하던 값을 변경(업데이트) 한다.
    
    const post = await this.postRepository.findOne({
      where:{
        id: postId,
      }
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    const newPost = await this.postRepository.save(post)

    return newPost;
  }

  async deletePost(postId: number) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      }
    })

    if (!post) {
      throw new NotFoundException();
    }

    await this.postRepository.delete(post)
    
    return `선택하신 ${postId}번 게시물이 삭제되었습니다`;
    
  }
}
