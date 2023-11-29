import Image from "next/image";

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTg1NDEwNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
        alt="Background"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
          Empower Your Networking, Connect, Succeed
          </h2>
          <p className="text-lg opacity-80 mb-12 md:mb-16">
          Don&apos;t spend hours on networking challenges. With Findrr, streamline your path to building connections and achieving success.
          </p>

          <button className="btn btn-primary btn-wide">Join Findrr</button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
