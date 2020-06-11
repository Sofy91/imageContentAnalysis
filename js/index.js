
document.addEventListener("DOMContentLoaded", function() {

    $('#link-home').click(function(e) {
      e.preventDefault();
      let sectionTop = $("#section-home").offset().top;
      $('html, body').animate({
        scrollTop: sectionTop
        }, 1000);
    });

    $('#link-how-it-work').click(function(e) {
      e.preventDefault();
      let sectionTop = $("#section-how-it-work").offset().top - 55;
      $('html, body').animate({
        scrollTop: sectionTop
        }, 1000);
    });

    $('#link-sponsor').click(function(e) {
      e.preventDefault();
      let sectionTop = $("#section-sponsor").offset().top - 55;
      $('html, body').animate({
        scrollTop: sectionTop
        }, 1000);
    });

    $('#link-news').click(function(e) {
      e.preventDefault();
      let sectionTop = $("#section-news").offset().top - 55;   


      $('html, body').animate({
        scrollTop: sectionTop
        }, 1000, function(){
          $('.news-right').addClass('animated');
          $('.news-right').addClass('bounceInRight');
          $('.news-right').css('opacity','1');

          $('.news-left').addClass('animated');
          $('.news-left').addClass('bounceInLeft');
          $('.news-left').css('opacity','1');        
      });

    });

    $('#link-contact').click(function(e) {
      e.preventDefault();
      let sectionTop = $("#section-contact").offset().top - 55;
      $('html, body').animate({
        scrollTop: sectionTop
        }, 1000);
    });

    

    $(window).scroll(function() {
      var top_of_element = $("#section-news").offset().top + 180;
      var bottom_of_element = $("#section-news").offset().top + $("#section-news").outerHeight() + 180;
      var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
      var top_of_screen = $(window).scrollTop();
  
      if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)){
        $('.news-right').addClass('animated');
          $('.news-right').addClass('bounceInRight');
          $('.news-right').css('opacity','1');

          $('.news-left').addClass('animated');
          $('.news-left').addClass('bounceInLeft');
          $('.news-left').css('opacity','1');
      }
  });
});
