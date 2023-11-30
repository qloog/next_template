import ButtonAccount from "@/components/ButtonAccount";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold">Thank You for Signing Up!</h1>
        <P>We&apos;re so excited to have you here. As of now, we are currently working on the Findrr App
          and we would love to hear your feedback. You can email us at Rajvirnahar6667@gmail.com.
          We will keep you updated on app updates, the final launch date and more features. 
          When the app is launched, you will be one of the few hundreds of people to get access to 
          these features. Stay tuned for more!

        </P>
      </section>
    </main>
  );
}
