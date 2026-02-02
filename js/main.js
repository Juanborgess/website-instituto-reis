/* =================================================================
   STATUS: OTIMIZADO & BLINDADO
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INICIALIZAÇÃO DE ANIMAÇÕES (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50,
            easing: 'ease-out-cubic',
        });
    }

    // 2. CONTROLE DO MENU MOBILE (FIXO E SEGURO)
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNavOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Função única de alternância
    const toggleMenu = () => {
        if (mobileBtn && mobileNav) {
            mobileBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Trava o scroll do corpo apenas se o menu estiver aberto
            const isActive = mobileNav.classList.contains('active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        }
    };

    // Evento no Botão Hambúrguer
    if (mobileBtn) {
        mobileBtn.addEventListener('click', (e) => {
            e.preventDefault(); 
            e.stopPropagation(); // Evita cliques fantasmas
            toggleMenu(); 
        });
    }

    // Evento nos Links (Fecha o menu ao clicar e ir para a seção)
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav && mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // 3. HEADER GLASS EFFECT (SCROLL INTELIGENTE)
    const header = document.querySelector('.glass-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
                header.style.background = "rgba(0, 26, 53, 0.98)"; // Fundo mais sólido ao rolar
            } else {
                header.style.boxShadow = "none";
                header.style.background = "rgba(0, 26, 53, 0.85)"; // Mais transparente no topo
            }
        });
    }

    // 4. CARROSSEL DE CURSOS
    if (document.querySelector('.royal-course-slider')) {
        new Swiper(".royal-course-slider", {
            slidesPerView: 1.2,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            observer: true,
            observeParents: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: {
                640: { slidesPerView: 2.2, spaceBetween: 25 },
                1024: { slidesPerView: 3.2, spaceBetween: 30 },
                1400: { slidesPerView: 4, spaceBetween: 35 }
            },
        });
    }

    // 5. CARROSSEL DE DEPOIMENTOS (REELS)
    const testimonialSlider = document.querySelector('.video-slider-vertical');

    if (testimonialSlider) {
        const videoSwiper = new Swiper(".video-slider-vertical", {
            speed: 800,
            slidesPerView: 1.2,
            spaceBetween: 20,
            centeredSlides: true,
            loop: true,
            grabCursor: true,
            observer: true, 
            observeParents: true,
            watchSlidesProgress: true,
            pagination: { el: ".swiper-pagination", clickable: true },
            
            breakpoints: {
                768: { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 3, spaceBetween: 30, centeredSlides: true },
                1440: { slidesPerView: 4, spaceBetween: 40, centeredSlides: true }
            },
            on: {
                init: function() {
                    setTimeout(() => { this.update(); }, 500);
                }
            }
        });

        // Lógica de Vídeo (Play/Pause)
        const videoContainers = testimonialSlider.querySelectorAll('.video-container');

        videoContainers.forEach(container => {
            const video = container.querySelector('video');
            const card = container.closest('.testimonial-card');

            if(video) {
                container.addEventListener('click', () => {
                    if (video.paused) {
                        // Pausa os outros
                        testimonialSlider.querySelectorAll('video').forEach(v => {
                            if(v !== video) {
                                v.pause();
                                v.parentElement.classList.remove('playing');
                            }
                        });
                        video.play();
                        container.classList.add('playing');
                    } else {
                        video.pause();
                        container.classList.remove('playing');
                    }
                });

                video.addEventListener('ended', () => {
                    container.classList.remove('playing');
                    video.currentTime = 0;
                });
            }
        });
    }

    // Disparo final para garantir layouts
    window.dispatchEvent(new Event('resize')); 
});