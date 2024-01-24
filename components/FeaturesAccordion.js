"use client";

import { useState, useRef } from "react";
import Image from "next/image";

// The features array is a list of features that will be displayed in the accordion.
// - title: The title of the feature
// - description: The description of the feature (when clicked)
// - type: The type of media (video or image)
// - path: The path to the media (for better SEO, try to use a local path)
// - format: The format of the media (if type is 'video')
// - alt: The alt text of the image (if type is 'image')
const features = [
  {
    title: "AI Design Assist",
    description:
      "Just like autocomplete, our AI assists you in designing tattoos. Start with a basic idea and watch as AI expands it into a full-fledged design, overcoming any creative block",
     type: "video",
      path: "/media/demovideo.mp4",
      format: "video/mp4",
  },
  {
    title: "Custom Tattoo Styles",
    description:
      "From traditional to abstract, select from a range of tattoo styles. Our AI adapts to your preference, ensuring each design aligns with the chosen style",
  },
  {
    title: "Interactive Design Sessions",
    description:
      "Chat with our AI to tweak and refine your tattoo designs in real time. It's like having a conversation with a virtual tattoo artist",
  },
  {
    title: "Prompt-Driven Custom Designs",
    description:
      "Jumpstart your tattoo journey by entering a prompt or idea. Our AI takes your concept and generates a unique design, providing a creative foundation for you to refine and personalize",
  },
];

// An SEO-friendly accordion component including the title and a description (when clicked.)
const Item = ({ index, feature, isOpen, setFeatureSelected }) => {
  const accordion = useRef(null);
  const { title, description } = feature;

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-medium text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setFeatureSelected();
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-black ${isOpen ? "text-primary" : ""}`}
        >
          <span className={`mr-2`}>{index + 1}.</span>
          <h3 className="inline">{title}</h3>
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current ${
            isOpen ? "fill-primary" : ""
          }`}
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
        className={`transition-all duration-300 ease-in-out text-base-content-secondary overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{description}</div>
      </div>
    </li>
  );
};

// A component to display the media (video or image) of the feature. If the type is not specified, it will display an empty div.
// Video are set to autoplay for best UX.
const Media = ({ feature }) => {
  const { type, path, format, alt } = feature;
  const style =
    "rounded-lg aspect-square w-full sm:w-[26rem] border border-base-content/10";
  const size = {
    width: 500,
    height: 500,
  };

  if (type === "video") {
    return (
      <video
        className={style}
        autoPlay
        muted
        loop
        playsInline
        controls
        width={size.width}
        height={size.height}
      >
        <source src={path} type={format} />
      </video>
    );
  } else if (type === "image") {
    return (
      <Image
        src={path}
        alt={alt}
        className={`${style} object-cover object-center`}
        width={size.width}
        height={size.height}
      />
    );
  } else {
    return <div className={`${style} !border-none`}></div>;
  }
};

// A component to display 2 to 5 features in an accordion.
// By default, the first feature is selected. When a feature is clicked, the others are closed.
const FeaturesAccordion = () => {
  const [featureSelected, setFeatureSelected] = useState(0);

  return (
    <section
      className="py-24 md:py-32 space-y-24 md:space-y-32 max-w-7xl mx-auto bg-white text-black"
      id="features"
    >
      <div className="px-8">
        <p className="font-medium text-sm text-accent mb-2">
        POWERFUL FEATURES
        </p>
        <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24"
        style={{
          fontFamily: 'Times New Roman, serif'
        }}>
         Think, design, and get it inked
        </h2>
        <div className=" flex flex-col md:flex-row gap-12 md:gap-24">
          <div className="grid grid-cols-1 items-stretch gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
            <ul className="w-full">
              {features.map((feature, i) => (
                <Item
                  key={feature.title}
                  index={i}
                  feature={feature}
                  isOpen={featureSelected === i}
                  setFeatureSelected={() => setFeatureSelected(i)}
                />
              ))}
            </ul>

            <Media feature={features[featureSelected]} key={featureSelected} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesAccordion;
