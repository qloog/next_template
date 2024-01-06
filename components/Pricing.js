import config from "@/config";
import ButtonCheckout from "./ButtonCheckout";

// <Pricing/> displays the pricing plans for your app
// It's your Stripe config in config.js.stripe.plans[] that will be used to display the plans
// <ButtonCheckout /> renders a button that will redirect the user to Stripe checkout called the /api/stripe/create-checkout API endpoint with the correct priceId
const Pricing = () => {
    return (
      <section className="bg-base-200 overflow-hidden" id="pricing">
        <div className="py-8 px-4 max-w-5xl mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            <p className="font-medium text-primary mb-4">Pricing</p>
            <h2 className="font-bold text-2xl lg:text-4xl tracking-tight">
              Choose Your Plan
            </h2>
          </div>
  
          <div className="flex flex-wrap justify-center gap-4">
            {config.stripe.plans.map((plan) => (
              <div key={plan.priceId} className="w-full md:w-1/3 lg:w-1/4 p-4">
                <div className="bg-base-100 p-6 rounded-lg shadow-md">
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
                  <div className="mt-6">
                    <ButtonCheckout priceId={plan.priceId} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Pricing;
  