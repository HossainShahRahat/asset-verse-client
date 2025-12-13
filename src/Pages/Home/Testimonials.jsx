const Testimonials = () => {
  const stats = [
    { label: "Companies", value: "120+" },
    { label: "Assets Tracked", value: "50k+" },
    { label: "Happy Users", value: "10k+" },
  ];

  return (
    <div className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="text-4xl font-extrabold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Trusted by Industry Leaders</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D4E03AQERMg186j12oA/profile-displayphoto-scale_200_200/B4EZrohfF.GcAc-/0/1764837685695?e=2147483647&v=beta&t=J5Cu-z9uhTYvh2fvCebE6dfxb9P6P4nsZq2mmxHpcqk"
                      alt="Sarah Jenkins"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Sarah Jenkins</h4>
                  <p className="text-xs text-gray-400">HR Director, TechFlow</p>
                </div>
              </div>
              <p className="italic">
                "AssetVerse changed how we handle our equipment. No more lost
                laptops or confused employees. It's a game changer."
              </p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-4">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5603AQHiTHgD1MEoSg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1701097936797?e=2147483647&v=beta&t=tZPmYF-FaSLIJnNDlXhrO1nuVRlXyG968LtSYQrvJCE"
                      alt="Michael Ross"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Michael Ross</h4>
                  <p className="text-xs text-gray-400">Ops Manager, DataCorp</p>
                </div>
              </div>
              <p className="italic">
                "The automated reporting feature alone saves me 5 hours a week.
                Highly recommended for any growing team."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
