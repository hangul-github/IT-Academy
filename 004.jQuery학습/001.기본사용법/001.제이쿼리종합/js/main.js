// 제이쿼리 기본 JS - main.js

////////////// 제이쿼리 로드구역 /////////////
$(function () {

  // 타이틀 오버시 글자색, 배경색 변경
  // 대상: .tit
  let tit = $(".tit");

  // mouseover() 메서드 - 오버시 함수연결
  tit.mouseover(function () {
    // 변경대상: .tit -> 나자신 this 키워드
    $(this).css({
      color: "red",
      background: "yellow"
    }); ////// css ///////
  }); ////// mouseover ///////

  // 마우스 아웃시 원상복귀
  // mouseout(함수) - 마우스 아웃시 함수연결
  tit.mouseout(function () {
    // 변경대상: .tit -> 나자신 this키워드
    $(this).css({
      color: "yellow",
      background: "pink"
    }); ///// css //////
  }); ///// mouseout /////////



  ///////////////////////////////////////////
  /////// 1. 대상선정 변수할당 ///////////////
  ///////////////////////////////////////////

  // 대상1 : 버튼- .btns button
  let btns = $(".btns button");

  // 대상2 : 미니언즈 - .mi
  let mi = $(".mi");

  // 대상3 : 빌딩 - .building li
  let bd = $(".building li");

  // 대상4 : 메시지 - .msg
  let msg = $(".msg");

  // 좀비 태그 셋업
  let mz1 = '<img src="images/mz1.png" alt="좀비1" class="mz">';
  let mz2 = '<img src="images/mz2.png" alt="좀비2" class="mz">';
  let zom = '<img src="images/zom.png" alt="좀비들" class="mz">';

  // 주사기 태그 셋업
  let inj = '<img src="images/inj.png" alt="주사기" class="inj">';


  // 미니언즈 가로크기 보정값
  // 윈도우 가로크기의 5%
  let win5 = $(window).width() * 0.05;
  // console.log("가로크기5%:" + win5);
  // width() 선택요소의 가로크기 구하기
  // height() 선택요소의 세로크기 구하기
  // -> 단위없는 px값




  ///////////////////////////////////////////
  /////// 2. 초기화 셋팅 /////////////////////
  ///////////////////////////////////////////

  // 2-1. 모든 버튼 숨기고 첫번째만 보이게하기
  btns.hide().first().show();
  // 버튼들을 .숨겨() .첫번째()는 .보여()
  // 주어는 하나! 뒤에 메서드 체인!

  // 2-2. 모든 빌딩 li를 순서대로 돌면서 순번넣기 + 좀비넣기
  // each(function(idx, ele){구현부});
  // -> 선택요소를 순서대로 돌면서 구현부를 실행하는 메서드
  // -> idx 전달변수는 순번이 전달됨(0부터)
  //   (idx -> index에서 나온말로 변수명 사용)
  // -> ele 전달변수는 요소자신(this키워드와 동일)
  //   (ele -> element에서 나온말로 변수명 사용)
  // - 참고로 idxm ele변수명은 변경가능. 변수의 순서 중요!
  // - 이 메서드를 사용하면 for문을 안써도 됨!
  bd.each(function (idx, ele) {
    // console.log(idx);

    // 1. 각 li요소에 글자넣기(순번)
    $(ele).text(idx);

    // 2. 좀비+주사기 넣기
    if (idx === 9)
      $(ele).append(mz1);
    else if (idx === 7)
      $(ele).append(mz2);
    else if (idx === 1)
      $(ele).append(zom);
    else if (idx === 2)
      $(ele).append(inj);

  }); /////// each //////////

  // 2-3. 모든 좀비 숨기기
  $(".mz").hide();
  // 선택요소가 여러개이면 for문을 돌듯이 모두 셋팅됨!


  ////////////////////////////////////////////////////////////////
  /////// 3. 버튼별 순서대로 클릭 이벤트 함수 만들기 ////////////////
  ////////////////////////////////////////////////////////////////

  // 3-1. '들어가기' 버튼 /////
  btns.first().click(function () {
    console.log("들어가기 버튼!");

    // 1. 자기자신 버튼 없애기
    $(this).slideUp(400);

    // 2. 메시지 지우기
    msg.fadeOut(200);
    // fadeOut(시간) - opacity로 서서히 사라짐

    // 3. 이동할 빌딩 li의 위치정보 알아내기!

    // offset() 메서드 위치나 크기정보를 알려줌
    // offset().top - top값
    // offset().left - left값

    // 이동할 li 타겟 -> bd변수에 할당(.building li)
    let tg = bd.eq(8); // 8번방
    let tval = tg.offset().top; // 화면에서의 top값
    let lval = tg.offset().left + win5; // 화면에서의 left값
    // win5는 미니언즈를 left값 보정함!(화면의 5%)
    console.log(tval + "/" + lval);

    // 4. 미니언즈 이동하기
    // 대상: .mi -> mi변수에 할당!
    // animate({CSS설정}, 시간, 이징, 함수)

    mi.animate({
      top: tval + "px",
      left: lval + "px"
    }, 1000, function () { // 콜백함수(애니 후 실행!) //

      // 5. 메세지 변경
      // 메시지 요소
      msg
        // 메시지 넣기
        .text("와~! 아늑하다! 옆방으로 가보자!")
        // 나타나기
        .fadeIn(200);

      // 한 번 선택하고 이어서 메서드를 계속 쓰는 방법을 메서드 체인이라고함!
      // 중간에 이어서 쓸땐 세미콜론 없어야함!

      // 6. 다음 변경 버튼 보이기
      btns.eq(1).slideDown(400);
    }); /////////// animate ///////////

  }); ////////// 3-1. '들어가기'버튼 click //////////


  // 3-2. '옆방으로!' 버튼 //////////////
  btns.eq(1).click(function () {
    console.log("옆방으로 버튼!");

    // 1. 자기자신 버튼 없애기
    $(this).slideUp(400);

    // 2. 메시지 지우기
    msg.fadeOut(200);
    // fadeOut(시간) - opacity로 서서히 사라짐

    // 3. 이동할 빌딩 li의 위치정보 알아내기!

    // offset() 메서드 위치나 크기정보를 알려줌
    // offset().top - top값
    // offset().left - left값

    // 이동할 li 타겟 -> bd변수에 할당(.building li)
    let tg = bd.eq(9); // 9번방
    let tval = tg.offset().top; // 화면에서의 top값
    let lval = tg.offset().left + win5; // 화면에서의 left값
    // win5는 미니언즈를 left값 보정함!(화면의 5%)
    console.log(tval + "/" + lval);

    // 4. 미니언즈 이동하기
    // 대상: .mi -> mi변수에 할당!
    // animate({CSS설정}, 시간, 이징, 함수)

    mi.animate({
      top: tval + "px",
      left: lval + "px"
    }, 1000, function () { // 콜백함수(애니 후 실행!) //

      // 5. 좀비 나타나기! (콜백에서 2초후)
      setTimeout(() => {
        // 현재 li(tg변수)에 있는 좀비만 보여라!
        tg.find(".mz").fadeIn(300);
        // find(요소) 하위 중 자손요소 찾기!

        // 6. 메세지 변경
        msg.html("악!;;;; 좀비!<br>어서피하자!")
        .css({left: "-105%"})
          .delay(500).fadeIn(200);
        // delay(시간) - 애니메이션 앞에서 지연시간주기

        // 7. 다음 변경 버튼 보이기
        btns.eq(2).delay(700).slideDown(400);
        // 0.5초 기다리고 0.2초 나타난 메시지 기다린 후 (0.7초) 실행

      }, 1000); // 타임아웃함수 ////////

    }); /////////// animate ///////////

  }); ////////// 3-2. '옆방으로!' 버튼 click //////////


  // 3-3. '윗층으로 도망가!' 버튼 //////////////
  btns.eq(2).click(function () {
    console.log("윗층으로 도망가! 버튼!");

    // 1. 자기자신 버튼 없애기
    $(this).slideUp(400);

    // 2. 메시지 지우기
    msg.fadeOut(200);
    // fadeOut(시간) - opacity로 서서히 사라짐

    // 3. 이동할 빌딩 li의 위치정보 알아내기!

    // offset() 메서드 위치나 크기정보를 알려줌
    // offset().top - top값
    // offset().left - left값

    // 이동할 li 타겟 -> bd변수에 할당(.building li)
    let tg = bd.eq(7); // 7번방
    let tval = tg.offset().top; // 화면에서의 top값
    let lval = tg.offset().left + win5; // 화면에서의 left값
    // win5는 미니언즈를 left값 보정함!(화면의 5%)
    console.log(tval + "/" + lval);

    // 4. 미니언즈 이동하기
    // 대상: .mi -> mi변수에 할당!
    // animate({CSS설정}, 시간, 이징, 함수)

    mi.animate({
      top: tval + "px",
      left: lval + "px"
    }, 1000, function () { // 콜백함수(애니 후 실행!) //

      // 5. 먼저나오는 메시지
      msg.text("여긴 없겠지?").delay(500).fadeIn(200);


      // 5. 좀비 나타나기! (콜백에서 2초후)
      setTimeout(() => {
        // 현재 li(tg변수)에 있는 좀비만 보여라!
        tg.find(".mz").fadeIn(300);
        // find(요소) 하위 중 자손요소 찾기!

        // 6. 메세지 변경
        msg.text("악!! 여기도!!");
        // delay(시간) - 애니메이션 앞에서 지연시간주기

        // 7. 다음 변경 버튼 보이기
        btns.eq(3).delay(700).slideDown(400);
        // 0.5초 기다리고 0.2초 나타난 메시지 기다린 후 (0.7초) 실행

      }, 2000); // 타임아웃함수 ////////

    }); /////////// animate ///////////

  }); ////////// 3-3. '윗층으로 도망가!' 버튼 click //////////



}); /////////// jQB ////////////////////////
///////////////////////////////////////////