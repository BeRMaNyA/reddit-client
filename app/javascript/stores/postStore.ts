import { observable, action } from 'mobx'
import { Post } from 'types'
import Posts from 'services/posts'

class PostStore {
  @observable posts: Post[] = []; 
  @observable loading: Boolean;

  @action loadPosts() {
    this.loading = true;

    Posts.list()
      .then((result) => {
        this.posts = this.decorate(result.data.data.children)
      })
      .then(() => {
        this.loading = false
      });
  }

  private

  decorate(posts): Post[] {
    return posts.map((post) => {
      post = post.data;
      
      return {
        id: post.id,
        author: post.author,
        name: post.name,
        title: post.title,
        thumbnail: post.thumbnail,
        score: post.score,
        down: post.downs,
        ups: post.ups,
        link: post.link,
        preview: post.preview,
        is_video: post.is_video,
        permalink: post.permalink,
        icon_url: post.icon_url,
        url: post.url,
        num_comments: post.num_comments,
        created: post.created
      }
    })
  }
}

export default new PostStore();
