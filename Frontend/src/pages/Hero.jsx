import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-2 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r  from-slate-800 to-slate-900 rounded-3xl overflow-hidden min-h-[280px]">

          <div className="grid lg:grid-cols-2 items-center h-full">

            {/* Left Side */}
            <div className="p-6 md:p-8 lg:p-10 text-white ">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                🔥 Limited Time Offer
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Up To 50% Off
                <br />
                On Electronics
              </h1>

              <p className="mt-4 text-base md:text-lg text-sky-100 max-w-lg">
                Discover the latest smartphones, laptops, accessories and more at amazing prices.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link
                  to="/"
                  className="bg-white text-sky-600 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-100 transition"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </Link>

                <button className="border border-white/40 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition">
                  Explore Deals
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className=" w-[500px] hidden lg:flex justify-center items-center p-6 ml-20">
              <img
                src="https://res.cloudinary.com/ds2pvy5pq/image/upload/v1782802573/ChatGPT_Image_Jun_30_2026_12_25_20_PM_nzl4tt.png"
                alt="Electronics"
                className="w-full max-w-xl h-80 object-cover rounded-2xl ml-10"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;