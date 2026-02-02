/* =================================================================
   FUNCIONALIDADE: SWIPER VÍDEOS + GALERIA INFINITA + SMART PLAYER
   ================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema Trancista Carregado.");

    // =================================================================
    // 1. CARROSSEL DE VÍDEOS (DEPOIMENTOS)
    // =================================================================
    if (document.querySelector(".videoSwiper")) {
        var videoSwiper = new Swiper(".videoSwiper", {
            slidesPerView: 1.2, 
            spaceBetween: 20,   
            centeredSlides: true, 
            loop: false, 
            
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    centeredSlides: false,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3, 
                    centeredSlides: false,
                    spaceBetween: 40,
                },
            },
            
            on: {
                slideChange: function () {
                    stopAllVideos();
                }
            }
        });
    }

    // =================================================================
    // 2. NOVO: GALERIA INFINITA (MARQUEE / ESTEIRA DE FOTOS)
    // =================================================================
    if (document.querySelector(".marqueeSwiper")) {
        var marqueeSwiper = new Swiper(".marqueeSwiper", {
            // Configurações para efeito "Esteira Contínua"
            spaceBetween: 20,
            centeredSlides: true,
            
            // Velocidade: 5000ms = 5 segundos para uma volta completa (ajuste se quiser mais rápido)
            speed: 5000, 
            
            autoplay: {
                delay: 0, 
                disableOnInteraction: false,
            },
            
            loop: true, 
            slidesPerView: "auto",
            allowTouchMove: true, 
        });
    }

    // =================================================================
    // 3. LÓGICA DE REPRODUÇÃO DE VÍDEO (SMART PLAYER)
    // =================================================================
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    if (videoWrappers.length > 0) {
        videoWrappers.forEach(wrapper => {
            const video = wrapper.querySelector('.story-video');
            
            // Segurança: Se não achar o vídeo, pula para o próximo
            if (!video) return; 

            const togglePlay = () => {
                if (video.paused) {
                    // 1. Pausa todos os outros antes
                    stopAllVideos();
                    
                    // 2. Configura e Toca
                    video.muted = false;
                    video.volume = 1.0;  
                    
                    var playPromise = video.play();

                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            wrapper.classList.add('playing');
                        })
                        .catch(error => {
                            console.log("Erro ao reproduzir (Autoplay bloqueado?): ", error);
                        });
                    }
                    
                } else {
                    // 3. Pausa se já estiver tocando
                    video.pause();
                    wrapper.classList.remove('playing');
                }
            };

            // Adiciona click no Wrapper inteiro e no vídeo
            wrapper.addEventListener('click', togglePlay);
            
            // Quando acabar, reseta
            video.addEventListener('ended', () => {
                wrapper.classList.remove('playing');
                video.currentTime = 0;
            });
        });
    }

    // =================================================================
    // 4. FUNÇÃO AUXILIAR GLOBAL
    // =================================================================
    function stopAllVideos() {
        document.querySelectorAll('video.story-video').forEach(vid => {
            vid.pause();
            // Remove a classe 'playing' do pai (wrapper) para mostrar o botão play
            const parentWrapper = vid.closest('.video-wrapper');
            if (parentWrapper) {
                parentWrapper.classList.remove('playing');
            }
        });
    }

});