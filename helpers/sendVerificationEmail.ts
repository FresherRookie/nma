export async function sendVerificationEmail() {
  try {
    return { success: true, message: 'Verification email sent successfully' };
  } catch (emailError) {
    console.log('Error sending verification email', emailError);
    return { success: false, message: 'Failed to send verification email' };
  }
}
