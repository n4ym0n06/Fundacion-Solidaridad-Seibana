// ============================================================================
// FORMULARIOS DE CONTACTO
// ============================================================================

export function initContactForms() {
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showFormError('Por favor, complete todos los campos obligatorios (*)');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormError('Por favor, ingrese un correo electrónico válido');
                return;
            }
            
            showFormSuccess('Mensaje enviado correctamente. Nos pondremos en contacto pronto.');
            contactForm.reset();
        });
    }
    
    // Newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showNewsletterError('Por favor, ingrese su correo electrónico');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNewsletterError('Por favor, ingrese un correo electrónico válido');
                return;
            }
            
            showNewsletterSuccess('¡Gracias por suscribirte! Recibirás nuestras actualizaciones.');
            emailInput.value = '';
        });
    }
}

function showFormError(message) {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const existingError = form.querySelector('.form-error');
    if (existingError) existingError.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background-color: #f8d7da;
        color: #721c24;
        padding: 12px 16px;
        border-radius: var(--border-radius);
        margin-bottom: 20px;
        border: 1px solid #f5c6cb;
        animation: fadeIn 0.3s ease;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        if (errorDiv.parentNode) errorDiv.remove();
    }, 5000);
}

function showFormSuccess(message) {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const existingSuccess = form.querySelector('.form-success');
    if (existingSuccess) existingSuccess.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.style.cssText = `
        background-color: #d4edda;
        color: #155724;
        padding: 12px 16px;
        border-radius: var(--border-radius);
        margin-bottom: 20px;
        border: 1px solid #c3e6cb;
        animation: fadeIn 0.3s ease;
    `;
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    form.insertBefore(successDiv, form.firstChild);
    
    setTimeout(() => {
        if (successDiv.parentNode) successDiv.remove();
    }, 5000);
}

function showNewsletterError(message) {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    const existingError = form.querySelector('.newsletter-error');
    if (existingError) existingError.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'newsletter-error';
    errorDiv.style.cssText = `
        background-color: #f8d7da;
        color: #721c24;
        padding: 8px 12px;
        border-radius: var(--border-radius-sm);
        margin-top: 10px;
        font-size: 14px;
        border: 1px solid #f5c6cb;
        animation: fadeIn 0.3s ease;
    `;
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    const inputContainer = form.querySelector('.newsletter-input');
    if (inputContainer) {
        inputContainer.parentNode.insertBefore(errorDiv, inputContainer.nextSibling);
    }
    
    setTimeout(() => {
        if (errorDiv.parentNode) errorDiv.remove();
    }, 5000);
}

function showNewsletterSuccess(message) {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    const existingSuccess = form.querySelector('.newsletter-success');
    if (existingSuccess) existingSuccess.remove();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'newsletter-success';
    successDiv.style.cssText = `
        background-color: #d4edda;
        color: #155724;
        padding: 8px 12px;
        border-radius: var(--border-radius-sm);
        margin-top: 10px;
        font-size: 14px;
        border: 1px solid #c3e6cb;
        animation: fadeIn 0.3s ease;
    `;
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    const inputContainer = form.querySelector('.newsletter-input');
    if (inputContainer) {
        inputContainer.parentNode.insertBefore(successDiv, inputContainer.nextSibling);
    }
    
    setTimeout(() => {
        if (successDiv.parentNode) successDiv.remove();
    }, 5000);
}