import { observable, action } from 'mobx'
import { PostT } from 'types'
import Posts from 'services/posts'

class PostStore {
  @observable posts: PostT[] = []; 
  @observable loading: boolean;

  @action loadPosts() {
    this.loading = true;

    return Posts.list()
      .then((result) => {
        this.posts = this.decorate(result.data.data.children)
      })
      .then(() => {
        this.loading = false
      });
  }

  private

  decorate(posts): PostT[] {
    return posts.map((post) => {
      post = post.data;
      const preview: null | string = post.preview && decodeURI(post.preview.images[0].source.url)
      
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
        preview: preview,
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
