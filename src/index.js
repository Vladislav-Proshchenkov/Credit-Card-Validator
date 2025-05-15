import './styles/main.css';
import { validateCardNumber } from './utils/cardValidator';
import { detectCardType } from './utils/cardTypeDetector';

document.addEventListener('DOMContentLoaded', () => {
  const cardForm = document.getElementById('cardForm');
  const cardNumberInput = document.getElementById('cardNumber');
  const resultDiv = document.getElementById('result');
  const cardLogos = document.querySelectorAll('.card-logo');

  cardNumberInput.addEventListener('input', (e) => {
    const value = e.target.value.replace(/\s+/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    
    e.target.value = formattedValue;
  });

  cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const cardNumber = cardNumberInput.value.replace(/\s+/g, '');
    const cardType = detectCardType(cardNumber);
    const isValid = validateCardNumber(cardNumber);
    
    cardLogos.forEach(logo => logo.classList.remove('active'));
    
    if (cardType) {
      const cardLogo = document.getElementById(cardType.toLowerCase());
      if (cardLogo) cardLogo.classList.add('active');
    }
    
    if (cardNumber.length === 0) {
      resultDiv.textContent = 'Please enter a card number';
      resultDiv.className = '';
    } else if (isValid) {
      resultDiv.textContent = `Valid ${cardType} card`;
      resultDiv.className = 'valid';
    } else {
      resultDiv.textContent = 'Invalid card number';
      resultDiv.className = 'invalid';
    }
  });
});