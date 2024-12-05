import ManagementNavbar from '../../components/managementcomponents/ManagementNavbar';
export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <ManagementNavbar />
      <div>{children}</div>
    </div>
  );
}
