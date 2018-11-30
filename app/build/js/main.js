
console.log(Collector);

var c1 = new Collector({
    wrapper: $('.collector'),
    stepsIndicators: $('.collectorStepsIndicatorWrapper div'),
    stepCounterName: $('.collectorStepCounterName'),
    stepActionName: $('.collectorStepActionName'),
    stepsWrappers: $('.collectorStep'),
    nextStepBtn: $('.collectorNextStepBtn'),
    nameInput: $('.nameInput'),
    phoneInput: $('.phoneInput'),
    sendBtn: $('.collectorSendBtn'),
    dynamicContentWrapperStep4: $('.collectorDynamicContentWrapperStep4'),
    onSendBtnClick: function (configuredData) {

        // console.log('---configuredData---');
        // console.log(configuredData);
    }
});

console.log(c1);


$(document).ready(function () {
    var $body = $('body');
    var $desctopApp = $('.desctop');
    var $mobileApp = $('body .app .mobile');

    var $desctopContent = $('.desctop-content-wrp');

    var $collector = $('.collector-overlay-wrapper');

    var $celebrate = $('.celebrate');

    // var firstBlockHeight = 1000;
    var firstBlockHeight = window.innerHeight/2 + 100;
    var $header = $('.header-fixed');

    var $popUpWrapper = $('.pop-up-overlay-wrapper');
    var $overlayDark = $('.overlay-pop-up');
    var $popUpConsult = $('.pop-up-wrapper .pop-up-consult');
    var $popUpSendOrder = $('.pop-up-wrapper .pop-inner-send-order');

    var $popUpThnx = $('.pop-up-wrapper .pop-inner-thnx');

    var $btnOpenCollector = $('.btn-calc-value');
    var $collectorSendBtn = $('.collectorSendBtn');

    var $btnSendOrder = $('.desctop .send-order-btn');

    var $btnConsultation = $('.desctop .btn-consultation');
    var $btnSendOrderPopUp = $('.desctop .send-order-btn-pop-up');
    var $btnClosePopUp = $('.desctop .btn-close-pop-up');

    var $menu = $('.desctop .menu');
    var $menuBurger = $('.desctop .menu-burger-substrate');

    var $menuMob = $('.mobile .menu-mob');
    var $menuMobOpen = $('.mobile .menu-burger-substrate');
    var $menuMobClose = $('.mobile .btn-close-menu-mob');


    // double click
    var $policyLink = $('.nav-item a');
    var countClicks = 0;
    $policyLink.click(function (){
        countClicks = countClicks + 1;
        if (countClicks === 1) {
            $(this).click();
        } else {
            return;
        }
    });
    // MOBILE TABS
    var $btnToggle = $('.btn-toggle');
    var $policyText = $('.policy-text-mob');

    $btnToggle.click(function () {
        $btnToggle.removeClass('active');
        $policyText.removeClass('active');
        $(this).addClass('active');
        var attrValue = $(this).attr("data-nav");
        var $activeText = ($('[data-content = ' + attrValue + ']'));
        $activeText.addClass('active');
        $(window).scrollTop(0);
    });

    // $(window).scroll(function(){
    //     console.log($(window).scrollTop());
    // });


    function openThnxPopUp () {
        if(!$body.hasClass('compensate-for-scrollbar')){
            $(this).addClass('compensate-for-scrollbar');
        };
        if(!$header.hasClass('compensate-for-scrollbar')){
            $(this).addClass('compensate-for-scrollbar');
        };
        $popUpSendOrder.fadeOut();
        $popUpWrapper.fadeIn();
        $popUpConsult.fadeIn();
        $popUpThnx.fadeIn();
    };


    // Open/close Pop-up with consultation
    $btnConsultation.click(function () {
        $body.addClass("compensate-for-scrollbar");
        $header.addClass("compensate-for-scrollbar");
        $popUpWrapper.fadeIn();
        $popUpConsult.fadeIn();
        $popUpSendOrder.fadeIn();
    });

    // Open/close Pop-up with Collector
    $btnOpenCollector.click(function () {
        $body.addClass("compensate-for-scrollbar");
        $header.addClass("compensate-for-scrollbar");
        $collector.css('display', 'flex');
        $collector.fadeIn();
    });
    var $btnCloseCollector = $('.collector .btn-close-pop-up');
    var $overlayCloseCollector = $('.collector-overlay-wrapper .overlay-pop-up');

    $btnCloseCollector.click(function () {
        $body.removeClass("compensate-for-scrollbar");
        $header.removeClass("compensate-for-scrollbar");
        $collector.fadeOut();
    });
    $overlayCloseCollector.click(function () {
        $body.removeClass("compensate-for-scrollbar");
        $header.removeClass("compensate-for-scrollbar");
        $collector.fadeOut();
    });

    // -----------------------COLLECTOR CLOSE------------

    // SEND ORDER FORM FOR CALL, OPEN THNX POP-UP temporarily -----------
    $('.collectorSendBtn').click(function (e) {
        e.preventDefault();
        console.log("111");
        openThnxPopUp ();
    });

    $overlayDark.click(function () {
        $body.removeClass("compensate-for-scrollbar");
        $header.removeClass("compensate-for-scrollbar");
        $popUpWrapper.fadeOut();
        $popUpConsult.fadeOut();
        $popUpSendOrder.fadeOut();
        $popUpThnx.fadeOut();
    });

    $btnClosePopUp.click(function () {
        $body.removeClass("compensate-for-scrollbar");
        $header.removeClass("compensate-for-scrollbar");
        $popUpWrapper.fadeOut();
        $popUpConsult.fadeOut();
        $popUpSendOrder.fadeOut();
        $popUpThnx.fadeOut();
    });

     $(".scroll-wrp").mCustomScrollbar();

    // openCelebratePopUp ();
    // OPEN/CLOSE CELEBRATE POP-UP
    function openCelebratePopUp () {
         $desctopContent.addClass('add-filter');
         $body.addClass('compensate-for-scrollbar');
         $celebrate.fadeIn();
         $celebrate.css('display', 'flex');
    };
    function cloCelebratePopUp () {
         $desctopContent.removeClass('add-filter');
         $body.removeClass('compensate-for-scrollbar');
         $celebrate.fadeOut();
    };
    // OPEN/CLOSE CELEBRATE POP-UP

    // ----------------MOBILE JS-------------------
    var $headerMobFixed = $('.header-mob-fixed');
    var firstScreenHeightMob = 300;

    var $btnOpenConsultPopUpMob = $('.btn-open-consult-mob');

    // always open/close---
    var $popUpWrapperMob = $('.mobile .pop-up-overlay-wrapper');
    var $overlayDarkMob = $('.mobile .overlay-pop-up');
    // always open/close------

    // consult
    var $popUpSendOrderMob = $('.mobile .pop-up-wrapper-mob .pop-inner-send-order');

    var $popUpThnxMob = $('.mobile .pop-up-wrapper-mob .pop-inner-thnx');

    // SORT & FILTER FOR CATALOG PAGE MOBILE
    var $btnOpenSortMob = $('.mobile .sort-open-btn');
    var $btnOpenFilterMob = $('.mobile .filter-open-btn');

    var $popUpFilterMob = $('.pop-up-filters');
    var $popUpSortMob = $('.pop-up-sort');

    var $btnClosePopUpMob = $('.mobile .btn-close-pop-up');

    // open every mobile pop-up
    function openEveryMobPopUp () {
        $body.addClass('open-pop-up-mob');
        $popUpWrapperMob.fadeIn();
    };
    // close all
    function closeEveryMobPopUp () {
        $body.removeClass('open-pop-up-mob');
        $popUpWrapperMob.fadeOut();
    };
    // open pop-up THNX
    function openPopUpTHNX () {
        $popUpSendOrderMob.fadeOut();
        $popUpThnxMob.fadeIn();
    };

    // close all
    $btnClosePopUpMob.click(function () {
        closeEveryMobPopUp();
        $popUpSendOrderMob.fadeOut();
        $popUpThnxMob.fadeOut();
    });
    $overlayDarkMob.click(function () {
        closeEveryMobPopUp();
        $popUpSendOrderMob.fadeOut();
        $popUpThnxMob.fadeOut();
        $popUpFilterMob.fadeOut();
        $popUpSortMob.fadeOut();
    });

    // open consult pop-up on PRODUCT Page
    $btnOpenConsultPopUpMob.click(function () {
        openEveryMobPopUp();
        $popUpSendOrderMob.fadeIn();
    });

    $btnOpenSortMob.click(function (e) {
        openEveryMobPopUp();
        $popUpSortMob.fadeIn();
    });

    $btnOpenFilterMob.click(function (e) {
        openEveryMobPopUp();
        $popUpFilterMob.fadeIn();
    });














    // OPEN/CLOSE MENU
    $menuBurger.click(function () {
        if ($menu.hasClass('open-menu')) {
            $menu.removeClass('open-menu');
            $body.removeClass('compensate-for-scrollbar');
            $header.removeClass('compensate-for-scrollbar');
        } else {
            $menu.addClass('open-menu');
            $body.addClass('compensate-for-scrollbar');
            $header.addClass('compensate-for-scrollbar');
        }
    });
    // OPEN/CLOSE MENU MOBILE
    $menuMobClose.click(function () {
        $menuMob.removeClass('open-pop-up-mob');
        $body.removeClass('open-pop-up-mob');
    });
    $menuMobOpen.click(function () {
        $menuMob.addClass('open-pop-up-mob');
        $body.addClass('open-pop-up-mob');
    });



    // show\hide fixed header
    $(window).scroll(function(){
        if ($(this).scrollTop() >= firstBlockHeight) {
            $header.css("display", "flex");
            $header.fadeIn();
        } else {
            $header.fadeOut();
        }
    });

    // countdown
    $('.countdown').countdown({
        until: '+4h +0m +0s',
        padZeroes: true,
        format: 'HMS',
        onExpiry: liftOff
    });
     function liftOff () {
        $('.countdown').countdown ('destroy');
        $('.countdown').countdown ({
            until: '+4h +0m +0s',
            padZeroes: true,
            format: 'HMS',
            onExpiry: liftOff
        });
    };

    // Swiper on the Main Page
    var swiper = new Swiper('.first-block .swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
      },
         pagination: {
           el: '.swiper-pagination',
           clickable: true,
           renderBullet: function (index, className) {
             return '<span class="' + className + '">' + (index + 1) + '</span>';
           },
         },
   });
   var swiperText = new Swiper('.review-block .swiper-container', {
      loop: true,
      effect: 'fade',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Swiper on the Product Page
    var MySwiper = new Swiper('.swiper-container.preview', {
            loop: true,
            effect: 'fade',
			spaceBetween: 50,
			observer: true,
			observeParents: true,
			keyboard: {
				enabled: true
			},
			pagination: {
                el: '.swiper-pagination',
                clickable: true,
                type : 'custom',
                bulletClass:'img-prev-wrp',
                renderCustom: function (swiper, current, total) {
                  $('.swiper-pagination .img-prev-wrp').removeClass('swiper_pagination_img-active');
                  $('.swiper-pagination .img-prev-wrp:nth-child('+current+')').addClass('swiper_pagination_img-active');
                }
			},
			navigation: {
				nextEl: '.swiper-button-next.btn-next',
				prevEl: '.swiper-button-prev.btn-prev'
			}
		});

    // Swiper on the page About Us
    $('.swiper-container.swiper-container-partners').each(function( i ) {
        var swiperPartners = new Swiper ($('.swiper-container.swiper-container-partners')[i], {
            slidesPerView: 4,
            spaceBetween: 0,
            loop: true,
            navigation: {
              nextEl: '.swiper-button-next.swiper-button-next-partners',
              prevEl: '.swiper-button-prev.swiper-button-prev-partners',
            },
        });
    });

    // Swiper on the page CATALOG
    var swiperItems = new Swiper ($('.swiper-items-wrp .swiper-container'), {
        navigation: {
          nextEl: '.swiper-button-next.swiper-button-next-items',
          prevEl: '.swiper-button-prev.swiper-button-prev-items',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
        }
    });

   // masked inputs
   $(".form-input-phone").mask("+7 (999) 999-99-99");
   $(".form-input-time").mask("99:99");

   // SELECTIZE --------------
       $(function() {
           $('.select-sort').selectize({
               create: true,
               sortField: 'text'
           });
       });









        // initialize the vh-check
        (function () {
          var isNeeded = vhCheck('browser-address-bar');
        }());

        // show/hide header Mob fixed
        $(window).scroll(function () {
            if ($(this).scrollTop() >= firstScreenHeightMob) {
                $headerMobFixed.css("display", "flex");
                $headerMobFixed.fadeIn();
            } else {
                $headerMobFixed.fadeOut();
            }
        });
        // Swiper on the Main Page First Block
        var swiperMobFirst = new Swiper('.swiper-first-block-mob .swiper-container', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next.btn-mob-next',
                prevEl: '.swiper-button-prev.btn-mob-prev',
          },
       });
       // Swiper on the mobile page WORKS
       $('.swiper-items-block .swiper-container').each(function( i ) {
           var swiperItems = new Swiper ($('.swiper-items-block .swiper-container')[i], {
               loop: true,
               pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar',
                  },
               navigation: {
                   nextEl: '.swiper-button-next.btn-mob-items-next',
                   prevEl: '.swiper-button-prev.btn-mob-items-prev',
               },
           });
       });
       // Swiper on the mobile page WORKS TEXT
       $('.swiper-work-block .swiper-container').each(function( i ) {
           var swiperMobText = new Swiper('.swiper-work-block .swiper-container', {
               effect: 'fade',
               navigation: {
                   nextEl: '.swiper-button-next.btn-mob-text-next',
                   prevEl: '.swiper-button-prev.btn-mob-text-prev',
             },
          });
       });


