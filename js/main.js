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




});

AOS.init({
  offset: 300,
  delay: 100,
  duration: 700,
  easing: 'ease',
  once: true,
});