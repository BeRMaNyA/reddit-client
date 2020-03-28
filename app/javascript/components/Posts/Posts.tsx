import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import InfiniteScroll from 'react-infinite-scroller'

import { PostT } from 'types'

import userStore from 'stores/userStore' 
import postStore from 'stores/postStore'

import Post from './Post'
import PostViewer from './PostViewer'
import HandleImageButton from '../Shared/HandleImageButton'

import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

interface Props {
  userStore: typeof userStore
  postStore: typeof postStore
  setFixedClass: Function
}

interface State {
  currentPost: PostT | null
  postImage: PostT | null
  isOpen: boolean
  hasMore: boolean
}

@inject('userStore')
@inject('postStore')
@observer

class Posts extends React.Component<Props, State> {
  private hasMore;

  state: Readonly<State> = {
    currentPost: null,
    postImage: null,
    isOpen: false,
    hasMore: false
  }

  componentDidMount() {
    this.props.postStore.loadPosts().then(() => {
      this.props.setFixedClass(false);
      this.setState({ hasMore: true });
    })
  }

  componentWillUnmount() {
    this.props.setFixedClass(true);
  }

  openViewer(post: PostT) {
    this.setState({
      postImage: post,
      isOpen: true
    })
  }

  closeViewer() {
    this.setState({ isOpen: false });
  }

  dismiss(post: PostT) {
    this.props.postStore.dismiss(post);
  }

  read(post: PostT) {
    this.setState({ currentPost: post })
    this.props.setFixedClass(true);
  }

  close() {
    this.setState({ currentPost: null })
    this.props.setFixedClass(true);
  }

  render() {
    const { userStore, postStore } = this.props;
    const { currentPost, postImage, isOpen } = this.state;

    return (
      <>
        <div className={ `Posts ${currentPost ? 'hide' : '' }` }>
          { postStore.loading && 'Loading Posts...' }

          <InfiniteScroll
              loadMore={() => postStore.loadPosts() }
              hasMore={this.state.hasMore}
          >
            { postStore.posts.map((post, index) =>
                <Post key={index}
                      post={post} 
                      openViewer={this.openViewer.bind(this)}
                      dismiss={this.dismiss.bind(this)}
                      read={this.read.bind(this)}
                />
             )}
          </InfiniteScroll>
        </div>

        { currentPost && 
          <PostViewer post={currentPost}
                      close={ this.close.bind(this)}
          />
        }

        { isOpen &&
          <Lightbox
              mainSrc={postImage.preview}
              onCloseRequest={() => this.closeViewer() }
              toolbarButtons={[
                <HandleImageButton post={postImage} />
              ]}
          />
        }
      </>
    )
  }
}

export default Posts;
