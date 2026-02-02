/* =================================================================
   INSTITUTO REIS - MANIPULAÇÃO DA PÁGINA DE CÍLIOS
   Funcionalidades: Carrosséis, Players de Vídeo e Menu Mobile
   ================================================================= */

document.addEventListener('DOMContentLoaded', function() {

    // =================================================================
    // 1. SWIPER: DEPOIMENTOS (JÁ EXISTENTE)
    // =================================================================
    if (document.querySelector('.videoSwiper')) {
        var testimonialSwiper = new Swiper(".videoSwiper", {
            slidesPerView: 1.2,
            centeredSlides: true,
            spaceBetween: 20,
            loop: false,
            grabCursor: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2.2, centeredSlides: false, spaceBetween: 30 },
                1024: { slidesPerView: 3, centeredSlides: false, spaceBetween: 40 },
                1440: { slidesPerView: 4, centeredSlides: false, spaceBetween: 40 }
            },
            on: {
                slideChange: function () {
                    stopTestimonialVideos(); 
                }
            }
        });
    }

    // =================================================================
    // 2. SWIPER: GALERIA DE RESULTADOS 
    // =================================================================
    if (document.querySelector('.resultsSwiper')) {
        var resultsSwiper = new Swiper(".resultsSwiper", {
            slidesPerView: "auto", 
            centeredSlides: true,
            spaceBetween: 20,
            loop: true, 
            grabCursor: true,
            
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            breakpoints: {
                768: {
                    slidesPerView: 3,
                    centeredSlides: false,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4, 
                    centeredSlides: false,
                    spaceBetween: 40,
                },
            },
        });
    }

    // =================================================================
    // 3. VÍDEO PLAYER: DEPOIMENTOS (COM SOM E LEGENDA)
    // =================================================================
    const testimonialWrappers = document.querySelectorAll('.video-wrapper');

    testimonialWrappers.forEach(wrapper => {
        const video = wrapper.querySelector('.story-video');
        
        const toggleTestimonial = () => {
            if (video.paused) {
                stopTestimonialVideos(); 
                video.muted = false;     
                video.volume = 1.0;
                
                var playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => { wrapper.classList.add('playing'); })
                    .catch(error => { console.log("Erro Autoplay Depoimento: ", error); });
                }
            } else {
                video.pause();
                wrapper.classList.remove('playing'); 
            }
        };

        wrapper.addEventListener('click', toggleTestimonial);
        
        video.addEventListener('ended', () => {
            wrapper.classList.remove('playing'); 
            video.currentTime = 0; 
            video.muted = true; 
        });
    });

    function stopTestimonialVideos() {
        document.querySelectorAll('.video-wrapper video').forEach(vid => {
            vid.pause();
            vid.closest('.video-wrapper').classList.remove('playing');
        });
    }

    // =================================================================
    // 4. VÍDEO PLAYER: GALERIA DE RESULTADOS (NOVO - VISUAL)
    // =================================================================
    const resultContainers = document.querySelectorAll('.video-container-click');

    resultContainers.forEach(container => {
        const video = container.querySelector('.result-video');
        
        container.addEventListener('click', function() {
            if (video.paused) {
                pauseAllResultVideos(video);
                
                video.play();
                this.classList.add('playing'); 
            } else {
                video.pause();
                this.classList.remove('playing'); 
            }
        });
    });

    function pauseAllResultVideos(currentVideo) {
        document.querySelectorAll('.result-video').forEach(vid => {
            if (vid !== currentVideo) {
                vid.pause();
                vid.closest('.video-container-click').classList.remove('playing');
            }
        });
    }

    // =================================================================
    // 5. MENU MOBILE (HAMBÚRGUER)
    // =================================================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileBtn) {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

});