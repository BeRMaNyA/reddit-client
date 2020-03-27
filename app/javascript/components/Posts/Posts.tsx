import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import InfiniteScroll from 'react-infinite-scroller';

import { PostT } from 'types'

import userStore from 'stores/userStore' 
import postStore from 'stores/postStore'

import Post from './Post'
import HandleImageButton from '../Shared/HandleImageButton'

import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

interface Props {
  userStore: typeof userStore
  postStore: typeof postStore
  setFixedClass: Function
}

interface State {
  currentPost: PostT | null
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
      currentPost: post,
      isOpen: true
    })
  }

  closeViewer() {
    this.setState({ isOpen: false });
  }

  dismiss(post: PostT) {
    this.props.postStore.dismiss(post);
  }

  render() {
    const { userStore, postStore } = this.props;

    return (
      <>
        <div className="Posts">
          { postStore.loading && 'Loading Posts...' }

          <InfiniteScroll
              loadMore={() => postStore.loadPosts() }
              hasMore={this.state.hasMore}
          >
            { postStore.posts.map((post, index) =>
                <Post key={index} post={post} openViewer={this.openViewer.bind(this)} dismiss={this.dismiss.bind(this)} />
              )
            }
          </InfiniteScroll>
        </div>

        { this.state.isOpen &&
          <Lightbox
              mainSrc={decodeURI(this.state.currentPost.preview)}
              onCloseRequest={() => this.closeViewer() }
              toolbarButtons={[
                <HandleImageButton post={this.state.currentPost} />
              ]}
          />
        }
      </>
    )
  }
}

export default Posts;
