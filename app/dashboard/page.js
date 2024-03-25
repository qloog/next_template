
import connectMongo from "@/libs/mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  await connectMongo();

  const session = await getServerSession(authOptions);
  const user = await User.findById(session.user.id);

  return (
    <main className="bg-white text-black min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8" id="about">
        <h1
          className="text-black text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
          }}
        >
          Our mission is to usher in a new era of human creativity through artificial intelligence.
        </h1>
      </section>
      <section>
        <h2
          className="text-black text-4xl lg:text-6xl tracking-tight md:-mb-4 text-align:left"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
          }}
        >
          Our Values
        </h2>
      </section>
    </main>
  );
}
