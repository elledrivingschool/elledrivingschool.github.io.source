(function (window) {
    'use strict';

    $(document).on('click', '#menu', function (e) {
        $('.hidden-menu ').toggleClass('open');
        $(this).toggleClass('close');
        e.preventDefault();
    });
}(window, undefined));


