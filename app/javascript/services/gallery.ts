import Base from './base'

class Gallery extends Base {
  static load() {
    return this.get('/api/v1/gallery');
  }

  static save(post_id: string, title: string, src: string) {
    return this.post('/api/v1/gallery', {
      image: {
        post_id: post_id,
        title: title,
        src: src
      }
    });
  }

  static remove(post_id: string) {
    return this.delete(`/api/v1/gallery/${post_id}`);
  }
}

export default Gallery;
