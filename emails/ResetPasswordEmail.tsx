import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Link,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  resetLink: string;
}
export default function ResetPasswordEmail({
  resetLink,
}: ResetPasswordEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Reset Password Link</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your reset Password Link</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello,</Heading>
        </Row>
        <Row>
          <Text>
            You requested to reset your password. Click the link below to reset
            it:
          </Text>
          <Link href={resetLink}>Reset</Link>
        </Row>

        <Row>
          <Text>
            If you did not request this link, please ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
