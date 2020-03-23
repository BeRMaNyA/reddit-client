class User < ActiveRecord::Base
  has_secure_password
  has_secure_token :auth_token

  validates :name,     presence: true, length: { minimum: 4 }
  validates :email,    presence: true, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }
  validates :password, presence: true, length: { minimum: 4 }, confirmation: true, on: :create 

  has_many :pictures 

  def to_h
    {
      id:         id,
      name:       name,
      email:      email,
      auth_token: auth_token,
      created_at: created_at
    }
  end
end
