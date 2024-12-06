import {
  Html,
  Head,
  Font,
  Tailwind,
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
      <Tailwind>
        <Section className="bg-gray-100 p-6 rounded-md shadow-md">
          <Row className="mb-6">
            <Heading as="h2" className="text-2xl font-bold text-gray-800">
              Hello,
            </Heading>
          </Row>
          <Row className="mb-4">
            <Text className="text-lg text-gray-700">
              Please use the provided link to reset your password
            </Text>
          </Row>
          <Row className="mb-6">
            <Link href={resetLink} className="text-blue-500 underline">
              Reset Password
            </Link>
          </Row>
          <Row>
            <Text className="text-sm text-gray-600">
              If you did not request this link, please ignore this email.
            </Text>
          </Row>
        </Section>
      </Tailwind>
    </Html>
  );
}
