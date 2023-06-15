import PublicLayout from "@/components/layouts/PublicLayout";
import Head from "next/head";

export default function Home() {


  return (
    <PublicLayout>
      <Head>
        <title>Nextjs fullstack</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="min-h-scree">
          <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
