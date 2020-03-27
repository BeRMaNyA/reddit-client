import Base from './base'

class Gallery extends Base {
  static loadImages() {
    return this.get('/api/v1/gallery');
  }

  static saveImage(post) {
    return this.post('/api/v1/gallery', {
      image: {
        post_id: post.id,
        title: post.title,
        src: post.preview
      }
    });
  }
}

export default Gallery;
