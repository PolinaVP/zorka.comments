
let videos;

let setContent = function (videos) {
    document.getElementById('main').innerHTML = "";
    for (let i = 0; i < videos.length; i++) {

        let div = document.createElement('div');
        div.innerHTML = `
    <div class="video">
                <img class="start_video" src=${videos[i].preview[0]} alt="">
                <iframe    frameborder="0" part=0
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen ></iframe>
                <div class="play"></div>    
                <div class="next_video">&#10095</div> 
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
            div.querySelector('.dots').style.display = 'none';
        }

        document.getElementById('main').append(div);

        for (let n = 0; n < videos[i].video.length; n++){
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



    $('.next_video', '.video').click(function (e) {
        let i = $('.next_video', '.video').index(e.target);
        let part = $(this).prevAll('iframe').attr('part');
        part++;
        if (part >= videos[i].video.length) {
            part = 0;
        };

            $(this).prevAll('iframe').attr('part', part);
            $(this).prevAll('iframe').attr('src', videos[i].video[part]);
            $(this).parent().parent().find('a').attr('href', videos[i].source[part]);
            $(this).parent().find('.dots div').removeClass('active');
            $(this).parent().find('.dots div')[part].addClass('active');
         if (videos[i].description[part]){
            $(this).parent().parent().find('p').html(videos[i].description[part]);
         }
         $(this).prevAll('img').attr('src', videos[i].preview[part]);
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
    console.log(videos);
}
setMain("influencer");
$(window).on('resize', setVideos);






