"use client"

import { signIn } from "next-auth/react";
import config from "@/config";
                
const SigninButton = () => {
  return (
    <button
    className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3"
      onClick={() => signIn(undefined, { callbackUrl: config.auth.callbackUrl })}
    >
      Start using Findrr now
    </button>
  );
};
                
export default SigninButton;