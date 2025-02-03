import Alert from "@/components/alert";
import CredentialsSignin from "@/components/credentials-signin";
import Image from "next/image";
import OAuthSignIn from "@/components/oauth-signin";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const { error } = await searchParams;

  return (
    <section className="flex items-center justify-center h-screen px-4">
      <video
        className="absolute object-cover w-full h-full"
        src="https://res.cloudinary.com/dcuyktl8e/video/upload/v1738210158/retropulse/login-bg-video_t0ln3u.mp4"
        autoPlay
        loop
        muted
        disablePictureInPicture
      />
      <div className="relative flex flex-col flex-1 max-w-lg gap-4 px-4 mx-auto border rounded-lg shadow-xl py-7 border-accent bg-main">
        <div className="absolute size-20 -top-12 sm:size-24 right-5 sm:-top-14">
          <Image
            src="/logo.png"
            alt="brand logo"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h1 className="text-3xl text-center font-display sm:text-4xl">
          <span className="text-[#FFBA08]">Retro</span>Pulse
        </h1>
        {error === "OAuthAccountNotLinked" && (
          <Alert message=" Another account already exists with the same e-mail address." />
        )}
        <CredentialsSignin />
        <div className="flex items-center px-24">
          <span className="flex-1 h-px bg-gray-400" />
          <span className="px-2 text-gray-400">or</span>
          <span className="flex-1 h-px bg-gray-400" />
        </div>
        <OAuthSignIn className="bg-slate-700" provider="github" iconPath="/icons/github.svg" />
        <OAuthSignIn
          className="bg-slate-200 text-black"
          provider="google"
          iconPath="/icons/google.svg"
        />
      </div>
    </section>
  );
}
