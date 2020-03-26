import * as React from 'react'
import * as moment from 'moment'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import postStore from 'stores/postStore' 
import { PostT } from 'types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface PostProps {
  postStore?: typeof postStore
  post: PostT
  openViewer: Function
}

@inject('postStore')
@observer

class Post extends React.Component<PostProps> {
  constructor(props) {
    super(props);
  }

  viewImage(post: PostT) {
    this.props.openViewer(decodeURI(post.preview));
  }

  render() {
    const { post } = this.props;

    return (
      <div className="Post" bp="grid vertical-start 8--max">
        <div className="thumbnail" bp="1">
          <img width="100" src={ this.getThumbnail(post.thumbnail) } onClick={ () => this.viewImage(post) } />
          <small className="author">{ post.author }</small>
          <br />
          <small className="created">{ this.formatDate(post.created) }</small>
        </div>

        <div className="media-body" bp="10">
          <span className="dismiss">
            <FontAwesomeIcon icon={faTimes} />
          </span>

          <h4>{ post.title }</h4>	
        </div>
      </div>
    )
  }

  private

  getThumbnail(thumbnail) {
    switch (thumbnail) {
      case 'self':
        return 'https://www.reddit.com/static/self_default2.png';
      case 'default':
        return 'https://www.reddit.com/static/noimage.png';
      case 'nsfw':
        return 'https://www.reddit.com/static/nsfw2.png';
      default:
        return thumbnail;
    }
  }

  formatDate(created) {
    return moment.unix(created).format('MMMM Do YYYY');
  }
}

export default Post;
