// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
const formMessage = document.getElementById('form-message');

newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    
    // Validação simples
    if (nome.length < 3) {
        showMessage('Por favor, insira um nome válido', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Por favor, insira um e-mail válido', 'error');
        return;
    }
    
    // Simulação de envio (aqui você poderia enviar para um backend)
    showMessage(`Obrigado pelo interesse, ${nome}! Em breve enviaremos novidades sobre Nutrição Hospitalar para ${email}`, 'success');
    
    // Limpar formulário
    newsletterForm.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = type;
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = '';
    }, 5000);
}

// Animação de entrada dos elementos quando visíveis
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação para cards e steps
document.querySelectorAll('.card, .step, .faculdade-card, .sobre-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Dados dinâmicos das notas de corte (exemplo de como poderia ser atualizado via API)
async function atualizarNotasCorte() {
    // Simulação de chamada API
    const notasAtualizadas = {
        usp: { ampla: 745, cotas: 668 },
        unicamp: { ampla: 732, cotas: 655 },
        ufmg: { ampla: 725, cotas: 648 }
    };
    
    // Aqui você poderia atualizar a tabela com dados reais de uma API
    console.log('Notas atualizadas:', notasAtualizadas);
}

// Chamar função de atualização (simulada)
atualizarNotasCorte();

// Tooltip para informações adicionais
const valoresSalario = document.querySelectorAll('.valor');
valoresSalario.forEach(valor => {
    valor.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = '*Valores podem variar conforme região e experiência';
        tooltip.style.cssText = `
            position: absolute;
            background: var(--text-dark);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 0.8rem;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            z-index: 10;
        `;
        
        const parent = e.target.parentElement;
        parent.style.position = 'relative';
        parent.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    });
});

// Contador de visitas (simples, usando localStorage)
if (localStorage.getItem('visitas')) {
    let visitas = parseInt(localStorage.getItem('visitas')) + 1;
    localStorage.setItem('visitas', visitas);
    console.log(`Número de visitas: ${visitas}`);
} else {
    localStorage.setItem('visitas', '1');
    console.log('Bem-vindo à sua primeira visita!');
}

// Botão de voltar ao topo
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Voltar ao topo');
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 99;
        transition: all 0.3s;
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = 'var(--primary-dark)';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'var(--primary-color)';
        button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
};

// Inicializar botão de voltar ao topo
createBackToTopButton();

// Prevenir que imagens quebrem
document.querySelectorAll('img').forEach(img => {