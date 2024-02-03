import Image from "next/image";
import config from "@/config";

// Use this object to add an icon to the testimonial (optional) like the Product Hunt logo for instance. Only change the values if you add more referrings sites (currently Twitter & Product Hunt)
const refTypes = {
  productHunt: {
    id: "product_hunt",
    ariaLabel: "See user review on Product Hunt",
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 26.245 26.256"
        className="w-[18px] h-[18px]"
      >
        <path
          d="M26.254 13.128c0 7.253-5.875 13.128-13.128 13.128S-.003 20.382-.003 13.128 5.872 0 13.125 0s13.128 5.875 13.128 13.128"
          fill="#da552f"
        />
        <path
          d="M14.876 13.128h-3.72V9.2h3.72c1.083 0 1.97.886 1.97 1.97s-.886 1.97-1.97 1.97m0-6.564H8.53v13.128h2.626v-3.938h3.72c2.538 0 4.595-2.057 4.595-4.595s-2.057-4.595-4.595-4.595"
          fill="#fff"
        />
      </svg>
    ),
  },
  twitter: {
    id: "twitter",
    ariaLabel: "See user post on Twitter",
    svg: (
      <svg
        className="w-5 h-5 fill-[#00aCee]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
      </svg>
    ),
  },
  other: { id: "other" },
};

// The list of your testimonials. It needs 11 items to fill the grid. The last one (11th) is featured on large devices (span 2 columns + big font)
const list = [
  {
    // Optional, use for social media like Twitter. Does not link anywhere but cool to display
    username: "marclou",
    // REQUIRED
    name: "Marc Lou",
    // REQUIRED
    text: "'Tattooswithai is just fantastic! I generated designs for myself, my wife, and some clients. As a artist, who is a tattoo-obsessed being, I love this!'",
    // REQUIRED — use refTypes.other if you don't want to display an icon
    type: refTypes.twitter,
    // Optional, link to the person's testimonial. It's more trustable
    // Optional, a statically imported image (usually from your public folder—recommended) or a link to the person's avatar. Shows a fallback letter if not provided
    img: "https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg",
  },
  {
    username: "the_mcnaveen",
    name: "Naveen",
    text: "'Cool AI tool for tattoo generation! I could create a lot of truly amazing tattoos anytime I want, anywhere in the world off my phone. All my client's loved the tattoos!'",
    type: refTypes.twitter,
    img: "/media/t1.jpeg",
  },
  {
    username: "Irynak",
    name: "Iryna K.",
    text: "'Good input = good output. Very fun! Took me some effort at first to accurately describe which tattoo I wanted, but when I got back my design, it was amazing. TATTOOSWITHAI was very responsive to my questions'",
    type: refTypes.productHunt,
    img: "/media/t2.jpeg",
  },
  {
    name: "Seline",
    text: "A major shoutout to TattooswithAI for straight up saving my life 🙏❤️",
    type: refTypes.other,
    img: "/media/t3.jpeg",
  },
  {
    username: "Jordand1",
    name: "Jordan D",
    text: "I started with Tattoos-who & Tattoos-what. But now, I can't bring my wild tattoo ideas into reality without TattooswithAI. I love the AI and am amazed to see how far TattooswithAI has come. Kudos to TattooswithAI.",
    type: refTypes.productHunt,
    img: "/media/t4.jpeg",
  },
  {
    username: "imgyf",
    name: "Yifan Goh",
    text: "I thought AI tattoos were useless. Then I found TattooswithAI. It turned out to be much more advanced that I ever could have imagined. TattooswithAI = ChatGPT x 10",
    type: refTypes.twitter,
    img: "/media/t5.jpeg",
  },
  {
    name: "Yazmine",
    text: "Wow, I got the Premium plan, it's fantastic. Saved me from spending hundreds of dollars on a design that I may have been regretting after",
    type: refTypes.other,
    img: "/media/t6.jpeg",
  },
  {
    username: "welcometobriami",
    name: "Brian Kang",
    text: "The tool is exactly what I didn't even know I needed. ",
    type: refTypes.twitter,
    img: "/media/t7.jpeg",
  },
  {
    username: "zawwadx",
    name: "Zawwad Ul Sami",
    text: "It's an amazing tool, with probably the best tattoo designs. It's got everything I need!",
    type: refTypes.twitter,
    img: "/media/t8.jpeg",
  },
  {
    username: "dan",
    name: "Dan Mindru",
    text: "Probably one of the most powerful things you can generate that I've seen",
    type: refTypes.productHunt,
    img: "/media/t9.jpeg",
  },
  // The last testimonial is featured on big devices (span 2 columns + big font) 👇
  {
    username: "JazPivots",
    name: "Jaz Abeledo",
    text: "I thought AI Tattoos were horrible. But when I found TattooswithAI - it blew my mind. It's 10x more advanced than I thought and the AI is actually accurate and gives such good tattoo designs.",
    type: refTypes.twitter,
    img: "/media/t11.jpeg",
  },
];