// ------------mobile page About-----------------
       // Swiper on the mobile page About, block review
       $('.swiper-review-mob .swiper-container').each(function( i ) {
           var swiperMobReview = new Swiper('.swiper-review-mob .swiper-container', {
               effect: 'fade',
               navigation: {
                   nextEl: '.swiper-button-next.btn-mob-review-next',
                   prevEl: '.swiper-button-prev.btn-mob-review-prev',
             },
          });
       });

       // Swiper on the mobile page About, block Partners
       $('.swiper-partners-mob .swiper-container').each(function( i ) {
           var swiperMobReview = new Swiper('.swiper-partners-mob .swiper-container', {
               // loop: true,
               slidesPerView: 2,
               slidesPerColumn: 2,
               spaceBetween: 32,
               navigation: {
                   nextEl: '.swiper-button-next.btn-mob-partners-next',
                   prevEl: '.swiper-button-prev.btn-mob-partners-prev',
             },
          });
       });

       // -----------FORM VALIDATION---------------
       $("form").submit(function(e) {
           e.preventDefault();
           var form = $(this);
           var error = 0;

           $(this).find( "input" ).each(function() {
               inp = $(this);
               if($(this).attr('name') == 'user-name'){
                   var regex = new RegExp(/^[а-яёa-z\s]+$/iu);
                   if(regex.test($(inp).val()) == false) {
                       $(this).css('border-color', 'red');
                       error = 1;
                   }
                   else{
                       $(this).css('border-color', '#dfdfdf');
                   }
               }
               if($(this).attr('name') == 'user-email'){
                   var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
                   if(regex.test($(inp).val()) == false) {
                       $(this).css('border-color', 'red');
                       error = 1;
                   }
                   else{
                       $(this).css('border-color', '#dfdfdf');
                   }
               }
               if($(this).attr('name') == 'user-time'){
                   var regex = new RegExp(/^(2[0-4]|[01]?[0-9]):[0-5][0-9]$/);
                   if(regex.test($(inp).val()) == false) {
                       $(this).css('border-color', 'red');
                       error = 1;
                   }
                   else{
                       $(this).css('border-color', '#dfdfdf');
                   }
               }
               if($(inp).attr('name') == 'user-phone'){
                   var regex = new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,20}(\s*)?$/);
                   if(regex.test($(inp).val()) == false) {
                       $(this).css('border-color', 'red');
                       error = 1;
                   }
                   else{
                       $(this).css('border-color', '#dfdfdf');
                   }
               }
           });
           if(error) return 1;
       });


});
