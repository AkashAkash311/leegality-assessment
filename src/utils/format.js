const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatPrice(value) {
  return currency.format(value);
}

// "home-decoration" -> "Home Decoration"
export function formatCategory(slug = '') {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
