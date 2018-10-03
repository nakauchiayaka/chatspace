$(function() {
  var search_list = $('.user-search-result');
  function appendUser(user){
    var html =
    `
    <div class='chat-group-user chat-group-user__add clearfix'>
    <p class='chat-group-user__name '>${user.name}</p>
    <a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id='${user.id}' data-user-name='${user.name}'>追加</a>
    </div>
    `
    search_list.append(html);
  }
  function appendNoUser(user){
    var html = `
    <div class='chat-group-user clearfix'>
    <p class='chat-group-user__name'>${user}</p>
    </div>`
    search_list.append(html);
  }
  function addChatMember(user){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
  <p class='chat-group-user__name'>${user.name}</p>
  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
</div>`
    $('#chat-group-users').append(html);
  }

  $(".chat-group-form__input").on("keyup", function() {
    var input = $(".chat-group-form__input--user").val();
    console.log(input);

    $.ajax({
      type: 'GET',
      url: '/users/',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
     $(".user-search-result").empty();
     if (users.length !== 0) {
       users.forEach(function(user){
         appendUser(user);
         $(".user-search-result").on("click",".user-search-add",function(){
            $('.chat-group-user__add').empty();
            addChatMember(user);
          });
       });
     }
     else {
       appendNoUser("一致するユーザーはいません");
     }
   })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });


});
