import CredentialsSignup from "@/components/credentials-signup";
import GithubSignin from "@/components/github-signin";
import GoogleSignin from "@/components/google-signin";
import Image from "next/image";

export default async function RegisterPage() {
  return (
    <section className="flex items-center justify-center h-screen px-4">
      <video
        className="absolute w-full h-full object-cover"
        src="https://res.cloudinary.com/dcuyktl8e/video/upload/v1738210158/retropulse/login-bg-video_t0ln3u.mp4"
        autoPlay
        loop
        muted
        disablePictureInPicture
      />
      <div className="relative flex flex-col flex-1 max-w-lg px-4 py-7 gap-4 mx-auto border rounded-lg shadow-xl border-accent bg-main">
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
        <CredentialsSignup />
        <div className="flex items-center px-24">
          <span className="h-px flex-1 bg-gray-400" />
          <span className="px-2 text-gray-400">or</span>
          <span className="h-px flex-1 bg-gray-400" />
        </div>
        <GithubSignin />
        <GoogleSignin />
      </div>
    </section>
  );
}
