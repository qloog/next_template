
import ButtonAccount from "@/components/ButtonAccount";
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
    <main className="bg-white text-black min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8" id="about">
      <h1
      className="text-black text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left"
      style={{
        fontFamily: "'EB Garamond', serif",
      }}
    >
         Our mission is to usher in a new era of human creativity through artificial intelligence.
        </h1>
      </section>
      <section>
        <h2  className="text-black text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left">
        style={{
        fontFamily: "'EB Garamond', serif",
      }}
      Our Values
        </h2>
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