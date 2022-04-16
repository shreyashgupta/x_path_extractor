let started=false;
let list=[];

let get_xpath=(ele)=>
{
  return ele;
}
window.addEventListener("keydown", function(e) {
  //tested in IE/Chrome/Firefox
  if(e.shiftKey && e.code=='KeyW')
  {
    ele=document.getElementsByClassName("hoverr");
    console.log(e,ele);
    x_path=get_xpath(ele)
    list.push(x_path);
  }
})
let start=()=>
{
  // console.log('here');
  $('body').children().mouseover(function(e){
    $(".hoverr").removeClass("hoverr");     
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
  console.log(list)
  list=[]
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
