json.array! @chats.each do |chat|
  json.user_name     chat.user.name
  json.image    chat.image
  json.id       chat.id
  json.content  chat.content
  json.created_at chat.created_at
end
