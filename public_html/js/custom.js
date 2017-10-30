(function($) {

    "use strict";

    // Config
    //-------------------------------------------------------------------------------
    var companyName = 'Салон красоты «Май».';
    var address = 'Адресс: Комендантский пр. 13/1'; // Enter your Address


    // Parallax Scrolling
    //-------------------------------------------------------------
    var $w = $(window);
    var newsletterSimple = $('.newsletter-simple');
    var productInfo = $('.product-info');

    function move($c) {
        var offset = $c.offset().top;
        var scroll = $w.scrollTop();
        var diff = offset - scroll;
        var pos = 'center ' + (-diff)*0.2 + 'px';
        $c.css({'backgroundPosition':pos});
    }
    /*
    $w.bind('scroll', function(e){
        move(newsletterSimple);
        move(productInfo);
    });
    */


    // Preloader
    //-------------------------------------------------------------------------------
    window.onscroll = function () {
        window.scrollTo(0, 0);
    };

    $(window).load(function () {
        setTimeout(function () {
            window.onscroll = function () {};
            $('#page-preloader').addClass('slideOutUp');

            // Fix for IE 9
            setTimeout(function () {
                $('#page-preloader').addClass('hidden');
            }, 700);

        }, 100);

    });


    // Initialize Tooltip
    //-------------------------------------------------------------
    $('.my-tooltip').tooltip();


    // Initialize Datetimepicker
    //-------------------------------------------------------------------------------
    $('.datepicker').datepicker().on('changeDate', function () {
        $(this).datepicker('hide');
    });

    // Show Callback Model
    $('.show-appointment-modal-callback').on('click', function () {
        var service = $(this).data('service');
        $('#appointmentModal-2').modal('show');
        return false;
    });
    // End Callback Model
    // Show Appointment Modal
    //-------------------------------------------------------------------------------
    $('.show-appointment-modal').on('click', function () {
        var service = $(this).data('service');
        if (service) {
            $("#appointment-service").val(service);
        }
        $('#appointmentModal').modal('show');
        return false;
    });


    // Scroll To Animation
    //-------------------------------------------------------------------------------
    $('body').scrollspy({target: '#navigation-top-1', offset: 88});

    var scrollTo = $(".scroll-to");

    scrollTo.click(function (event) {
        $('.modal').modal('hide');
        var position = $(document).scrollTop();
        var scrollOffset = 87;

        var marker = $(this).attr('href');
        $('html, body').animate({scrollTop: $(marker).offset().top - scrollOffset}, 'slow');
        return false;
    });


    // Scroll Up Btn
    //-------------------------------------------------------------------------------
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.scroll-up-btn').removeClass("animated fadeOutRight");
            $('.scroll-up-btn').fadeIn().addClass("animated fadeInRight");
        } else {
            $('.scroll-up-btn').removeClass("animated fadeInRight");
            $('.scroll-up-btn').fadeOut().addClass("animated fadeOutRight");
        }
    });



    // Navigation Top
    //-------------------------------------------------------------
    $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > 300) {
            $('.navbar-hidden').fadeIn();
        } else {
            $('.navbar-hidden').fadeOut();
        }
    });


    // Gallery
    //-------------------------------------------------------------
    $(".gallery .gallery-thumbnail-container").on("click", function () {

        var src = $(this).find("img").data('img');
        var galleryImg = $('<img/>').attr('src', src).addClass('img-responsive');

        var galleryImgWidth;
        galleryImg.load(function () {
            galleryImgWidth = this.width;
        });

        var imgTitle = $(this).find('.gallery-img-title').html();
        var imgSubtitle = $(this).find('.gallery-img-subtitle').html();


        $('#galleryModal').modal();
        $('#galleryModal').on('shown.bs.modal', function () {
            $('#galleryModal .modal-dialog').css('max-width', galleryImgWidth);
            $('#galleryModal .modal-body').html(galleryImg);
            $('#galleryModal .modal-nav .title').html(imgTitle + ' - ' + imgSubtitle);
        });
        $('#galleryModal').on('hidden.bs.modal', function () {
            $('#galleryModal .modal-body').html('');
        });
    });


    /* fix vertical when not overflow
     call fullscreenFix() if .fullscreen content changes */
    function fullscreenFix() {
        var h = $('body').height();
        // set .fullscreen height
        $(".content-b").each(function (i) {
            if ($(this).innerHeight() <= h) {
                $(this).closest(".fullscreen").addClass("not-overflow");
            }
        });
    }

    $(window).resize(fullscreenFix);
    fullscreenFix();


    /* resize background images */
    function backgroundResize() {
        var windowH = $(window).height();
        $(".header-full-screen-img").each(function (i) {
            var path = $(this);
            // variables
            var contW = path.width();
            var contH = path.height();
            var imgW = path.attr("data-img-width");
            var imgH = path.attr("data-img-height");
            var ratio = imgW / imgH;
            // overflowing difference
            var diff = parseFloat(path.attr("data-diff"));
            diff = diff ? diff : 0;
            // remaining height to have fullscreen image only on parallax
            var remainingH = 0;
            if (path.hasClass("parallax")) {
                var maxH = contH > windowH ? contH : windowH;
                remainingH = windowH - contH;
            }
            // set img values depending on cont
            imgH = contH + remainingH + diff;
            imgW = imgH * ratio;
            // fix when too large
            if (contW > imgW) {
                imgW = contW;
                imgH = imgW / ratio;
            }
            //
            path.data("resized-imgW", imgW);
            path.data("resized-imgH", imgH);
            path.css("background-size", imgW + "px " + imgH + "px");
        });
    }

    $(window).resize(backgroundResize);
    $(window).focus(backgroundResize);
    backgroundResize();


    // Contact Form
    //-------------------------------------------------------------

    $("#contact-form-gmap").submit(function () {

        $('#contact-form-gmap-msg').addClass('hidden');
        $('#contact-form-gmap-msg').removeClass('alert-success');
        $('#contact-form-gmap-msg').removeClass('alert-danger');

        $('#contact-form-gmap .btn-submit').attr('disabled', 'disabled');

        $.ajax({
            type: "POST",
            url: "php/index.php",
            data: $("#contact-form-gmap").serialize(),
            dataType: "json",
            success: function (data) {

                if ('success' == data.result) {
                    $('#contact-form-gmap-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                    $('#contact-form-gmap-msg').html(data.msg[0]);
                    $('#contact-form-gmap .btn-submit').removeAttr('disabled');
                    $('#contact-form-gmap')[0].reset();
                }

                if ('error' == data.result) {
                    $('#contact-form-gmap-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                    $('#contact-form-gmap-msg').html(data.msg[0]);
                    $('#contact-form-gmap .btn-submit').removeAttr('disabled');
                }

            }
        });

        return false;
    });


    // Appointment Form
    //-------------------------------------------------------------

    $("#appointment-form").submit(function () {

        $('#appointment-form-msg').addClass('hidden');
        $('#appointment-form-msg').removeClass('alert-success');
        $('#appointment-form-msg').removeClass('alert-danger');

        $('#appointment-form .btn-submit').attr('disabled', 'disabled');
        var test = $("#appointment-form").serialize();
        console.log(test);
        $.ajax({
            type: "POST",
            url: "php/index.php",
            data: $("#appointment-form").serialize(),
            dataType: "json",
            success: function (data) {

                if ('success' == data.result) {
                    $('#appointment-form-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                    $('#appointment-form-msg').html(data.msg[0]);
                    $('#appointment-form .btn-submit').removeAttr('disabled');
                    $('#appointment-form')[0].reset();
                }

                if ('error' == data.result) {
                    $('#appointment-form-msg').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                    $('#appointment-form-msg').html(data.msg[0]);
                    $('#appointment-form .btn-submit').removeAttr('disabled');
                }

            }
        });

        return false;
    });

    // Aboniment
    //-------------------------------------------------------------

    $("#appointment-form-2").submit(function () {

        $('#appointment-form-msg-2').addClass('hidden');
        $('#appointment-form-msg-2').removeClass('alert-success');
        $('#appointment-form-msg-2').removeClass('alert-danger');

        $('#appointment-form-2 .btn-submit').attr('disabled', 'disabled');
        var test = $("#appointment-form-2").serialize();
        console.log(test);
        $.ajax({
            type: "POST",
            url: "php/index.php",
            data: $("#appointment-form-2").serialize(),
            dataType: "json",
            success: function (data) {

                if ('success' == data.result) {
                    $('#appointment-form-msg-2').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                    $('#appointment-form-msg-2').html(data.msg[0]);
                    $('#appointment-form-2 .btn-submit').removeAttr('disabled');
                    $('#appointment-form-2')[0].reset();
                }

                if ('error' == data.result) {
                    $('#appointment-form-msg-2').css('visibility', 'visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                    $('#appointment-form-msg-2').html(data.msg[0]);
                    $('#appointment-form-2 .btn-submit').removeAttr('disabled');
                }

            }
        });

        return false;
    });


    // Newsletter Form
    //-------------------------------------------------------------------------------

    $( "#newsletter-form" ).submit(function() {

        $('#newsletter-form-msg').addClass('hidden');
        $('#newsletter-form-msg').removeClass('alert-success');
        $('#newsletter-form-msg').removeClass('alert-danger');

        $('#newsletter-form input[type=submit]').attr('disabled', 'disabled');

        $.ajax({
            type: "POST",
            url: "php/index.php",
            data: $("#newsletter-form").serialize(),
            dataType: "json",
            success: function(data) {

                if('success' == data.result)
                {
                    $('#newsletter-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-success');
                    $('#newsletter-form-msg').html(data.msg[0]);
                    $('#newsletter-form input[type=submit]').removeAttr('disabled');
                    $('#newsletter-form')[0].reset();
                }

                if('error' == data.result)
                {
                    $('#newsletter-form-msg').css('visibility','visible').hide().fadeIn().removeClass('hidden').addClass('alert-danger');
                    $('#newsletter-form-msg').html(data.msg);
                    $('#newsletter-form input[type=submit]').removeAttr('disabled');
                }

            }
        });

        return false;
    });



    // Load Contact Ymap
    //-------------------------------------------------------------

    $(document).ready(function () {
        ymaps.ready(init);
        function init() {
            var myMap = new ymaps.Map("map", {
                    center: [59.943494, 30.413344],
                    zoom: 10
                }, {
                    searchControlProvider: 'yandex#search'
                }),

                // Создаем геообъект с типом геометрии "Точка".
                myGeoObject = new ymaps.GeoObject();

                myMap.geoObjects
                .add(myGeoObject)
                .add(new ymaps.Placemark([59.940506, 30.378166], {
                    balloonContent: 'Салон Май на <strong>Суворовском пр., 34</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
                .add(new ymaps.Placemark([59.93268, 30.360451], {
                    balloonContent: 'Салон Май на <strong>Восстания, 3/5</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
                .add(new ymaps.Placemark([59.940506, 30.378166], {
                    balloonContent: 'Салон Май на <strong>Комендантском пр., 13/1</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
                .add(new ymaps.Placemark([59.990624, 30.317126], {
                    balloonContent: 'Салон Май на <strong>Торжковской, 13/1</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
                .add(new ymaps.Placemark([59.971312, 30.309598], {
                    balloonContent: 'Салон Май на <strong>Профессора Попова, 27</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
                .add(new ymaps.Placemark([59.859027, 30.32204], {
                    balloonContent: 'Салон Май на <strong>Московском проспекте, 204</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
                .add(new ymaps.Placemark([59.873352, 30.261529], {
                    balloonContent: 'Салон Май на <strong>Зенитчиков, 5</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
                .add(new ymaps.Placemark([60.011567, 30.397759], {
                    balloonContent: 'Салон Май на <strong>Гражданском проспекте, 41А</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
                .add(new ymaps.Placemark([59.849202, 30.144245], {
                    balloonContent: 'Салон Май на <strong>Петергофском шоссе, 51А</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
                .add(new ymaps.Placemark([59.859361, 30.19182], {
                    balloonContent: 'Салон Май на <strong>Ленинском проспекте, 78к1</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }))
                .add(new ymaps.Placemark([59.932423, 30.360721], {
                    balloonContent: 'Салон Май <strong>HairSPA на Восстания, 3</strong>'
                }, {
                    preset: 'islands#icon',
                    iconColor: '#0095b6'
                }));
        }
    })






// end document ready
})(jQuery);