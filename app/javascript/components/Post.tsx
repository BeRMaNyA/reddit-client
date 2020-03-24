import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import postStore from '../stores/postStore' 

interface PostProps {
  postStore?: typeof postStore
  post: any
}

@inject('postStore')
@observer

class Post extends React.Component<PostProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { post } = this.props;

    return (
      <div className="Post">
        <div className="Post__title">{post.data.title}</div>
      </div>
    )
  }
}

export default Post;
