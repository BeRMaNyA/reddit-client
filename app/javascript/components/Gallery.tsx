import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import galleryStore from 'stores/galleryStore' 

import { Image } from 'types'

import HandleImageButton from './Shared/HandleImageButton'

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

interface State {
  isOpen: boolean
  index: number
}

interface Props {
  galleryStore: typeof galleryStore
  setFixedClass: Function
}

@inject('galleryStore')
@observer

class Gallery extends React.Component<Props, State> {
  state: Readonly<State> = {
    isOpen: false,
    index: 0
  };

  openViewer(image: Image) {
    const index: number = this.props.galleryStore.findIndex(image);

    this.setState({
      isOpen: true,
      index: index
    });
  }

  closeViewer() {
    this.setState({ isOpen: false })
  }

  render() {
    const { images } = this.props.galleryStore;
    const { isOpen, index } = this.state;

    const nextImage = images[(index + 1) % images.length],
          prevImage = images[(index + images.length - 1) % images.length]

    return (
      <>
        <div className="Gallery" bp="grid">
          { images.map((image, i) => 
              <div key={ i } bp="4">
                <img src={ image.src } onClick={ this.openViewer.bind(this, image) }/>
              </div>
            )
          }
        </div>

        { (isOpen && (nextImage || prevImage)) &&
          <Lightbox
              mainSrc={images[index].src}
              nextSrc={nextImage.src}
              prevSrc={prevImage.src}
              onMovePrevRequest={() =>
                this.setState({
                  index: (index + images.length - 1) % images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  index: (index + 1) % images.length,
                })
              }
              onCloseRequest={() => this.closeViewer() }
              toolbarButtons={[
                <HandleImageButton image={images[index]} />
              ]}
          />
        }
      </>
    )
  }
}

export default Gallery;
