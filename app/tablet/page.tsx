export default function Page() {
  return (
    <div>
      <h1>{process.env.NEXT_PUBLIC_SITE_NAME || '环境变量未生效'}</h1>
      <p className="text-blue-400 font-extrabold">Tablet Page</p>
    </div>
  )
}
