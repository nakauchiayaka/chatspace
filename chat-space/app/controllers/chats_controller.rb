class ChatsController < ApplicationController
  before_action :set_group
  before_action :set_user, only: :index
  def index
    @chat = Chat.new
    @chats = @group.chats.includes(:user)
    if @chats.length != 0
      @letest_chat_id = @chats.last.id
    end
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @chat = @group.chats.new(chat_params)

    if @chat.save
      respond_to do |format|
      format.html { redirect_to group_chats_path(@group) }
      format.json
      end
    else
      @chats = @group.chats.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end

  end

  private
  def chat_params
    params.require(:chat).permit(:content,:image).merge(user_id:current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_user
    @users = []
    @group_users = GroupUser.where(group_id: @group.id)
    @group_users.each do |group_user|
      user = User.find_by(id:group_user.user_id)
      @users << user
    end
  end
end
