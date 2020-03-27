import * as React from 'react'
import { inject, observer } from 'mobx-react'
import galleryStore from 'stores/galleryStore' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import { PostT } from 'types'

interface ButtonState {
  hidden: boolean
}

interface ButtonProps {
  galleryStore?: typeof galleryStore
  post: PostT
  close: Function
}

@inject('galleryStore')
@observer

class SaveImageButton extends React.Component<ButtonProps, ButtonState> {
  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
    this.state = { hidden: this.isStored() };
  }

  save() {
    this.props.galleryStore.saveImage(this.props.post).then(() => {
      this.setState({ hidden: true });

      setTimeout(() => this.props.close(), 500);
    })
  }

  render() {
    if (this.state.hidden) return (null);

    return (
      <button className="SaveImageButton" onClick={this.save}>
        <FontAwesomeIcon icon={faSave} />
      </button>
    )
  }

  private

  isStored() {
    return this.props.galleryStore.images.find((img) => img.post_id == this.props.post.id)
  }
}

export default SaveImageButton;