// A single testimonial, to be rendered in  a list
const Testimonial = ({ i }) => {
  const testimonial = list[i];

  if (!testimonial) return null;

  return (
    <li key={i}>
      <figure className="relative h-full p-6 bg-white text-black rounded-lg">
        <blockquote className="relative">
          <p className="text-sm text-base-content/80">{testimonial.text}</p>
        </blockquote>
        <figcaption className="relative flex items-center justify-start gap-4 pt-4 mt-4 border-t border-base-content/5">
          <div className="overflow-hidden rounded-full bg-base-300 shrink-0">
            {testimonial.img ? (
              <Image
                className="w-10 h-10 rounded-full object-cover"
                src={list[i].img}
                alt={`${list[i].name}'s testimonial for ${config.appName}`}
                width={48}
                height={48}
              />
            ) : (
              <span className="w-10 h-10 rounded-full flex justify-center items-center text-lg font-medium bg-base-300">
                {testimonial.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="w-full flex items-end justify-between gap-2">
            <div>
              <div className="text-sm font-medium text-black">
                {testimonial.name}
              </div>
              {testimonial.username && (
                <div className="mt-0.5 text-sm text-black">
                  @{testimonial.username}
                </div>
              )}
            </div>

            {testimonial.link && testimonial.type?.svg && (
              <a
                href={testimonial.link}
                target="_blank"
                className="shrink-0 "
                aria-label={testimonial.type?.ariaLabel}
              >
                {testimonial.type?.svg}
              </a>
            )}
          </div>
        </figcaption>
      </figure>
    </li>
  );
};

const Testimonials11 = () => {
  return (
    <section
      className="bg-white text-black"
      id="testimonials"
      style={{
        fontFamily: "'EB Garamond', serif", // Use the Inter font
      }}
    >
      <div className="px-8">
        <p
          className="font-medium text-sm mb-2 text-center"
          style={{ color: "rgb(23, 34, 190)" }}
        >
          CUSTOMER LOVE
        </p>
      </div>
      <div className="py-24 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <div className="mb-8">
            <h2 className="sm:text-5xl text-4xl text-black">
              Join 2 thousand empowered tattoo lovers
            </h2>
          </div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-black">
            TattooswithAI has helped create over 10,000 tattoos. From different
            style choices, never-seen before designs, to being the only one to
            own your dream tattoo
          </p>
        </div>

        <ul
          role="list"
          className="grid max-w-2xl grid-cols-1 gap-6 mx-auto sm:gap-8 md:grid-cols-2 lg:max-w-none lg:grid-cols-4"
        >
          <li>
            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
              {[...Array(3)].map((e, i) => (
                <Testimonial key={i} i={i} />
              ))}
            </ul>
          </li>

          <li className="hidden md:grid order-none md:order-first lg:order-none col-span-2 grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* BIG FEATURED TESTIMONIAL — THE LAST ONE IN THE LIST (11th) */}
            <ul className="col-span-2">
              <li>
                <figure className="relative h-full p-6 bg-white text-black rounded-lg">
                  <blockquote className="relative p-4">
                    <p className="text-lg font-medium text-base-content">
                      {list[list.length - 1].text}
                    </p>
                  </blockquote>
                  <figcaption className="relative flex items-center justify-start gap-4 pt-4 mt-4 border-t border-base-content/5">
                    <div className="overflow-hidden rounded-full bg-base-300 shrink-0">
                      {list[list.length - 1].img ? (
                        <Image
                          className="w-12 h-12 rounded-full object-cover"
                          src={list[list.length - 1].img}
                          alt={`${
                            list[list.length - 1].name
                          }'s testimonial for MakeLanding`}
                          width={48}
                          height={48}
                        />
                      ) : (
                        <span className="w-12 h-12 rounded-full flex justify-center items-center text-xl font-medium bg-base-300">
                          {list[list.length - 1].name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="text-base font-medium text-base-content">
                        {list[list.length - 1].name}
                      </div>
                      {list[list.length - 1].username && (
                        <div className="mt-1 text-base text-base-content/80">
                          @{list[list.length - 1].username}
                        </div>
                      )}
                    </div>
                  </figcaption>
                </figure>
              </li>
            </ul>
            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
              {[...Array(2)].map((e, i) => (
                <Testimonial key={i} i={i + 3} />
              ))}
            </ul>
            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
              {[...Array(2)].map((e, i) => (
                <Testimonial key={i} i={i + 5} />
              ))}
            </ul>
          </li>
          <li>
            <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
              {[...Array(3)].map((e, i) => (
                <Testimonial key={i} i={i + 7} />
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Testimonials11;
