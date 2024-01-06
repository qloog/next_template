import { useRouter } from 'next/router';
import ButtonAccount from "@/components/ButtonAccount";
import ButtonCheckout from "@/components/ButtonCheckout";
import { useRouter } from 'next/router';

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const router = useRouter();

  const goToHomePage = () => {
    router.push('/');
  };
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />

        <h1 className="text-3xl md:text-4xl font-extrabold">
          You have 3/3 credits left on your free trial
        </h1>

        <button 
          onClick={goToHomePage} 
          className="btn btn-primary">
          Start Designing
        </button>
        
        
      </section>
    </main>
  );
}
//<ButtonCheckout
      //    mode="subscription"
        //  priceId={config.stripe.plans[0].priceId}
      //  />