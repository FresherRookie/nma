const bcrypt = require('bcryptjs');

async function testPassword() {
  const plainTextPassword = 'saddas';
  const saltRounds = 12;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
  console.log('Test Hashed Password:', hashedPassword);

  const isValid = await bcrypt.compare(plainTextPassword, hashedPassword);
  console.log('Test Password Verification Result:', isValid);
}

testPassword();
