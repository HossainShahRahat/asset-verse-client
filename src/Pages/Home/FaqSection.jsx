const FaqSection = () => {
  return (
    <div className="bg-base-200 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="join join-vertical w-full bg-base-100 shadow-sm rounded-xl">
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Can I upgrade my package later?
            </div>
            <div className="collapse-content">
              <p>
                Yes, you can upgrade your subscription package at any time
                directly from your HR dashboard.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Is my data secure?
            </div>
            <div className="collapse-content">
              <p>
                Absolutely. We use industry-standard encryption to ensure your
                company data and employee information remain private.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Can employees work for multiple companies?
            </div>
            <div className="collapse-content">
              <p>
                Yes, employees can be affiliated with multiple companies using
                the same account.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center bg-primary text-white rounded-2xl p-10 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">
            Ready to streamline your assets?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Join hundreds of companies using AssetVerse today.
          </p>
          <div className="flex justify-center gap-4">
            <button className="btn bg-white text-primary border-none hover:bg-gray-100">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
