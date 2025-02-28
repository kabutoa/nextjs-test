export default function Home() {

  return (
    <div>
      <h1>{process.env.NEXT_PUBLIC_SITE_NAME || '环境变量未生效'}</h1>
      <p className="text-red-400 font-extrabold">Hello World</p>
    </div>
  );
}
