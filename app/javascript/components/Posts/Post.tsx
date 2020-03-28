import * as React from 'react'
import * as moment from 'moment'

import { Route, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { PostT } from 'types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

interface Props {
  post: PostT
  openViewer: Function
  dismiss: Function
  read: Function
}

function Post({ post, openViewer, dismiss, read }: Props) {
  const getThumbnail = (thumbnail: string) => {
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
  };

  const formatDate = (created: number) => {
    return moment.unix(created).format('MMMM Do YYYY');
  };

  return (
    <div className="Post" bp="grid vertical-start 8--max">
      <div className="thumbnail" bp="1">
        <img width="100" src={ getThumbnail(post.thumbnail) } onClick={ () => openViewer(post) } />
        <small className="author">{ post.author }</small>
        <br />
        <small className="created">{ formatDate(post.created) }</small>
      </div>

      <div className="media-body" bp="10">
        <a className="dismiss" onClick={ () => dismiss(post) }>
          <FontAwesomeIcon icon={faTimes} />
        </a>

        <h4 onClick={() => read(post) }>{ post.title }</h4>	
      </div>
    </div>
  )
}

export default Post;
