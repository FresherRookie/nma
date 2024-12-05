import { resend } from '@/lib/resend';
import VerificationEmail from '@/emails/ResetPasswordEmail';
import { ApiResponse } from '@/types/ApiResponse';
export async function sendVerificationEmail(
  email: string,
  username: string,
  token: string
): Promise<ApiResponse> {
  try {
    return { success: true, message: 'Verification email sent successfully' };
  } catch (emailError) {
    console.log('Error sending verification email', emailError);
    return { success: false, message: 'Failed to send verification email' };
  }
}
