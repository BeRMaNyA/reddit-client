import { observable,  action } from 'mobx';
import { computedFn } from 'mobx-utils';

import { PostT, Image } from '../types'
import Gallery from '../services/gallery'
 
class GalleryStore {
  @observable images: Image[] = [];
  @observable loading: boolean;

  constructor() {
    Gallery.load().then((result) =>
      this.images = result.data
    );
  }

  @action save(post_id: string, title: string, src: string) {
    return Gallery.save(post_id, title, src).then((result) =>
      this.images.unshift(result.data)
    );
  }

  @action remove(post_id: string) {
    return Gallery.remove(post_id).then(() =>
      this.images = this.images.filter((image) => image.post_id != post_id)
    );
  }

  isStored = computedFn(function isStored(post_id: string) {
    return this.images.find((img) => img.post_id == post_id);
  });

  findIndex = computedFn(function findIndex(image: Image) {
    return this.images.findIndex((img) => img.post_id == image.post_id);
  });
}

export default new GalleryStore();
