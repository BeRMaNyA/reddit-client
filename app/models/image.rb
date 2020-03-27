class Image < ActiveRecord::Base
  belongs_to :user

  validates :user_id, :post_id, :title, :src, presence: true

  def to_h
    {
      id:      id,
      post_id: post_id,
      title:   title,
      src:     src
    }
  end
end
