import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div
      className="hero min-h-[600px]"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop)",
      }}
    >
      <div className="hero-overlay bg-opacity-70"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-5 text-5xl font-bold"
          >
            Manage Your Corporate Assets Efficiently
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 text-lg"
          >
            AssetVerse helps you track, assign, and manage returnable and
            non-returnable assets with ease. Streamline your HR operations
            today.
          </motion.p>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex gap-4 justify-center"
          >
            <Link to="/join-hr" className="btn btn-primary border-none">
              Join as HR Manager
            </Link>
            <Link
              to="/join-employee"
              className="btn btn-primary btn-outline text-white hover:bg-white hover:text-black"
            >
              Join as Employee
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
