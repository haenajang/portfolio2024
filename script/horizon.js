$(document).ready(function(){

  // 1. 가로스크롤값 출력
  $(window).scroll(function(){
    let sposL = $(this).scrollLeft();
    $('#sPos').text(sposL);
  })
  
  // 3. 마우스 휠이벤트를 사용하여 휠 돌리면 한페이지씩 이동하기
  $('.projects article').each(function(){
    // 개별적으로 Wheel 이벤트 적용
    $(this).on('mousewheel',function(e){
      
      var delta = 0;
      var moveTop = null;
      var boxMax = $(".projects article").length - 1; //0,1,2,3
      var winEvent = "";
      console.log(boxMax);
      
      if(!winEvent) { //만약에 이벤트가 발생하지 않는다면
        winEvent = window.event; //이벤트는 없다
      }
      if(winEvent.wheelDelta) { //만약에 이벤트에서 휠데이터값이 있다면
        delta = winEvent.wheelDelta / 120; //데이터값을 저장
        if(window.opera) {
            delta = -delta;
        }
      }          
      else if(winEvent.detail) { //그렇지 않으면
        delta = -winEvent.detail / 3; 
      }
            
      // 마우스휠을 위에서 아래로 이동(처음에서 다음박스로 이동)
      if(delta < 0) {
          // 마지막 BOX 보다 순서값이 작은 경우에 실행
          if($(this).index() < boxMax) {
              console.log("▼");
              if($(this).next() != undefined) {
                  moveTop =$(this).next().offset().left; //next = 오른쪽이동
              }
          }
          // 마지막 article보다 더 오른쪽으로 이동하려고 하는 경우 알림창 출력
          else {
              alert("마지막 페이지 입니다.");
              return false;
          }
      }
      // 마우스휠을 아래에서 위로 이동( 뒤에서 앞으로 이동)
      else {
          // 첫번째 article보다 순서값이 큰 경우에 실행
          if($(this).index() > 0) {
              console.log("▲");
              if($(this).prev() != undefined) {
                  moveTop =$(this).prev().offset().left; //prev = 왼쪽이동
              }
          }
          // 첫번째 article보다 더 위로 이동하려고 하는 경우 알림창 출력
          else {
              alert("첫번째 페이지 입니다.");
              return false;
          }
      }
      //화면 이동 0.3초(300)
      $("html,body").stop().animate({scrollLeft : moveTop + "px"}, 300);
      });
    });

})