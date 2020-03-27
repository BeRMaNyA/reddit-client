export type User = {
  id: number
  name: string
  email: string
  created_at: string
};

export type PostT = {
  id: string
  author: string
  title: string
  name: string
  thumbnail: string
  score: number
  downs: number
  ups: number
  preview: string
  is_video: boolean
  permalink: string
  icon_url: string
  url: string
  num_comments: number
  created: number
}

export type Image = {
  id: number
  post_id: string
  title: string
  src: string
}
