const bcrypt = require('bcryptjs');

async function verifyPassword(plainTextPassword, hashedPassword) {
  console.log('Comparing:', plainTextPassword, 'with:', hashedPassword);
  const isValid = await bcrypt.compare(plainTextPassword, hashedPassword);
  console.log('Password Verification Result:', isValid);
}

verifyPassword(
  'saddas',
  '$2a$12$IOZ95vE.dzomq6WNEy62nOOLVKqYVKE7qcartXvG6nRQRGF5sApXS'
);
