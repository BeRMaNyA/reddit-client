import * as React from 'react'
import { inject, observer } from 'mobx-react'
import galleryStore from 'stores/galleryStore' 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrash } from '@fortawesome/free-solid-svg-icons'

import { PostT } from 'types'

interface State {
  isStored: boolean
}

interface Props {
  galleryStore?: typeof galleryStore
  post: PostT
  close: Function
}

@inject('galleryStore')
@observer

class HandleImageButton extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isStored: this.props.galleryStore.isStored(props.post)
    };
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
