import About from "./About";
import Banner from "./Banner";
import Features from "./Features";
import Packages from "./Packages";
import Testimonials from "./Testimonials";
import HowItWorks from "./HowItWorks";
import FaqSection from "./FaqSection";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      {/* Added Helmet for page title if you have react-helmet installed, otherwise remove */}
      <Helmet>
        <title>AssetVerse | Home</title>
      </Helmet>

      <Banner />
      <About />
      <HowItWorks />
      <Features />
      <Packages />
      <Testimonials />
      <FaqSection />
    </div>
  );
};

export default Home;
