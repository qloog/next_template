

import Link from 'next/link';
import ButtonAccount from "@/components/ButtonAccount";
import ButtonCheckout from "@/components/ButtonCheckout";
import config from "@/config";
import ButtonPopover from "@/components/ButtonPopover";
import connectMongo from "@/libs/mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  await connectMongo()

  const session = await getServerSession(authOptions)
  const user = await User.findById(session.user.id)
  
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />

        <p>{User.currentCredits}</p>

        

        <ButtonPopover></ButtonPopover>
        
        
      </section>
    </main>
  );
}

//<ButtonCheckout
//mode="payment"
//priceId={config.stripe.plans[0].priceId}
///>

//<button className="btn btn-gradient animate-shimmer w-full max-w-xs space-y-3">
//Start Designing
//</button>