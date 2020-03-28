import * as React from 'react'
import { PostT } from 'types'

interface Props {
  post: PostT
  close: Function
}

function PostViewer({ post, close }: Props) {
  return (
    <>
      <div className="PostViewer">
        <a className="back" onClick={ () => close() }>Back</a>

        <h1>{ post.title }</h1>

        <div className="grid" bp="grid">
          <div bp="12 4@md 4@lg">
            <img src={ post.preview } />
          </div>
          <div bp="12 8@md 8@lg">
            <ul className="clearfix">
              <li>Author: <strong>{ post.author }</strong></li>
              <li>Score: <strong>{ post.score }</strong></li>
              <li>Downs: <strong>{ post.downs }</strong></li>
              <li>Ups: <strong>{ post.ups }</strong></li>
              <li>Comments: <strong>{ post.num_comments }</strong></li>
            </ul>
          </div>
        </div>
      </div>
      <a className="goToPost" href={post.url} target="_blank">Open</a>
    </>
  )
}

export default PostViewer
