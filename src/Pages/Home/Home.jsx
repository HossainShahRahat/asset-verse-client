import About from "./About";
import Banner from "./Banner";
import Features from "./Features";
import Packages from "./Packages";
import Testimonials from "./Testimonials";
import HowItWorks from "./HowItWorks";
import FaqSection from "./FaqSection";

const Home = () => {
  return (
    <div>
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
