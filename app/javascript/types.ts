export type User = {
  id: Number
  name: String
  email: String
  created_at: String
}

export type Image = {
  source: String
  resolutions: [{ url, width, height }]
}

export type Preview = {
  enabled: Boolean
  images: Image[] | null
}

export type Post = {
  id: String
  author: String
  title: String
  name: String
  thumbnail: String
  score: Number
  down: Number
  ups: Number
  link: String
  preview: Preview
  is_video: Boolean
  permalink: String
  icon_url: String
  url: String
  num_comments: Number
  created: Number
}
