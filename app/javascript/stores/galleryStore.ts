import { observable, action, autorun } from 'mobx';
import { PostT } from 'types'
import Gallery from '../services/gallery'
 
class GalleryStore {
  @observable images: any[] = [];
  @observable loading: boolean;

  constructor() {
    Gallery.loadImages().then((result) => {
      this.images = result.data;
    });
  }

  @action saveImage(post: PostT) {
    return Gallery.saveImage(post).then((result) => {
      this.images.push(result);
    });
  }
}

export default new GalleryStore();
