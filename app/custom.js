/* 2014, Chris Zimmerman */
$(document).ready(function () {
    $('#favorites').hide().addClass('hidden');
    $('#home').addClass('visible');

    $('.same-page-nav').click(function (event) {
        var target = $(event.target);

        if (target.is('a')) {
            event.preventDefault();
            if ($(target.attr('href')).hasClass('hidden')) {
                $('.visible').removeClass('visible').addClass('hidden').hide();
                $(target.attr('href')).removeClass('hidden').addClass('visible').show();
            }
        }
    });
});
