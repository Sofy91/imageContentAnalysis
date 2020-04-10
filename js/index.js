
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
      let sectionTop = $("#section-how-it-work").offset().top - 70;
      $('html, body').animate({
        scrollTop: sectionTop
        }, 1000);
    });

    $('#link-sponsor').click(function(e) {
      e.preventDefault();
      let sectionTop = $("#section-sponsor").offset().top - 70;
      $('html, body').animate({
        scrollTop: sectionTop
        }, 1000);
    });
});
