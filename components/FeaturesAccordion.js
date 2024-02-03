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
    title: "Custom Tattoo Design Generation",
    description:
      "Create unique tattoo designs tailored to your preferences. Customize style, theme, and complexity with just a few clicks",
  },
  {
    title: "Visual Inspiration Gallery",
    description:
      "Browse through an extensive gallery of designs. Find inspiration for your next tattoo from a diverse collection of styles and themes",
  },
  {
    title: "Style and Theme Explorer",
    description:
      "Whether it's traditional, realism, watercolor, or tribal, explore a myriad of tattoo styles. Find the one that best expresses your individuality",
  },
  {
    title: "High-Quality Exports",
    description:
      "Download your designs in high-resolution formats, ready for your tattoo artist to use as a stencil or reference",
  },
  {
    title: "Share and Collaborate",
    description:
      "Share your tattoo designs with friends or your tattoo artist. Get feedback and make collaborative adjustments to your design",
  },
  {
    title: "Multilingual Support",
    description:
      "Describe your tattoo idea in multiple languages. Our AI understands and generates designs in English, Spanish, French, German, and more",
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
          className="flex-1 text-black"
          style={{ color: isOpen ? "rgb(23, 34, 190)" : "" }}
        >
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
      <p
          className="font-medium text-sm mb-2"
          style={{ color: "rgb(23, 34, 190)" }}
        >
         POWERFUL FEATURES
        </p>
        <h2 className="text-4xl lg:text-6xl tracking-tight mb-12 md:mb-24 text-align:center text-center"
        style={{
          fontFamily: "'EB Garamond', serif",
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

//<span className={`mr-2`}>{index + 1}.</span>