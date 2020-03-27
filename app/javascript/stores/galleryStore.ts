import { observable,  action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { PostT, Image } from '../types'
import Gallery from '../services/gallery'
 
class GalleryStore {
  @observable images: Image[] = [];
  @observable loading: boolean;

  constructor() {
    Gallery.load().then((result) => {
      this.images = result.data;
    });
  }

  @action save(post: PostT) {
    return Gallery.save(post).then((result) => {
      this.images.push(result.data);
    });
  }

  @action remove(post: PostT) {
    return Gallery.remove(post).then((result) => {
      this.images = result.data;
    });
  }

  isStored = computedFn(function isStored(post: PostT) {
    return this.images.find((img) => img.post_id == post.id);
  });
}

export default new GalleryStore();
