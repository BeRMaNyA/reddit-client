import * as React from 'react'
import { inject, observer } from 'mobx-react'
import galleryStore from 'stores/galleryStore' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'

import { PostT, Image } from 'types'

interface State {
  isStored: boolean
}

interface Props {
  galleryStore?: typeof galleryStore
  post?: PostT
  image?: Image
}

@inject('galleryStore')
@observer

class HandleImageButton extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const postId = props.post ? props.post.id : props.image.post_id;

    this.state = {
      isStored: this.props.galleryStore.isStored(postId)
    };
  }

  save() {
    const { image, post } = this.props;

    const id    = post ? post.id      : image.post_id,
          title = post ? post.title   : image.title,
          src   = post ? post.preview : image.src;

    this.props.galleryStore.save(id, title, src).then(() =>
      this.setState({ isStored: true })
    );
  }

  remove() {
    const { image, post } = this.props;
    const id = post ? post.id : image.post_id;

    this.props.galleryStore.remove(id).then(() =>
      this.setState({ isStored: false })
    );
  }

  render() {
    if (this.state.isStored)
      return this.removeBtn();
    else
      return this.saveBtn();
  }

  private

  saveBtn() {
    return (
      <button className="SaveImageButton" onClick={this.save.bind(this)}>
        <FontAwesomeIcon icon={faSave} />
      </button>
    )
  }

  removeBtn() {
    return (
      <button className="RemoveImageButton" onClick={this.remove.bind(this)}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    )
  }
}

export default HandleImageButton;
