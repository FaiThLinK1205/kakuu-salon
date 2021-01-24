"use strict";

$(() => {

  let body = $('body');

  // ハンバーガーメニュー
  $('#js-nav_toggle').on('click', function () {
    body.toggleClass('open');
  });

  $('#js-global_nav a').click(function () {
    body.removeClass('open');
  });

  // 画像widthに応じて置換

  // 置換の対象となるクラス
  let $el = $('.fv_img');
  // 置換の対象とするsrcの末尾の文字列
  let sp = '_sp.';
  let pc = '_pc.';
  // 画像を切り替えるウィンドウサイズ
  let replaceWidth = 768;

  function fv_img() {
    // ウィンドウサイズを取得
    let windowWidth = parseInt(window.innerWidth);
    // ページ内にある全ての'fv_img'に適応される
    $el.each(function () {
      let $this = $(this);
      // ウィンドウサイズが768px以上で_spを_pcに置換する
      if (windowWidth >= replaceWidth) {
        $this.attr('src', $this.attr('src').replace(sp, pc));
        // ウィンドウサイズが768未満であれば_pcを_spに置換する
      } else {
        $this.attr('src', $this.attr('src').replace(pc, sp));
      }
    });
  }

  fv_img();

  // 動的なリサイズ（画面幅縮小など）は、操作後0.2秒経ってから処理

  let resizeTimer;
  $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      fv_img();
    });
  });

  // スライドショー
  let mySwiper = new Swiper('.swiper-container', {
    // loop: true,
    // effect: 'fade',
    // autoplay: {
    //   delay: 3000,
    // },
    // speed: 2000,
  });

  // スムーズスクロール

  $('a[href*="#"]').click(function () { //ページリンクの適用範囲を指定
    let elmHash = $(this).attr('href'); //ページ内のHTMLタグhrefからリンクのidを取得
    let tPos = $(elmHash).offset().top; //idの上部の距離を取得
    $('body,html').animate({
      scrollTop: tPos
    }, 500); //取得した位置にスクロール
    return false;
  });

  //ページＴＯＰボタン

  function PageTopAnime() {
    let scroll = $(window).scrollTop(); //スクロール値を取得
    if (scroll >= 400) { //〇pxスクロールしたら
      $('#page_top').removeClass('DownMove'); //DownMoveというclass名を除去
      $('#page_top').addClass('UpMove'); //UpMoveというclassを追加して出現
    } else { //それ以外は
      if ($('#page_top').hasClass('UpMove')) { //UpMoveというclass名が既に付与されていたら
        $('#page_top').removeClass('UpMove'); //UpMoveというclass名を除去
        $('#page_top').addClass('DownMove'); //DownMoveというclass名を追加して非表示
      }
    }

    let wH = window.innerHeight; //画面の高さを取得
    let footerPos = $('#footer').offset().top; //footerの位置を取得
    if (scroll + wH >= (footerPos + 10)) {
      let pos = (scroll + wH) - footerPos + 10 //スクロールの値+画面の高さからfooterの位置+10pxを引いた場所を取得
      $('#page_top').css('bottom', pos); //#page_topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
    } else { //それ以外は
      if ($('#page_top').hasClass('UpMove')) { //UpMoveというclass名がついていたら
        $('#page_top').css('bottom', '10px'); //下から10pxの位置にページリンクを指定
      }
    }
  }

  //画面をスクロールしたら動かしたい場合の記述
  $(window).scroll(function () {
    PageTopAnime();
  });

  //ページが読み込まれたらすぐに動かしたい場合の記述
  $(window).on('load', function () {
    PageTopAnime();
  });

  //#page_topをクリックした際の設定
  $('#page_top').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

});

AOS.init({
  offset: 300,
  delay: 100,
  duration: 700,
  easing: 'ease',
  once: true,
});