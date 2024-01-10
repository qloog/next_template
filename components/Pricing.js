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

            <h2 className="font-bold text-2xl lg:text-4xl tracking-tight">
            More Ink, Less Ouch: Tattoos That Wow Without the Ow!
            </h2>
          </div>
  
          <div className="flex flex-col items-center justify-center gap-8">
            {config.stripe.plans.map((plan) => (
              <div key={plan.priceId} className="w-full max-w-2xl bg-base-100 p-6 rounded-lg shadow-md">
                <div>
                  <p className="text-lg font-bold text-center">{plan.name}</p>
                  {plan.description && (
                    <p className="text-sm text-center mt-2">
                      {plan.description}
                    </p>
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
                  <ButtonCheckout priceId={plan.priceId} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Pricing;
  