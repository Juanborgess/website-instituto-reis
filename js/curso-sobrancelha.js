/* =================================================================
   INSTITUTO REIS - SISTEMA DA PÁGINA DE SOBRANCELHAS
   Módulos: Menu Mobile, Carrossel de Vídeos, Player Inteligente e
   NOVO: Galeria de Fotos (Portfolio)
   ================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema Sobrancelhas Carregado. Iniciando módulos...");

    // =================================================================
    // MÓDULO 1: MENU MOBILE (NAVBAR)
    // Mantido original para garantir funcionamento
    // =================================================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn && navMenu) {
        // Toggle (Abrir/Fechar)
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            mobileBtn.classList.toggle('active'); 
            navMenu.classList.toggle('active');  
        });

        // Fechar ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target) && navMenu.classList.contains('active')) {
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // =================================================================
    // MÓDULO 2: SWIPER DE DEPOIMENTOS (VÍDEOS)
    // Configurado para não dar loop e pausar vídeos ao arrastar
    // =================================================================
    if (document.querySelector(".videoSwiper")) {
        var videoSwiper = new Swiper(".videoSwiper", {
            // Mobile First
            slidesPerView: 1.2, 
            spaceBetween: 20,   
            centeredSlides: true,
            loop: false, // Depoimentos não precisam de loop infinito
            
            observer: true,
            observeParents: true,

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2.2,
                    centeredSlides: false,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3, 
                    centeredSlides: false,
                    spaceBetween: 40,
                    allowTouchMove: true, 
                },
            },
            // Função crucial: Pausa o vídeo se o usuário arrastar o carrossel
            on: {
                slideChange: function () {
                    stopAllVideos();
                }
            }
        });
    }

    // =================================================================
    // MÓDULO 3: SWIPER DE FOTOS (NOVO - BROWS PORTFOLIO) 
    // Configurado para loop infinito e visualização imersiva
    // =================================================================
    if (document.querySelector(".photoSwiper")) {
        var photoSwiper = new Swiper(".photoSwiper", {
            // A Lógica do Mobile First (CSS 75vw)
            // 'auto' permite que o CSS defina a largura do card
            slidesPerView: "auto", 
            centeredSlides: true, 
            spaceBetween: 20,      
            loop: true,            // Loop Infinito para galeria de fotos
            grabCursor: true,      

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            // Adaptação para Telas Maiores
            breakpoints: {
                // Tablet
                768: {
                    slidesPerView: 3,
                    centeredSlides: false, // Alinha à esquerda em telas grandes
                    spaceBetween: 30,
                },
                // Desktop
                1024: {
                    slidesPerView: 4, // Mostra 4 fotos lado a lado
                    centeredSlides: false,
                    spaceBetween: 40,
                }
            }
        });
    }

    // =================================================================
    // MÓDULO 4: PLAYER DE VÍDEO INTELIGENTE (SMART PLAYER)
    // Gerencia o Play/Pause e garante que apenas um toque por vez
    // =================================================================
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    if (videoWrappers.length > 0) {
        videoWrappers.forEach(wrapper => {
            const video = wrapper.querySelector('.story-video');
            
            if (!video) return; // Segurança contra erros

            const togglePlay = (e) => {
                if (video.paused) {
                    // 1. Pausa qualquer outro vídeo tocando
                    stopAllVideos();
                    
                    // 2. Prepara o vídeo atual
                    video.muted = false; // Ativa o som
                    video.volume = 1.0;
                    
                    // 3. Tenta dar o Play (Promessa para evitar erro de navegador)
                    var playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            wrapper.classList.add('playing'); // Esconde capa e botão
                        }).catch(error => {
                            console.error("Autoplay bloqueado pelo navegador: ", error);
                        });
                    }
                } else {
                    // Se já está tocando, pausa
                    video.pause();
                    wrapper.classList.remove('playing');
                }
            };

            // Adiciona o evento de clique na capa
            wrapper.addEventListener('click', togglePlay);

            // Quando o vídeo acaba, volta para a capa
            video.addEventListener('ended', () => {
                wrapper.classList.remove('playing');
                video.currentTime = 0;
                video.muted = true; 
            });
        });
    }

    // Função Auxiliar Global: Para todos os vídeos da página
    function stopAllVideos() {
        document.querySelectorAll('video.story-video').forEach(vid => {
            vid.pause();
            // Remove a classe 'playing' do wrapper pai para mostrar o botão play novamente
            const wrapper = vid.closest('.video-wrapper');
            if (wrapper) {
                wrapper.classList.remove('playing');
            }
        });
    }

});