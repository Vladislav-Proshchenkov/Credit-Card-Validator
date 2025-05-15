export function detectCardType(cardNumber) {
  const cleaned = cardNumber.replace(/\D/g, '');
  
  if (!cleaned) return null;

  if (/^220[0-4]/.test(cleaned)) {
    return 'Mir';
  }
  
  if (/^4/.test(cleaned)) {
    return 'Visa';
  }
  
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
    return 'Mastercard';
  }
  
  if (/^3[47]/.test(cleaned)) {
    return 'American Express';
  }
  
  if (/^6011/.test(cleaned) || /^64[4-9]/.test(cleaned) || /^65/.test(cleaned)) {
    return 'Discover';
  }
  
  if (/^35[2-8][0-9]/.test(cleaned)) {
    return 'JCB';
  }
  
  return null;
}