import * as React from 'react'
import { inject, observer } from 'mobx-react'
import galleryStore from 'stores/galleryStore' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'

import { PostT } from 'types'

interface ButtonState {
  isStored: boolean
}

interface ButtonProps {
  galleryStore?: typeof galleryStore
  post: PostT
  close: Function
}

@inject('galleryStore')
@observer

class HandleImageButton extends React.Component<ButtonProps, ButtonState> {
  constructor(props) {
    super(props);

    this.state = {
      isStored: this.props.galleryStore.isStored(this.props.post)
    };

    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
  }

  save() {
    this.props.galleryStore.save(this.props.post).then(() => {
      this.setState({ isStored: true });
    })
  }

  remove() {
    this.props.galleryStore.remove(this.props.post).then(() => {
      this.setState({ isStored: false });
    })
  }

  render() {
    if (this.state.isStored)
      return this.removeBtn;
    else
      return this.saveBtn;
  }

  private

  get saveBtn() {
    return (
      <button className="SaveImageButton" onClick={this.save}>
        <FontAwesomeIcon icon={faSave} />
      </button>
    )
  }

  get removeBtn() {
    return (
      <button className="RemoveImageButton" onClick={this.remove}>
        <FontAwesomeIcon icon={faTrash} />
      </button>
    )
  }
}

export default HandleImageButton;
