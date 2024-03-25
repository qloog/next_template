"use client"

import { signIn } from "next-auth/react";
import config from "@/config";
                
const GalleryButton = () => {
  return (
    <button
      className="btn btn-primary"
      onClick={() => signIn(undefined, { callbackUrl: config.auth.sendtodashboardUrl})}
    >
      Login
    </button>
  );
};
                
export default GalleryButton;