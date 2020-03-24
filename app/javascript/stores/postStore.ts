import { observable, action } from 'mobx'
import { Posts } from 'utils/request'

class PostStore {
  @observable posts: [] = []; 

  constructor() {
    Posts.list().then((result) => {
      this.setPosts(result.data.data.children);

    });
  }

  @action setPosts(posts) {
    console.log(posts);
    this.posts = posts;
  }
}

export default new PostStore();
