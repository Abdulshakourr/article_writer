export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col items-center justify-center  bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {children}
    </div>
  );
}
