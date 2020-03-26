import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import userStore from '../stores/userStore' 
import postStore from '../stores/postStore'

import Post from './Post'

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

interface PostsProps {
  userStore: typeof userStore
  postStore: typeof postStore
}

interface PostsState {
  imgSrc: string | null
  isOpen: boolean
}

@inject('userStore')
@inject('postStore')
@observer

class Posts extends React.Component<PostsProps, PostsState> {
  constructor(props) {
    super(props);

    this.state = {
      imgSrc: null,
      isOpen: false
    }
  }

  componentDidMount() {
    this.props.postStore.loadPosts();
  }

  openViewer(img: string) {
    this.setState({
      imgSrc: img,
      isOpen: true
    })
  }

  closeViewer() {
    this.setState({ isOpen: false })
  }

  render() {
    const { userStore, postStore } = this.props;
    const { currentUser } = userStore;

    return (
      <>
        <div className="Posts">
          { postStore.loading && 'Loading Posts...' }

          { postStore.posts.map((post, index) =>
              <Post key={index} post={post} openViewer={this.openViewer.bind(this)} />
            )
          }
        </div>

        { this.state.isOpen &&
          <Lightbox
              mainSrc={this.state.imgSrc}
              onCloseRequest={() => this.closeViewer() }
          />
        }

      </>
    )
  }
}

export default Posts;
