//PRELOADER

$(document).ready(function () {
  var inText = $('#prelText'),
      counter = 0;
  setInterval(function () {
    inText.text(counter + '%');
    counter++;
    if (counter >= 100){
      counter = 100;
    }
  }, 47)
});

$(window).load(function () {

  setTimeout(function () {
    $('#prelText').text('100%');
    $('#preloader').hide();
    // $('#preloader').css('display', 'none')
  }, 1000)
});


//FLIPPING CARD
  var change = function (disp, disp2,cl) {
  $('.block').css('display', disp);
  $('.block-login').css('display', disp2);
  $('#log').addClass(cl);
};
  
  $("#log").on("click", function(e) {
    $("#bl").addClass("flipped");
    setTimeout(function(){
      change('none','flex','tapped')}, 600);
    });



  $(document).on('click', function (e) {
    if ($('#log').hasClass('tapped')) {
      $('#bl').removeClass('flipped');
      $('#log').removeClass('tapped');
      setTimeout(change('flex', 'none', ''), 1000)
    }
  });



  /* Заполнение шкалы скилов
 var circle = document.getElementById('circle'),
     btn = document.getElementById('start');
  btn.onclick = function () {
    var input = document.getElementById("text").value;
    var innerInp = (input*314)/100;
    var strInner = innerInp.toString();
    console.log(strInner);
    circle.style.strokeDasharray = strInner + "px 314px";
  };
  */

  //высота блоков на странице About

  function evenBlocks() {
    var left = $('.info-about-me'),
        right = $('.advantages');
    // console.log('Высота левого: ' + left.height());
    // console.log('Высота правого: ' + right.height());
    if(left.height() >= right.height()){
      right.height(left.height());
    } else {
      left.height(right.height());
    }
  }

    if ($(window).width() > 760){
      evenBlocks();
    } else {
      $('.info-about-me').css('height', 'auto');
      $('.advantages').css('height', 'auto');
    }


//MENU

$('#menu__open').on('click', function (e) {


  e.preventDefault();

  var menuL = $('.menu__left'),
      menuR = $('.menu__right'),
      menu = $('.menu'),
      content = $('.menu__content');

  menu.show();
  menu.addClass('active');
  // menuL.addClass('menu__left_turn');
  // menuR.addClass('menu__right_turn');

  menu.css('display', 'flex');

  setTimeout(function () {
    content.show();
    $('#menu__close').css('display', 'block');
    $('#menu__open').css('display','none');
  }, 400);

});

///Closing the menu

$('#menu__close').on('click', function (e) {
  e.preventDefault();
  var menuL = $('.menu__left'),
      menuR = $('.menu__right'),
      menu = $('.menu'),
      content = $('.menu__content');

  content.hide();


  // menuL.removeClass('menu__left_turn');
  // menuR.removeClass('menu__right_turn');
menu.removeClass('active');

  setTimeout(function () {
    $('#menu__close').css('display', 'none');
    $('#menu__open').css('display', 'block');
    menu.css('display', 'none');

  }, 400);

});


// MOUSE PARALLAX

$(window).on('mousemove', function(e){
  var mouseX = e.pageX,
      mouseY = e.pageY,
      w = (window.innerWidth/2),  // для изменения начальной точки центра на середину окна
      h = (window.innerHeight/2),
      MoveX = ((w*0.01) - mouseX)*0.05,
      MoveY = ((h*0.01) - mouseY)*0.05;

      //console.log(mouseX, mouseY + ';;;' + MoveX, MoveY);

  $('.mountains').css({
  'transform' : 'translate3d(' + MoveX + 'px, ' + MoveY + 'px, 0)'});  // the main idea is here. it would also be conscious to set varieties out of the 'transform3d' property

  });



//SLIDER


(function () {
    var nextBtn = $('#sliderUp'),
        prevBtn = $('#sliderDown'),
        sliderItemsRight = $('.slider__pictures_list-right .slider__pict'),
        sliderItemsLeft = $('.slider__pictures_list-left .slider__pict'),
        mainPic = $('.slider__main-picture'),
        currentSlideIndex = 0,
        animationDuration = 300,
        descrList = $('.slider__description_list .slider__description_item');

    $(document).ready(function () {
        nextBtn.on('click', changeSlide);
        prevBtn.on('click', changeSlide);
    });

    function changeSlide(e) {
        e.preventDefault();
        
        var $this = $(this);
        
        if ($this.hasClass('move__control-down')){
            if (currentSlideIndex - 1 < 0){
                currentSlideIndex = sliderItemsRight.length - 1;
            } else {
                currentSlideIndex--;
            }
        } else {
            if (currentSlideIndex + 1 > sliderItemsRight.length - 1){
                currentSlideIndex = 0;
            } else {
                currentSlideIndex++;
            }
        }


        changeMainPic(sliderItemsRight);
        slideLeftPreview(sliderItemsLeft);
        slideRightPreview(sliderItemsRight);
        changeDescription();

        setTimeout(function () {
            nextBtn.attr('disabled', 'false');
            prevBtn.attr('disabled', 'false');
        }, animationDuration);

    }

    function changeDescription() {
        descrList.removeClass('active');
        descrList.eq(currentSlideIndex).addClass('active');

    }
    
    function changeMainPic(slideItems) {
        var nextIndexSrc = slideItems.eq(currentSlideIndex).find('img').attr('src');
        mainPic.fadeOut(function () {
            mainPic.attr('src', nextIndexSrc);
            $(this).fadeIn();
        });

    }

    function slideLeftPreview(slideItems) {
        var nextImgIndex;

        if (currentSlideIndex + 1 >= slideItems.length){
            nextImgIndex = 0;
        } else {
            nextImgIndex = currentSlideIndex + 1;
        }

        nextBtn.attr('disabled', 'true');
        prevBtn.attr('disabled', 'true');

        slideItems.filter('.active').addClass('slider__pict_to-up').removeClass('active');
        slideItems.eq(nextImgIndex).addClass('active');

        setTimeout(function () {
            slideItems.removeClass('slider__pict_to-up')
        }, animationDuration);
    }

    function slideRightPreview(slideItems) {
        var nextImgIndex;
        if (currentSlideIndex == 0){
            nextImgIndex = slideItems.length - 1;
        } else {
            nextImgIndex = currentSlideIndex - 1;
        }

        nextBtn.attr('disabled', 'true');
        prevBtn.attr('disabled', 'true');

        slideItems.filter('.active').addClass('slider__pict_to-down').removeClass('active');
        slideItems.eq(nextImgIndex).addClass('active');

        setTimeout(function () {
            slideItems.removeClass('slider__pict_to-down')
        }, animationDuration);

    }



})();


//STICKY BLOG MENU

(function sticky() {
  $(window).scroll(function() {
    var wScroll = $(window).scrollTop(),
        start = $('.blog__content').offset().top,
        menu = $('.blog__list'),
        articles = $('.content__article');

    if (wScroll >= start) {
      menu.addClass('blog__list_sticky')
    } else {
      menu.removeClass('blog__list_sticky')
    }
    Array.from(articles).forEach(function (item, index) {
      // if (item.offset().top >= wScroll && item.eq(index).offset().top <= (wScroll + item.eq(index).height())){
      //   menu.eq(index).addClass('blog__list_item-link-active');
      //   menu.eq(index - 1).removeClass('blog__list_item-link-active');
      // }
      console.log(item.offset().top)
    })
  });
}());