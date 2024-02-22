import { Injectable, NotFoundException } from '@nestjs/common';

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
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    } else {
      return post;
    }
  }

  createPost(author: string, title: string, content: string) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentConut: 0,
    };

    // 기존 포스트 리스트에 새롭게 만든 포스트들을 추가
    posts = [...posts, post];

    // 결과값으로는 리소스를 최대한 줄이기 위해 생성된 포스트만 리턴값으로 제공
    return post;
  }

  updatePost(postId: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === postId);

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

    // map 으로 id 체크 후 맞으면 변경
    posts = posts.map((prePost) => (prePost.id === postId ? post : prePost));

    return post;
  }

  deletePost(postId: number) {
    const post = posts.find((post) => post.id === postId);
    posts = posts.filter((post) => post.id !== postId);

    if (!post) {
      throw new NotFoundException();
    } else {
      return `선택하신 ${postId}번 게시물이 삭제되었습니다`;
    }
  }
}
