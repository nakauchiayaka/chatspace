$(function(){

  var id = 0;

  function buildHTML(chat){
    var html_top = `<div class='chat-main__body--message__list' data-chat-id="${chat.id}">
      <p class='chat-main__body--message__list--name'>
      ${chat.user_name}
      </p>
      <p class='chat-main__body--message__list--time'>
      ${chat.created_at}
      </p>
      <div class='chat-main__body--message__list--body'>`
    var content_html = `<p class='chat-main__body--message__list--body__content'>
      ${chat.content}
      </p>`
    var image_html = `<img class="chat-main__body--message__list--body__image" src= ${chat.image.url} >`
    var html_bottom = `</div>
      </div>`

    if(chat.content){
      if(chat.image.url){
          return html_top + content_html + image_html + html_bottom;
      }
      else{
          return html_top + content_html + html_bottom;
      }
    }
    else if(chat.image.url){
        return html_top + image_html + html_bottom;
    }
  }

  $('#new_chat').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      const form = document.getElementById("new_chat");
      $('.chat-main__body').append(html);
      form.reset();
      $('.chat-main__body').animate({scrollTop:$('.chat-main__body')[0].scrollHeight});
      $('.chat-main__footer--form__body--submit').attr('disabled', false);
      id = data.chat_id;
    })
    .fail(function(){
      alert('メッセージを入力してください。');
    })
  });

  $(window).bind("load", function(){
    if(document.URL.match("chats")) {
      setInterval(function(){
      $.ajax({
        url: location.href.json,
        dataType: 'json'
      })
      .done(function(chats) {
        // 画面初期表示時のみ実行
        if(id == 0) {
          id = $('.letest_chat_id').val();
        }

        var insertHTML = '';
        chats.forEach(function(chat) {
          if (chat.id > id ) {
            insertHTML += buildHTML(chat);
            id = chat.id //画面上の最新IDを更新
            console.log("bbb");
            console.log(id);
          }
        });
        $('.chat-main__body').append(insertHTML);
        $('.chat-main__body').animate({scrollTop:$('.chat-main__body')[0].scrollHeight});
      })
      .fail(function(json) {
        alert('自動更新に失敗しました');
      })
    } , 5000 );
    }
  });
});




