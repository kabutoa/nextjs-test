export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <p>Tablet Layout</p>
      <div>{children}</div>
    </div>
  )
}