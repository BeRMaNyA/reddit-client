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

  render() {
    const { userStore, postStore } = this.props;
    const { currentUser } = userStore;

    const topPosts = postStore.posts.map((post) => {
      return <Post key={post.data.id} post={post} />
    });

    return (
      <div>
        Hello {currentUser.name}

        <div className="posts">
          {topPosts}
        </div>
      </div>
    )
  }
}

export default Posts;
