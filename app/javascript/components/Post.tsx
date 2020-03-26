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
      <div className="Post" bp="grid vertical-center 8--max">
        <div className="thumbnail" bp="1">
          <img width="100" src={ this.getThumbnail(post) } />
        </div>

        <div className="media-body" bp="8">
          <div className="text-right">
            <span title="dismiss">
              <i className="fa fa-times"></i>
            </span>
          </div>

          <h4>
            { post.title }
          </h4>	

          <p className="text-right">
            { post.author }

            <span>{ post.num_comments } <i className="fa fa-comments"></i></span>
            <span>{post.created}</span>
          </p>
        </div>
      </div>
    )
  }

  private

  getThumbnail(post) {
    switch (post.thumbnail) {
      case 'self':
        return 'https://www.reddit.com/static/self_default2.png';
        break;
      case 'default':
        return 'https://www.reddit.com/static/noimage.png';
        break;
      case 'nsfw':
        return 'https://www.reddit.com/static/nsfw2.png';
        break;
      default:
        return post.thumbnail;
        break;
    }
  }
}

export default Post;
