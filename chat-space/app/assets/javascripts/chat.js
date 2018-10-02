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
      $('.chat-main__body').append(html);
      console.log("gggggg");
      $('.chat-main__footer--form__body--message').val('');
      $('.chat-main__body').animate({scrollTop:9999});
      $('.chat-main__footer--form__body--submit').attr('disabled', false);
    })
    .fail(function(){
      alert('メッセージを入力してください。');
    })
  })
})
