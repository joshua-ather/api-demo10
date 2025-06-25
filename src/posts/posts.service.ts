import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    { id: 1, title: 'Judul Pertama', content: 'Konten pertama' },
    { id: 2, title: 'Judul Kedua', content: 'Konten kedua' },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }

  create(createPostInput: CreatePostInput): Post {
    const newPost = {
      id: this.posts.length + 1,
      ...createPostInput,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(updatePostInput: UpdatePostInput): Post {
    const index = this.posts.findIndex(p => p.id === updatePostInput.id);
    // if (index < 0) return [];

    this.posts[index] = {
      ...this.posts[index],
      ...updatePostInput,
    };
    return this.posts[index];
  }

  remove(id: number): boolean {
    const index = this.posts.findIndex(p => p.id === id);
    if (index < 0) return false;
    this.posts.splice(index, 1);
    return true;
  }
}
