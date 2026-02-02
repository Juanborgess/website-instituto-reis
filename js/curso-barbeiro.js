/* =================================================================
   ARQUIVO: js/curso-barbeiro.js
   ================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    // =================================================================
    // 1. INICIALIZAÇÃO DO SWIPER (CARROSSEL)
    // =================================================================
    if (document.querySelector(".youtubeSwiper")) {
        var youtubeSwiper = new Swiper(".youtubeSwiper", {
            // Configurações Mobile First (CSS 80vw)
            slidesPerView: "auto", 
            centeredSlides: true, 
            spaceBetween: 20,      
            loop: false, // Vídeos não precisam de loop infinito           
            grabCursor: true,

            // --- CORREÇÃO DE FLUIDEZ (RESISTANCE) ---
            // Essas configurações impedem que o carrossel pareça "preso"
            centeredSlidesBounds: true, 
            watchSlidesProgress: true,  
            resistance: true,           
            resistanceRatio: 0.85,      

            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            // Adaptação para Telas Maiores
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
                }
            }
        });
    }

    // =================================================================
    // 2. LÓGICA DO "CLICK TO UNLOCK" (O SEGREDO DO OVERLAY)
    // Gerencia o escudo transparente para permitir o swipe suave
    // =================================================================
    const videoCards = document.querySelectorAll('.video-card-neon');

    if (videoCards.length > 0) {
        videoCards.forEach(card => {
            const overlay = card.querySelector('.video-overlay-layer');
            
            // Segurança: Só adiciona evento se o overlay existir no HTML
            if (overlay) {
                overlay.addEventListener('click', function(e) {
                    e.stopPropagation(); // Evita conflitos de clique

                    // A. Fecha todos os outros vídeos (UX: Foco em um por vez)
                    // Isso garante que se o usuário clicar no segundo vídeo, o primeiro volta a ter o escudo
                    videoCards.forEach(c => c.classList.remove('active-video'));
                    
                    // B. Libera o vídeo atual
                    // Adiciona a classe que o CSS usa para dar "display: none" no escudo
                    card.classList.add('active-video');
                    
                    // O usuário agora tem acesso direto ao Iframe do YouTube
                });
            }
        });
    }

});