import { observable, action } from 'mobx'
import { PostT } from 'types'
import Posts from 'services/posts'

class PostStore {
  @observable posts: PostT[] = []; 
  @observable loading: boolean;
  @observable after: string | null = null;

  @action loadPosts() {
    if (this.loading) return;

    this.loading = true;

    const params = {
      limit: 30,
      raw_json: 1,
      after: this.after
    };

    return Posts.list(params).then((result) => {
      this.posts = this.posts.concat(
        this.decorate(result.data.data.children)
      );

      this.after = result.data.data.after;
    })
    .then(() => this.loading = false);
  }

  @action dismiss(post: PostT) {
    post.hidden = true

    const i: number = this.posts.findIndex((p) => p === post);

    this.posts.splice(i, 1, post);

    setTimeout(() => {
      this.posts.splice(i, 1);
    }, 500)
  }

  private

  decorate(posts) {
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
        downs: post.downs,
        ups: post.ups,
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
