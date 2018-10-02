$(function(){
  function buildHTML(chat){
    if(chat.content){
      if(chat.image.url){
        var html = `<div class='chat-main__body--message__list'>
      <p class='chat-main__body--message__list--name'>
      ${chat.user_name}
      </p>
      <p class='chat-main__body--message__list--time'>
      ${chat.created_at}
      </p>
      <div class='chat-main__body--message__list--body'>
        <p class='chat-main__body--message__list--body__content'>
        ${chat.content}
        </p>
        <img class="chat-main__body--message__list--body__image" src= ${chat.image.url} >
      </div>
    </div>`
    return html;

      }
      else{
        var html = `<div class='chat-main__body--message__list'>
      <p class='chat-main__body--message__list--name'>
      ${chat.user_name}
      </p>
      <p class='chat-main__body--message__list--time'>
      ${chat.created_at}
      </p>
      <div class='chat-main__body--message__list--body'>
        <p class='chat-main__body--message__list--body__content'>
        ${chat.content}
        </p>
      </div>
    </div>`
    return html;

      }
    }
    else if(chat.image.url){
      var html =
      `<div class='chat-main__body--message__list'>
      <p class='chat-main__body--message__list--name'>
      ${chat.user_name}
      </p>
      <p class='chat-main__body--message__list--time'>
      ${chat.created_at}
      </p>
      <div class='chat-main__body--message__list--body'>
      <img class="chat-main__body--message__list--body__image" src= ${chat.image.url} >
      </div>
    </div>`
    return html;

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
    })
    .fail(function(){
      alert('メッセージを入力してください。');
    })
  })
})
