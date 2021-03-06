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


let value = localStorage.getItem('zorka.comments_cookie');
if (!value) {
    setTimeout("$('.popup_cookie').css('display', 'flex')", 5000);
};

$('.popup_cookie button').click(function () {
    $('.popup_cookie').css('display', 'none');
    localStorage.setItem('zorka.comments_cookie', true);
});

$('.popup_cookie .close_cookie').click(function () {
    $('.popup_cookie').css('display', 'none');
});

$('.thankYou .exit').click(function () {
    $('.thankYou ').css('display', 'none');
    $('.btn_smile').css('display', 'block');
});

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



$(window).scroll(function () {
    let top_of_form = $('#contact_us').offset().top;
    let bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
    if (bottom_of_screen > top_of_form) {
        $('#contact_us').addClass('open');

    } else {
        $('#contact_us').removeClass('open');
        return;
    }
});

function formTaskSuccess() {
    $('.thankYou').css('display', 'flex');
    $('.btn_smile').css('display', 'none');
}

function ClearForm() {
    $('#contact_us').trigger('reset');
    autosizeInput(document.querySelector('#task_name'));
    autosizeInput(document.querySelector('#task_company'));
    autosizeInput(document.querySelector('#task_email'));
    autosizeInput(document.querySelector('#task_msg'));
    $('form .was-validated').removeClass('was-validated');
    $('.select_ar').each(function () {
        $(this).find('span').text($(this).find('option:disabled').text());
        $(this).find('option:disabled').attr('selected', true);
    });
    $('form .checkbox_policy').css('display', 'none');
}

$('.btn_smile').click(function () {
    if ($('form').hasClass('open')) {
        let fields = document.querySelectorAll('form input, form .select_ar, form textarea');
        for (let field of fields) {
            field.classList.add('was-validated');
        };


        let error_fields = $('.was-validated:invalid').add($('.was-validated').has('select:invalid')).add('.checkbox:invalid');
        if (error_fields.length != 0) {

            let error = error_fields.parent().find('.error_val');

            error.addClass("_animate");

            setTimeout((function () {
                error.removeClass("_animate")
            }), 500);

            $('.btn_smile').addClass("_animate");

            setTimeout((function () {
                $('.btn_smile').removeClass("_animate")
            }), 500);

        } else {
            var data = new FormData(contact_us);
            fetch('send.php', {
                method: 'post',
                body: data
            })
                .then(res => {
                    if (res.ok) {
                        formTaskSuccess();
                        ClearForm();
                    } else {
                        $('.btn_smile').addClass("_animate");

                        setTimeout((function () {
                            $('.btn_smile').removeClass("_animate")
                        }), 500);
                    }

                });
        };

    } else {
        document.getElementById('contact_us').scrollIntoView();
    }
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
    $('.container', '.main').each(function () {
        let i = $(this).parent().index();
        let top_of_element = $(this).offset().top;
        let bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
        if (bottom_of_screen > top_of_element) {


            $('.underline div', this).css('margin-left', '');

        } else {

            $('.underline div', this).css('margin-left', '-100%');
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
    for (let field of fields) {
        field.addEventListener('blur', function (event) {


            field.classList.add('was-validated');
            if (field.matches('.was-validated:invalid')) {
                let error = $(this).parent().find('.error_val');
                error.addClass("_animate");

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
            let error_fields = $('form *:invalid');
            if (error_fields.length == 0) {

                $('form .checkbox_policy').css('display', 'flex');

            }




        }, false);




    };



}, false);

$(document).on('click', function () {
    $('.select_ar.open').addClass('was-validated');
});

$('span', '.select_ar').on('click', function () {
    $(this).parent('.select_ar').toggleClass('open');
});



$(document).on('click touch', '.select_ar ul li', function (e) {
    e.preventDefault();
    let dropdown = $(this).parent().parent();
    dropdown.find('option:selected').removeAttr('selected');
    let text = $(this).text();
    let active = dropdown.find($(`option:contains(${text})`));
    active.attr('selected', true);
    dropdown.find('span').text($(dropdown).find('option:selected').text());
    dropdown.removeClass('open');
    let error_fields = $('form *:invalid');
    if (error_fields.length == 0) {

        $('form .checkbox_policy').css('display', 'flex');

    }
})

$(document).on('click', function (e) {
    let select_ar = $('.select_ar');
    if (select_ar !== e.target && !select_ar.has(e.target).length) {
        let error = $('.select_ar.open.was-validated').has('select:invalid').parent().find('.error_val');
        select_ar.removeClass('open');
        error.addClass("_animate");

        setTimeout((function () {
            error.removeClass("_animate")
        }
        ), 500);
        if (error.length !== 0) {
            $('.btn_smile').addClass("_animate");

            setTimeout((function () {
                $('.btn_smile').removeClass("_animate")
            }
            ), 500);
        }

    };

});

