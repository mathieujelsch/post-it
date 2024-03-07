class Postit < ApplicationRecord
  belongs_to :user

  # validates :content, presence: false
end
