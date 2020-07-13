
let videos;

let setContent = function (videos) {
    document.getElementById('main').innerHTML = "";
    for (let i = 0; i < videos.length; i++) {

        let div = document.createElement('div');
        div.innerHTML = `
    <div class="video">
                <div class="prev_video"><i class= arrow-left></i></div> 
                <img class="start_video" src=${videos[i].preview[0]} alt="">
                <iframe    frameborder="0" part=0
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen ></iframe>
                <div class="play"></div>    
                <div class="next_video"><i class= arrow-right></i></div> 
                <div class="dots"></div>   
            </div>
            <div class="container">
                <div>
                <h3>${videos[i].title}</h3>
                <div class="underline"><h3>${videos[i].title}</h3></div>
                </div>
                <p>${videos[i].description[0]}</p>
                <a href=${videos[i].source[0]} target=" _blank" >Check it out</a>
    `;




        if (videos[i].video.length < 2) {
            div.querySelector('.next_video').style.display = 'none';
            div.querySelector('.prev_video').style.display = 'none';
            div.querySelector('.dots').style.display = 'none';
        }

        document.getElementById('main').append(div);

        for (let n = 0; n < videos[i].video.length; n++) {
            let dot = document.createElement('div');

            $('.dots')[i].append(dot);

        }

        $('.dots div:first-child').addClass('active');


    };

    $('img', '.video').click(function (e) {

        let part = $(this).nextAll('iframe').attr('part');
        let i = $('img', '.video').index(e.target);
        $(this).css({ 'display': 'none' });
        $(this).nextAll('.play').css({ 'display': 'none' });
        $(this).next('iframe').attr('src', videos[i].video[part] + '?autoplay=1');
        $(this).next('iframe').css({ 'display': 'block' });
        $(this).parent().next('.container').height($(this).next('iframe').height());
        resizeIrame();
    });

    $('.play', '.video').click(function (e) {
        let part = $(this).prevAll('iframe').attr('part');
        let i = $('.play', '.video').index(e.target);
        $(this).css({ 'display': 'none' });
        $(this).prevAll('img').css({ 'display': 'none' });
        $(this).prev('iframe').attr('src', videos[i].video[part] + '?autoplay=1');
        $(this).prev('iframe').css({ 'display': 'block' });
        resizeIrame();
    })



    $('.next_video', '.video').click(function () {
        let i = $(this).parent('.video').parent().index();
        let part = $(this).prevAll('iframe').attr('part');
        part++;
        if (part >= videos[i].video.length) {
            part = 0;
        };

        $(this).prevAll('iframe').attr('part', part);
        $(this).prevAll('iframe').attr('src', videos[i].video[part]);
        $(this).parent().parent().find('a').attr('href', videos[i].source[part]);
        $(this).parent().find('.dots div').removeClass('active');
        $(this).parent().find(`.dots div:nth-child(${part + 1})`).addClass('active');
        if (videos[i].description[part]) {
            $(this).parent().parent().find('p').html(videos[i].description[part]);
        }
        $(this).prevAll('img').attr('src', videos[i].preview[part]);
    })


    $('.prev_video', '.video').click(function () {
        let i = $(this).parent('.video').parent().index();
        let part = $(this).nextAll('iframe').attr('part');
        part--;
        if (part < 0) {
            part = videos[i].video.length - 1;
        };


        $(this).nextAll('iframe').attr('part', part);
        $(this).nextAll('iframe').attr('src', videos[i].video[part]);
        $(this).parent().parent().find('a').attr('href', videos[i].source[part]);
        $(this).parent().find('.dots div').removeClass('active');
        $(this).parent().find(`.dots div:nth-child(${part + 1})`).addClass('active');
        if (videos[i].description[part]) {
            $(this).parent().parent().find('p').html(videos[i].description[part]);
        }
        $(this).nextAll('img').attr('src', videos[i].preview[part]);
    })

};


let setVideos = function () {
    let video = document.querySelectorAll('.video');
    let container = document.querySelectorAll('.main .container');
    if ($('body').innerWidth() <= 767) {
        for (let i = 0; i < container.length; i++) {
            container[i].querySelector('p').before(video[i]);
        }
    } else {
        for (let i = 0; i < container.length; i++) {
            container[i].before(video[i]);
        }

    }
};

let setMain = function (marketing) {
    let url = `${marketing}/videos.json`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            videos = data;
            setContent(videos);
            setVideos();
        });
}
setMain("influencer");
$(window).on('resize', setVideos);



let articles;

let loadArticles = function () {
    let url = `articles/articles.json`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            articles = data;
            console.log(articles);
            setArticles();
        });
}

loadArticles();


let setArticles = function () {

    for (let i = 0; i < articles.length; i++) {

        let li = document.createElement('li');
        li.innerHTML = `
        <div>
        <div class="article" style="background-image: url(${articles[i].preview})"></div>
        <div class="container">
        
            <h3><a href ="${articles[i].source}">${articles[i].title}</a></h3>
            
        </div>
        </div>
    `;

        document.querySelector('#article ul').append(li);

    }
}

let position = 0;
let list = $('#article ul');
$('.featured_on .next_article').click(function () {
    let width = $('#article').width();
    position -= width;
    position = Math.max(position, -width * (articles.length - 1));
    list.css('margin-left', `${position + 'px'}`);
});

$('.featured_on .prev_article').click(function () {
    let width = $('#article').width();
    position += width;
    position = Math.min(position, 0);
    list.css('margin-left', `${position + 'px'}`);
});



