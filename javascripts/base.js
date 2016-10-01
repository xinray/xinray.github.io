$('document').ready(function(){
    $('.fa-navicon').click(function(e) {
        e.preventDefault();

        $('.navbar').slideToggle('fast');
    });
    var backToTop = document.querySelector('.back-to-top ');
    var backToTopA = document.querySelector('.back-to-top a');
    window.addEventListener('scroll',function () {

        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)

        if (scrollTop > 200) {
            backToTop.classList.add('back-to-top-show')
        } else {
            backToTop.classList.remove('back-to-top-show')
        }
    })
});
