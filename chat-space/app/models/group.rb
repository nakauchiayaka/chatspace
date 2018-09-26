class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :chats

  validates :name, presence: true

  def show_last_chat
    if (last_chat = chats.last).present?
            last_chat.content? ? last_chat.content : "画像が投稿されています"
    else
            "まだメッセージはありません。"
    end
  end
end
