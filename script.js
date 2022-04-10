let started=false;

let start=()=>
{
  // console.log('here');
  $('body').children().mouseover(function(e){
    $(".hoverr").removeClass("hoverr");     
    console.log(e)
    $(e.target).addClass("hoverr");
  return false;
  }).mouseout(function(e) {
    $(this).removeClass("hoverr");
  });
}
let stop=()=>
{
  $('.hoverr').removeClass("hoverr"); 
  $('body').children().off('mouseover')
  $('body').children().off('mouseout')
}
let recvCallback=(message,sender,response)=>
{
  if(message=='start')
  {
    if(!started){
      started=true;
      start();
    }
  }
  else
  {
    if(started)
    { 
      stop();
      chrome.extension.sendMessage({greeting: "hello"},function(response) {
        // console.log(response.status);
    });
      started=false;
    }
  }
}

chrome.runtime.onMessage.addListener(recvCallback);
