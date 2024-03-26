"use client";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Corrected from "next/navigation" to "next/router"
import config from "@/config";

const GallerySignIn = ({ text = "View Design History", extraStyle = "btn w-full max-w-xs space-y-3 text-white" }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClick = () => {
    if (status === "authenticated") {
      router.push(config.auth.sendtodashboardUrl);
    } else {
      signIn(undefined, { callbackUrl: config.auth.sendtodashboardUrl });
    }
  };

  if (status === "authenticated") {
    return (
      <Link
        href={config.auth.sendtodashboardUrl}
        className={`btn ${extraStyle}`}
        style={{
          fontFamily: "'Poppins', sans-serif", // Use the Poppins font
          fontWeight: 600, 
          backgroundColor: 'rgb(50, 61, 214)'
        }}
      >
        {session.user?.image ? (
          <img
            src={session.user?.image}
            alt={session.user?.name || "Account"}
            className="w-6 h-6 rounded-full shrink-0"
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
        ) : (
          <span className="w-6 h-6 bg-base-300 flex justify-center items-center rounded-full shrink-0">
            {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
          </span>
        )}
        {text}
      </Link>
    );
  }

  return (
    <button
      className={`btn ${extraStyle}`}
      style={{
        fontFamily: "'Poppins', sans-serif", // Use the Poppins font
        fontWeight: 600, 
        backgroundColor: 'rgb(50, 61, 214)'
      }}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default GallerySignIn;
