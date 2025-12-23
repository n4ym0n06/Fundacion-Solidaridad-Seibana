// ============================================================================
// WIDGET DE DONACIONES
// ============================================================================

import { MIN_DONATION } from '../../data/projects.js';
import { openDonationModal, closeDonationModal } from './modal.js';

let currentDonationAmount = 500;

export function initDonationWidget() {
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.getElementById('customAmountInput');
    const donateCTA = document.getElementById('donateCTA');
    
    if (!amountOptions.length || !donateCTA) return;
    
    // Montos predefinidos
    amountOptions.forEach(option => {
        const amount = parseInt(option.getAttribute('data-amount'));
        
        option.addEventListener('click', function() {
            updateDonationAmount(amount);
            amountOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            
            if (customAmountInput) {
                customAmountInput.value = '';
            }
        });
        
        option.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                option.click();
            }
        });
    });
    
    // Input personalizado
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            const amount = parseInt(this.value) || 0;
            
            if (amount >= MIN_DONATION) {
                updateDonationAmount(amount);
                amountOptions.forEach(opt => opt.classList.remove('selected'));
            }
        });
        
        customAmountInput.addEventListener('blur', function() {
            const amount = parseInt(this.value) || 0;
            
            if (amount < MIN_DONATION && amount > 0) {
                this.value = MIN_DONATION;
                updateDonationAmount(MIN_DONATION);
                showInputError(`El monto mínimo es RD$${MIN_DONATION}`);
            } else if (amount < 0) {
                this.value = MIN_DONATION;
                updateDonationAmount(MIN_DONATION);
                showInputError('No se aceptan montos negativos');
            }
        });
    }
    
    // CTA de donación
    donateCTA.addEventListener('click', handleDonation);
    donateCTA.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            donateCTA.click();
        }
    });
    
    // Inicializar con primer monto
    if (amountOptions.length > 0) {
        amountOptions[0].classList.add('selected');
    }
}

function updateDonationAmount(amount) {
    currentDonationAmount = amount;
    
    // Actualizar display
    const donationAmountDisplay = document.getElementById('donationAmount');
    const summaryAmount = document.getElementById('summaryAmount');
    
    if (donationAmountDisplay) {
        donationAmountDisplay.textContent = `RD$${amount.toLocaleString()}`;
    }
    
    if (summaryAmount) {
        summaryAmount.textContent = `RD$${amount.toLocaleString()}`;
    }
}

function showInputError(message) {
    let errorElement = document.querySelector('.input-error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'input-error';
        errorElement.style.cssText = `
            color: var(--color-danger);
            font-size: var(--fs-sm);
            margin-top: 8px;
            padding: 8px 12px;
            background-color: #f8d7da;
            border-radius: var(--border-radius-sm);
            border: 1px solid #f5c6cb;
            animation: fadeIn 0.3s ease;
        `;
        
        const customAmount = document.querySelector('.custom-amount');
        if (customAmount) {
            customAmount.appendChild(errorElement);
        }
    }
    
    errorElement.textContent = message;
    
    setTimeout(() => {
        if (errorElement.parentNode) {
            errorElement.remove();
        }
    }, 3000);
}

function handleDonation() {
    if (currentDonationAmount < MIN_DONATION) {
        showInputError(`El monto mínimo es RD$${MIN_DONATION}`);
        return;
    }
    
    // Actualizar resumen
    const summaryAmount = document.getElementById('summaryAmount');
    if (summaryAmount) {
        summaryAmount.textContent = `RD$${currentDonationAmount.toLocaleString()}`;
    }
    
    openDonationModal();
}

export function getCurrentDonationAmount() {
    return currentDonationAmount;
}