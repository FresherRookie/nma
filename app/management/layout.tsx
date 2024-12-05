import Link from 'next/link';
import ManagementNavbar from '../../components/managementcomponents/ManagementNavbar';
export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ManagementNavbar />
      <div>{children}</div>

      <div className="flex"></div>
    </>
  );
}
