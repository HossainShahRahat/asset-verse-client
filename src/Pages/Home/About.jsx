const About = () => {
  return (
    <div className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose AssetVerse?</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We provide a comprehensive solution for modern corporate asset
            management, ensuring accountability and ease of use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="card bg-base-100 shadow-xl border border-gray-100">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl mb-2">Real-time Tracking</h3>
              <p>
                Monitor your company's physical assets in real-time. Know
                exactly who has what equipment at any given moment.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-gray-100">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl mb-2">Easy Integration</h3>
              <p>
                Seamlessly integrate your workforce. Employees can easily
                request assets and HR managers can approve them in one click.
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl border border-gray-100">
            <div className="card-body items-center text-center">
              <h3 className="card-title text-2xl mb-2">Automated Reports</h3>
              <p>
                Generate detailed reports on asset distribution, returnable
                items, and inventory status to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
