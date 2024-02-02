"use client"

import { signIn } from "next-auth/react";
import config from "@/config";
                
const SigninButton = () => {
  return (
    <button
    className="btn w-full max-w-xs space-y-3 text-white"
    style={{
    fontFamily: "'Inter', sans-serif", // Use the Inter font
    fontWeight: 600, 
      backgroundColor: 'rgb(50, 61, 214)'
    }}
      onClick={() => signIn(undefined, { callbackUrl: config.auth.callbackUrl })}
    >
     Sign up for 2 free credits
    </button>
    
  );
};

                
export default SigninButton;