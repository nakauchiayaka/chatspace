class Chat < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :content, presence: true, unless: :image?
  mount_uploader :image, ImageUploader

  def show_group_member

  end
end
