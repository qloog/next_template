import themes from "daisyui/src/theming/themes.js";

const config = {
  // REQUIRED
  appName: "TattooswithAI",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription:
    "Transform any Tattoo idea into a custom-made design. Stand apart from the crowd and rock something unique",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "tattooswithai.com",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_1ObDh8Ha8820Uqe5zwd6xtNX",
            //price_1ObDh8Ha8820Uqe5zwd6xtNX
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Beginner",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Perfect for First-Timers Exploring AI Tattoo Design",
        // The price you want to display, the one user will be charged on Stripe.
        price: 4.99,
        credits: 10,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 16.99,
        features: [
          { name: "10 design credits added to your account" },
        { name: "Access an unlimited array of design options; create up to 10 unique tattoos" },
        { name: "Personalize each tattoo design with AI assistance" },
        { name: "Access to standard customer support for guidance" },
        ],
      },
      {
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_1ObDhsHa8820Uqe5hWVSyYNT",
        name: "Pro",
        description: "Ideal for Enthusiasts Seeking More Creativity",
        price: 9.99,
        credits: 30,
        priceAnchor: 22.99,
        features: [
          { name: "30 design credits added to your account" },
        { name: "Share your creations and get professional insights and community opinions" },
        { name: "More credits for more creativity" },
        { name: "Faster, prioritized customer assistance" },
        ],
      },
      {
        priceId:
        process.env.NODE_ENV === "development"
          ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
          : "price_1ObDijHa8820Uqe53AHgB1Ib",
      //  REQUIRED - Name of the plan, displayed on the pricing page
      name: "Premium",
      // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
      description: "Unlimited Creativity for Tattoo Aficionados",
      // The price you want to display, the one user will be charged on Stripe.
      price: 18.99,
      credits: 100,
      // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
      priceAnchor: 32.99,
      features: [
        { name: "Unlimited design credits - create without limits" },
        { name: "The sky's the limit" },
        { name: "Leverage all AI features for unparalleled design options" },
        { name: "Top-tier customer service and technical support" },
      ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `infotattooswithai@gmail.com`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `infotattooswithai@gmail.com`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "infotattooswithai@gmail.com",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "infotattooswithai@gmail.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "light",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: themes[`[data-theme=light]`]["primary"],
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/api/auth/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    //callbackUrl: "/dashboard",
  },
};

export default config;


/*
priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_1OXnshHa8820Uqe5dOQdkXfI",
        name: "Pro",
        description: "30 credits added to your account",
        price: 9.99,
        credits: 30,
        priceAnchor: 16.99,
        features: [
          { name: "Unlimited tattoo history" },
          { name: "Generate 30 unique designs" },
          */ 