$.put = function(url, data, callback){

  if ( $.isFunction(data) ){
    callback = data,
    data = {}
  }

  return $.ajax({
    url: url,
    type: 'PUT',
    success: callback,
    data: data
  });
}

$("#edit-btn").on('click', function(evt) {
  let html = '<form action="/user/edit" method="post" id="nicknameform"> Monster Name: <input type="text" name="nickname"><br></form><button type="submit" form="nicknameform" value="Submit">Submit</button>';
  $("#editable").html(html)

})

$("#delete-btn").on('click', function(evt) {
  $.ajax({
    url: '/user',
    type: 'DELETE',
    success: function(result){
      let html = `<h3> Your monster has returned back to the mainframe</h3>
      <img id="sprites" src="/mainframe.png" alt="mainframe"> <br><br>
      <a href="/user">Find another pest</a> <br><br>
      `
      $("#left").html(html)
     console.log(result);},
    data: {delete: 1}
  })
})

$("#food").on('click', $('body'), (evt) => {
  console.log('food clicked')
  babyNo(monster);
  $.put('/action?action=feed', {times: 1}, function(result){
     console.log(result);
     let txt = $('#stats-food').text();
     $('#stats-food').text(txt + '❤️️')
     if (result === 201) {
      console.log('he ate too much')

     }
  })
})

$("#train").on('click', $('body'), (evt) => {
  console.log('train clicked')
})

$("#toilet").on('click', $('body'), (evt) => {
  console.log('toilet clicked')
})

$("#lights").on('click', $('body'), (evt) => {
  console.log('lights clicked')
})
