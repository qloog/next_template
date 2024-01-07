import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId
const Pricing = () => {
  return (
    <section className="bg-base-200 overflow-hidden" id="pricing">
      <div className="py-8 px-4">
        <div className="flex flex-col text-center w-full mb-8">
          <h2 className="font-bold text-2xl lg:text-4xl tracking-tight"></h2>
        </div>

        <div className="flex flex-col items-center justify-center gap-8">
          {config.stripe.plans.map((plan) => (
            <div
              key={plan.priceId}
              className="w-full max-w-2xl bg-base-100 p-6 rounded-lg shadow-md"
            >
              <div>
                <p className="text-lg font-bold text-center">{plan.name}</p>
                {plan.description && (
                  <p className="text-sm text-center mt-2">{plan.description}</p>
                )}
              </div>
              <p className="text-3xl font-bold text-center my-4">
                ${plan.price}
              </p>
              {plan.features && (
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-center">
                      {feature.name}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 text-center">
                <button
                  className="bg-#f44425"
                  onClick={() => handlePayment()}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <path d="M249.685 14.125C249.685 11.5046 248.913 8.94218 247.465 6.75675C246.017 4.57133 243.957 2.85951 241.542 1.83453C239.126 0.809546 236.463 0.516683 233.882 0.992419C231.301 1.46815 228.917 2.69147 227.028 4.50999L179.466 50.1812C108.664 118.158 48.8369 196.677 2.11373 282.944C0.964078 284.975 0.367442 287.272 0.38324 289.605C0.399039 291.938 1.02672 294.226 2.20377 296.241C3.38082 298.257 5.06616 299.929 7.09195 301.092C9.11775 302.255 11.4133 302.867 13.75 302.869H129.042V494.875C129.039 497.466 129.791 500.001 131.205 502.173C132.62 504.345 134.637 506.059 137.01 507.106C139.383 508.153 142.01 508.489 144.571 508.072C147.131 507.655 149.516 506.503 151.432 504.757L172.698 485.394C247.19 417.643 310.406 338.487 359.975 250.894L373.136 227.658C374.292 225.626 374.894 223.327 374.882 220.99C374.87 218.653 374.243 216.361 373.065 214.341C371.887 212.322 370.199 210.646 368.17 209.482C366.141 208.318 363.841 207.706 361.5 207.707H249.685V14.125Z" />
                  )}
                  Get Findrr Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
