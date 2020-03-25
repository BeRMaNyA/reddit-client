import { observable, action } from 'mobx'
import  Posts from 'services/posts'

interface Post {
  data: any
}

class PostStore {
  @observable posts: Post[] = []; 

  constructor() {
    Posts.list().then((result) => {
      this.setPosts(result.data.data.children);
    });
  }

  @action setPosts(posts) {
    this.posts = posts;
  }
}

export default new PostStore();
