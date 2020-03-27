import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { PostT } from 'types'

import userStore from 'stores/userStore' 
import postStore from 'stores/postStore'

import Post from './Post'
import SaveImageButton from './SaveImageButton'

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

interface PostsProps {
  userStore: typeof userStore
  postStore: typeof postStore
  setFixedClass: Function
}

interface PostsState {
  currentPost: PostT | null
  isOpen: boolean
}

@inject('userStore')
@inject('postStore')
@observer

class Posts extends React.Component<PostsProps, PostsState> {
  constructor(props) {
    super(props);

    this.state = {
      currentPost: null,
      isOpen: false
    }
  }

  componentDidMount() {
    this.props.postStore.loadPosts().then(() => {
      this.props.setFixedClass(false);
    })
  }

  componentWillUnmount() {
    this.props.setFixedClass(true);
  }

  openViewer(post: PostT) {
    this.setState({
      currentPost: post,
      isOpen: true
    })
  }

  closeViewer() {
    this.setState({ isOpen: false });
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
              mainSrc={decodeURI(this.state.currentPost.preview)}
              onCloseRequest={() => this.closeViewer() }
              toolbarButtons={[
                <SaveImageButton post={this.state.currentPost} close={() => this.closeViewer() }/>
              ]}
          />
        }

      </>
    )
  }
}

export default Posts;
