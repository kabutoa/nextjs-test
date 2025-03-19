export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>Mobile Layout</p>
      <div>{children}</div>
    </div>
  )
}