const HowItWorks = () => {
  return (
    <div className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-500">Get started in 3 simple steps</p>
        </div>

        <ul className="steps steps-vertical lg:steps-horizontal w-full">
          <li className="step step-primary">
            <div className="flex flex-col items-center p-4">
              <h3 className="font-bold text-lg">Register Company</h3>
              <p className="text-sm text-gray-500 max-w-xs text-center mt-2">
                Sign up as an HR Manager and set up your company profile
                instantly.
              </p>
            </div>
          </li>
          <li className="step step-primary">
            <div className="flex flex-col items-center p-4">
              <h3 className="font-bold text-lg">Add Employees & Assets</h3>
              <p className="text-sm text-gray-500 max-w-xs text-center mt-2">
                Populate your inventory and invite your team members to join.
              </p>
            </div>
          </li>
          <li className="step step-primary">
            <div className="flex flex-col items-center p-4">
              <h3 className="font-bold text-lg">Assign & Track</h3>
              <p className="text-sm text-gray-500 max-w-xs text-center mt-2">
                Approve requests and track asset usage in real-time.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HowItWorks;
