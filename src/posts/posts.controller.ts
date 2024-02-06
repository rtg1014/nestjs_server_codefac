import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel{
  id :number;
  author : string;
  title : string;
  content : string;
  likeCount : number;
  commentConut : number;
}

let posts : PostModel[] = [
  {
    id:1,
    author : 'newjeans_official',
    title : '뉴진스 민지',
    content : '메이크업 고치고 있는 민지',
    likeCount : 10000,
    commentConut : 2000
  },

  {
    id:1,
    author : 'newjeans_official',
    title : '뉴진스 민지',
    content : '메이크업 고치고 있는 민지',
    likeCount : 10000,
    commentConut : 2000
  },

  {
    id:1,
    author : 'newjeans_official',
    title : '뉴진스 하니',
    content : '춤연습을 하는 하니',
    likeCount : 10000,
    commentConut : 2000
  },
  
  {
    id:1,
    author : 'aespa_official',
    title : '에스파 윈터',
    content : '노래 연습중인 윈터',
    likeCount : 10000,
    commentConut : 2000
  }
]


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('')
  getPost():PostModel {
    return {
      id : 5,
      author : 'newjeans_official',
      title : '뉴진스 민지',
      content : '메이크업 고치고 있는 민지',
      likeCount : 10000,
      commentConut : 2000
    }
  }



}
