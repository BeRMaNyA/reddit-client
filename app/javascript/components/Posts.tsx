import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import userStore from '../stores/userStore' 
import postStore from '../stores/postStore'

import Post from './Post'

interface PostsProps {
  userStore?: typeof userStore
  postStore?: typeof postStore
}

@inject('userStore')
@inject('postStore')
@observer

class Posts extends React.Component<PostsProps> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.postStore.loadPosts();
  }

  render() {
    const { userStore, postStore } = this.props;
    const { currentUser } = userStore;

    return (
      <div className="Posts">
        <p>Hello {currentUser.name}</p>

        { postStore.loading && 'Loading Posts...' }

        {
          postStore.posts.map((post, index) =>
            <Post key={index} post={post} />
          )
        }
      </div>
    )
  }
}

export default Posts;
