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

interface VerficationEmailProps {
  verificationLink: string;
}
export default function VerificationEmail({
  verificationLink,
}: VerficationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Email Verification Link</title>
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
      <Preview>Here&apos;s your reset email verification Link</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello,</Heading>
        </Row>
        <Row>
          <Text>
            Please use the following verification link to complete your
            verification:
          </Text>
          <Link href={verificationLink}>Verify</Link>
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
