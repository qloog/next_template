"use client";

import Hero from "@/components/Hero";
import "/app/main.css";
import "/app/main.js";

export default function Home() {
  return (
    <>
      <main className="bg-black text-white">
        <Hero />
      </main>

      <head>
        <meta charset="utf-8"></meta>
        <link rel="stylesheet" href="main.css"></link>
        <meta http-equiv="X-UA-Compatible" content="IE=7"></meta>
        <meta
          http-equiv="Content-Type"
          content="text/html;charset=UTF-8"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>

      <body>
    <main>
        <section class="droparea">
            <i class="far fa-images"></i>
            <p>Drop your .png or .jpg files here!</p>
            <p><small>Up to 20 images, No max file size.</small></p>
        </section>
    </main>
</body>

    </>
  );
}
