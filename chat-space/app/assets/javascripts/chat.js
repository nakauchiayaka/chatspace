$(function(){
  function buildHTML(chat){
    if(chat.content.present?){
      var html =
    `<div class='chat-main__body--message__list'>
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
    if(chat.image.present?){
      var html2 =
      `<p class='chat-main__body--message__list--body__image'>
      <%= image_tag ${chat.image.url} %>
      </p>`
    }
    }

    return html + html2;
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
      $('.chat-main__body').append(html)
      $('.chat-main__footer--form__body--message').val('')
    })
  })
})
