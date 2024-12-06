import { render } from '@react-email/render';
import ResetPasswordEmail from '../emails/ResetPasswordEmail'; // Ensure the correct import path
import transporter from '@/lib/mailer';

interface SendResetPasswordEmailProps {
  to: string;
  resetLink: string;
}

const sendPasswordResetEmail = async ({
  to,
  resetLink,
}: SendResetPasswordEmailProps) => {
  // Correct usage with type assertion
  const emailHtml = await render(<ResetPasswordEmail resetLink={resetLink} />);

  try {
    await transporter.sendMail({
      from: '"North Music Academy" <management@northmusicacademy.in>',
      to,
      subject: 'Reset your password',
      html: emailHtml,
    });
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export default sendPasswordResetEmail;
