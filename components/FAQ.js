"use client";

import { useRef, useState } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
  {
    question: "What is Findrr?",
    answer: <div className="space-y-2 leading-relaxed">Your Easy Ink Adventure. Just upload a picture, and discover custom tattoos like never before. Simple, unique, and all yours with Findrr - redefining your ink journey effortlessly.</div>,
  },
  {
    question: "Can I get a refund?",
    answer: (
      <p>
        If for a certain reason Findrr isn&apos;t for you, request a refund within 7 days of your purchase. Reach out
        by email at Rajvirnahar6667@gmail.com.
      </p>
    ),
  },
  {
    question: "How does Findrr work for someone getting their first tattoo?",
    answer: (
      <div className="space-y-2 leading-relaxed">Findrr allows you to easily upload images to discover unique tattoo designs the market has never seen. It&apos;s a simple way to explore and find the perfect ink for your first tattoo</div>
    ),
  },
  {
    question: "How can Findrr benefit tattoo artists in working with clients?",
    answer: (
      <div className="space-y-2 leading-relaxed">Findrr offers a diverse range of unique designs that artists can use as inspiration or customize for their clients. It&apos;s a valuable resource for expanding creative possibilities.</div>
    ),
  },
  {
    question: "Is Findrr only for specific tattoo styles?",
    answer: (
      <div className="space-y-2 leading-relaxed">No, Findrr covers a wide range of tattoo styles. Whether you&apos;re into traditional, modern, or unique designs, you can find anything that suits your taste.</div>
    ),
  },
  {
    question: "How can I be sure the designs I find on Findrr are unique?",
    answer: (
      <div className="space-y-2 leading-relaxed">Findrr focuses on delivering fresh and unique designs. The platform aims to provide a variety of options, ensuring a distinct and personalized experience that cannot be found on google, pinterest, or anywhere on the net.</div>
    ),
  },
  {
    question: "Can I use Findrr to find designs that complement my existing tattoos?",
    answer: (
      <div className="space-y-2 leading-relaxed">Absolutely! Findrr is designed to help you discover tattoos that match your style, whether you&apos;re getting your first or adding to existing ink.</div>
    ),
  },
  
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-white" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
