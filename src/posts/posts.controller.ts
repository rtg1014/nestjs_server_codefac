import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
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
    id:2,
    author : 'newjeans_official',
    title : '뉴진스 하니',
    content : '춤연습을 하는 하니',
    likeCount : 10000,
    commentConut : 2000
  },
  
  {
    id:3,
    author : 'aespa_official',
    title : '에스파 윈터',
    content : '노래 연습중인 윈터',
    likeCount : 10000,
    commentConut : 2000
  }
]


  // 1) GET /posts
  //    모든 posts 를 가져온다.
  
  // 2) GET /posts/:id
  //    id에 해당하는 posts 를 가져온다.

  // 3) POST /posts
  //    post 를 생성한다.

  // 4) PUT /posts/:id
  //    id에 해당하는 post를 변경하거나 없으면 생성한단 (patch 와 다른점)

  // 5) DELETE /posts/:id
  //    id에 해당하는 posts 를 삭제한다.

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(){
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') id:string){
    const post = posts.find((post)=>post.id === +id)

    if(!post){
      throw new NotFoundException()
    }else{
      return post
    }
  }

  @Post()
  postPosts(
    @Body('author') author : string,
    @Body('title') title : string,
    @Body('content') content : string
  ){
    const post = {
      id : posts[posts.length -1].id +1,
      author,
      title,
      content,
      likeCount:0,
      commentConut:0
    }

    // 기존 포스트 리스트에 새롭게 만든 포스트들을 추가
    posts = [
      ...posts,
      post,
    ];

    // 결과값으로는 리소스를 최대한 줄이기 위해 생성된 포스트만 리턴값으로 제공
    return post

  }
  
  @Put(':id')
  putPost(
    @Param('id') id:string,
    @Body('author') author? : string,
    @Body('title') title? : string,
    @Body('content') content? : string
  ){
    const post = posts.find((post)=>post.id === +id)

    if(!post){
      throw new NotFoundException()
    }

    if(author){
      post.author = author
    }

    if(title){
      post.title = title
    }

    if(content){
      post.content = content
    }

    // map 으로 id 체크 후 맞으면 변경
    posts = posts.map((prePost)=>prePost.id === +id ? post : prePost)

    return post;
  }

  @Delete(':id')
  deltePost(
    @Param('id') id:string
  ){
    const post = posts.find((post)=>post.id === +id)
    posts = posts.filter((post)=> post.id !== +id)
    
    if(!post) {
      throw new NotFoundException()
    }else{
      return `선택하신 ${id}번 게시물이 삭제되었습니다`
    }
    

  }

}
