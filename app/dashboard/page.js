import Link from 'next/link';
import ButtonAccount from "@/components/ButtonAccount";
import ButtonCheckout from "@/components/ButtonCheckout";
import config from "@/config";
import ButtonPopover from "@/components/ButtonPopover";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
 
  
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />

        

        <Link href="/#tattoo-generator" passHref>
        </Link>

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