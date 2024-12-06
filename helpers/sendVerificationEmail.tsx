import { render } from '@react-email/render';
import VerificationEmail from '../emails/VerificationEmail'; // Ensure the correct import path
import transporter from '@/lib/mailer';

interface SendVerificationEmailProps {
  to: string;
  verificationUrl: string;
}

const sendVerificationEmail = async ({
  to,
  verificationUrl,
}: SendVerificationEmailProps) => {
  // Correct usage with type assertion
  const emailHtml = await render(
    <VerificationEmail verificationUrl={verificationUrl} />
  );

  try {
    await transporter.sendMail({
      from: '"North Music Academy" <management@northmusicacademy.in>',
      to,
      subject: 'Verify Your Email',
      html: emailHtml,
    });
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export default sendVerificationEmail;
