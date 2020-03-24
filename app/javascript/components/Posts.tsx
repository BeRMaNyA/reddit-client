import * as React from 'react'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import userStore from '../stores/userStore' 

interface PostsProps {
  userStore?: typeof userStore
}

@inject('userStore')
@observer

class Posts extends React.Component<PostsProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { userStore } = this.props;
    const { currentUser } = userStore;

    return (
      <div>
        Hello {currentUser.name}
      </div>
    )
  }
}

export default Posts;
