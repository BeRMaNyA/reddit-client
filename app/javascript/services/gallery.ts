import Base from './base'
import { PostT } from 'types'

class Gallery extends Base {
  static load() {
    return this.get('/api/v1/gallery');
  }

  static save(post: PostT) {
    return this.post('/api/v1/gallery', {
      image: {
        post_id: post.id,
        title: post.title,
        src: post.preview
      }
    });
  }

  static remove(post: PostT) {
    return this.delete(`/api/v1/gallery/${post.id}`);
  }
}

export default Gallery;
