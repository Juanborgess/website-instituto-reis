/* =================================================================
   FUNCIONALIDADE: MENU MOBILE & INTERAÇÕES DA PÁGINA
   ================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    
    console.log("Sistema Instrutor: Iniciado.");

    // =================================================================
    // 1. LÓGICA DO MENU MOBILE (ABRIR/FECHAR)
    // =================================================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Verificação de segurança (só roda se o botão existir na tela)
    if (mobileBtn && navMenu) {
        
        // A. CLIQUE NO BOTÃO HAMBÚRGUER
        mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            mobileBtn.classList.toggle('active'); 
            navMenu.classList.toggle('active');   
        });

        // B. CLIQUE NOS LINKS (FECHAR MENU AO NAVEGAR)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active'); 
                navMenu.classList.remove('active');   
            });
        });

        // C. CLIQUE FORA DO MENU (FECHAR AO TOCAR NA TELA)
        document.addEventListener('click', (e) => {
            // Se o menu estiver aberto E o clique NÃO for no menu nem no botão
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileBtn.contains(e.target)) {
                
                mobileBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
        console.log("Menu Mobile: Ativado.");
    } else {
        console.warn("Aviso: Menu Mobile não encontrado no HTML.");
    }
});