import Link from 'next/link';
import ButtonAccount from "@/components/ButtonAccount";
import ButtonCheckout from "@/components/ButtonCheckout";


export const dynamic = "force-dynamic";

export default async function Dashboard() {
 
  
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />

        <h1 className="text-3xl md:text-4xl font-extrabold">
          You have 3/3 credits left on your free trial
        </h1>

        <Link href="/" passHref>
          <button className="btn btn-primary">
            Start Designing
          </button>
        </Link>
        
        
      </section>
    </main>
  );
}

//<ButtonCheckout
      //    mode="subscription"
        //  priceId={config.stripe.plans[0].priceId}
      //  />