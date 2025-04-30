// Navegación suave y efectos de scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efecto de header al hacer scroll
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Animación de elementos al entrar en el viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Efecto de aparición secuencial para las tarjetas de servicios
            if (entry.target.classList.contains('service-card')) {
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.2;
                entry.target.style.transitionDelay = `${delay}s`;
            }
        }
    });
}, observerOptions);

// Observar todos los elementos con animación
document.querySelectorAll('.service-card, .contact-info, .contact-form').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// Efecto de parallax para la sección hero
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.submit-btn');
        const originalText = submitButton.innerHTML;
        
        // Animación de carga
        submitButton.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
        
        try {
            // Recolectar datos del formulario
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // Enviar el correo usando el protocolo mailto
            const mailtoLink = `mailto:dapolodm@gmail.com?subject=Nuevo mensaje de ${encodeURIComponent(data.name)}&body=Nombre: ${encodeURIComponent(data.name)}%0AEmail: ${encodeURIComponent(data.email)}%0A%0AMensaje:%0A${encodeURIComponent(data.message)}`;
            
            // Abrir el cliente de correo
            window.location.href = mailtoLink;
            
            // Efecto de éxito
            submitButton.innerHTML = '<span>✓ Enviado!</span><i class="fas fa-check"></i>';
            submitButton.style.backgroundColor = 'var(--success-color)';
            
            // Resetear después de 3 segundos
            setTimeout(() => {
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
            
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            submitButton.innerHTML = '<span>Error al enviar</span><i class="fas fa-exclamation-circle"></i>';
            submitButton.style.backgroundColor = '#dc3545';
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// Efecto de hover en las tarjetas de servicios
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animación de texto en el hero
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.animationDelay = `${index * 0.1}s`;
        span.classList.add('char');
        heroText.appendChild(span);
    });
}

// Animación de las formas en el hero
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 2}s`;
}); 