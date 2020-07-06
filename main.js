(function () {
    document.getElementsByTagName('video')[0].addEventListener("ended", function () {
        $('video').css({ 'display': 'none' });
        $('h1', '.header').css({ 'display': 'block' });
        $('p', '.header').css({ 'display': 'block' });
        $('header').css('position', 'relative');
        $('.header').css('height', 'auto');
        $('.buttons', '.header').css('position', 'relative').css('top', '0');

    })
})();




$('#performance').click(function () {

    if ($(this).hasClass('active')) {
        return;
    } else {
        $('#influencer').toggleClass('active');
        $('#performance').toggleClass('active');
    };
    setMain('performance');
    $('.main').toggleClass('influencer');
})

$('#influencer').click(function () {

    if ($(this).hasClass('active')) {
        return;
    } else {
        $('#influencer').toggleClass('active');
        $('#performance').toggleClass('active');
    };
    setMain('influencer');
    $('.main').toggleClass('influencer');
})





$('.btn_smile').click(function () {
    document.getElementById('contact_us').scrollIntoView();
});
$('.btn_smile').push(function () {
    document.getElementById('contact_us').scrollIntoView();
});

window.addEventListener('load', function () {
    if ($('body').innerWidth() > 767) {
        $('.container').each(function () { $(this).css('height', $(this).prev('.video').height() + 'px') })
    }
});
$(window).on('resize', function () {
    if ($('body').innerWidth() > 767) {
        $('.container').each(function () { $(this).css('height', $(this).prev('.video').height() + 'px') })
    }
});

$(window).scroll(function () {
    let top_of_form = $('#contact_us').offset().top;
    let bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    if (bottom_of_screen > top_of_form) {
        $('#contact_us').addClass('open');
    } else {
        $('#contact_us').removeClass('open');
    }
})

$(window).scroll(function () {
    $('.container', '.main').each(function () {
        let i = $(this).parent().index();
        let top_of_element = $(this).offset().top;
        let bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        if (bottom_of_screen > top_of_element) {
            if ($('body').innerWidth() <= 767) {
                if (i > 2) {
                    $('h3', this).css('font-size', '4.8vw');
                } else if (i == 2) {
                    $('h3', this).css('font-size', '7vw');
                } else {
                    $('h3', this).css('font-size', '6.5vw');
                }

            } else {
                $('h3', this).css('font-size', '2.3vw');
            };
        } else {

            $('h3', this).css('font-size', '0');
        }
    })
})

let resizeIrame = function () {
    let newHeight = $('iframe', '.video').width() * 0.5625;
    $('iframe', '.video').css('height', newHeight + 'px');
};

window.addEventListener('load', resizeIrame);
$(window).on('resize', resizeIrame);



let setPlaceholder = function () {

    if ($('body').width() > 767) {
        $('input,textarea', 'form').each(function () {
            $(this).attr('placeholder', $(this).attr('placeholder_web'));
        })

    } else {

        $('input,textarea', 'form').each(function () {
            $(this).attr('placeholder', $(this).attr('placeholder_mob'));
        })
    }
}

$('.select_ar').each(function () {
    let list = $('<ul />');
    let label = $('<span />').text($(this).find('option:selected').text());
    label.insertAfter($(this).find('select'));
    $(this).find('option').not(':disabled').each(function () {
        list.append($('<li />').text($(this).text()));
    });
    list.insertAfter($(this).find('select'));
});






window.addEventListener('load', function () {
    let fields = document.querySelectorAll('form input, form .select_ar, form textarea');
    let validation = Array.prototype.filter.call(fields, function (field) {
        field.addEventListener('blur', function (event) {

            field.classList.add('was-validated');
            if (field.matches('.was-validated:invalid')) {

                $(this).next('.error_val').addClass("_animate");
                let error = $(this).next('.error_val');
                setTimeout((function () {
                    error.removeClass("_animate")
                }
                ), 500);

                $('.btn_smile').addClass("_animate");

                setTimeout((function () {
                    $('.btn_smile').removeClass("_animate")
                }
                ), 500);
            };




        }, false);

        $(document).on('click', function () {
            if (field.hasClass('open')){
            field.classList.add('was-validated');
           
        }
        })


    });
}, false);

$('span','.select_ar').on('click', function() {
    $(this).parent('.select_ar').toggleClass('open');
});

$(document).on('click touch', '.select_ar ul li', function(e){
    e.preventDefault();
    let dropdown = $(this).parent().parent();
    dropdown.find('option:selected').removeAttr('selected');
    let text = $(this).text();
    let active = dropdown.find($(`option:contains(${text})`));
    active.attr('selected',true);
    dropdown.find('span').text($(dropdown).find('option:selected').text());
    dropdown.removeClass('open');
})

$(document).on('click', function(e){
    let select_ar = $('.select_ar');
    if(select_ar !== e.target&& !select_ar.has(e.target).length){
        select_ar.removeClass('open');
    }
});








// else {
//     event.preventDefault();
//     var data = new FormData(this);
//     fetch('send.php', {
//         method: 'post',
//         body: data
//     })
//         .then(res => {
//             if (res.ok) {
//                 formTaskSuccess();
//             } else { formTaskError() }

//         });
// }
