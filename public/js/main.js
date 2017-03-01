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

let renderFood = () => {
  var txt = ''
  for(let i = 0; i < digimon.stats.hunger; i++){
    txt += '❤️️'
    console.log("i and stats", i, digimon.stats.hunger)
  }
  $('#stats-food').text(txt)
}

let renderStrength = () => {
  var txt = ''
  for(let i = 0; i < digimon.stats.strength; i++){
    txt += '🍖'
    console.log("i and stats", i, digimon.stats.strength)
  }
  $('#stats-protein').text(txt)
}

let renderPoop = () => {
  let txt = $('#poop').text()
  txt += '💩'
  $('#poop').text(txt)
}

$("#food").on('click', $('body'), (evt) => {
  console.log('food clicked')
  babyNo(monster);
  $.put('/action?action=feed', {times: 1}, function(result){
     console.log(result);
     digimon.stats.hunger++
     renderFood();
     if (result === 201) {
      console.log('he ate too much')
     }
  })
})

$("#train").on('click', $('body'), (evt) => {
  console.log('train clicked')
  babySleep(monster);
  $.put('/action?action=strength', {times: 1}, function(result){
     console.log(result);
     digimon.stats.strength++
     renderStrength();
     if (result === 201) {
      console.log('he too buff')
     }
  })
})


$("#toilet").on('click', $('body'), (evt) => {
  console.log('toilet clicked')
})

$("#lights").on('click', $('body'), (evt) => {
  console.log('lights clicked')
})
