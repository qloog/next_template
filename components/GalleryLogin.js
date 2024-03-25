"use client";

import { signIn } from "next-auth/react";
import config from "@/config";
                
const GalleryButton = () => {
  return (
    <button
      className="btn w-full max-w-xs space-y-3 text-white"
      onClick={() => signIn(undefined, { callbackUrl: config.auth.callbackUrl })}
    >
      View your design history
    </button>
  );
};

export default GalleryButton;
