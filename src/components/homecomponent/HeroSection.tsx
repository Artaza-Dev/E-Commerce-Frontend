import image from "../../assets/mobile2.jpg";

const HeroSection = () => {
  return (
    // Main Container: Full width, light background
    <div className="w-full bg-linear-to-b from-gray-50 to-gray-100 pt-4 sm:pt-16 lg:pt-16 2xl:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          {/* LEFT SECTION */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
           

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-gray-900 mb-6 leading-tight">
              <span className="inline-block hover:scale-105 transition-transform duration-300">
                ELEVATE YOUR
              </span>
              <br />
              <span className="inline-block bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                DIGITAL LIFESTYLE
              </span>
              <br />
              <span className="inline-block hover:scale-105 transition-transform duration-300">
                WITH PREMIUM TECH
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-md md:max-w-lg text-gray-600 text-base sm:text-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              Experience cutting-edge technology with our curated collection of
              premium electronics. From flagship smartphones to powerful
              laptops, wireless earbuds to smart wearables – discover gadgets
              that seamlessly blend innovation with style.
            </p>

            {/* Features List */}
            

            {/* Button */}
            <div className="mb-10 flex justify-center lg:justify-start">
              <button className="group relative px-10 py-4 bg-black text-white text-lg font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer">
                {/* Shine effect */}
                <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>

                <span className="relative flex items-center space-x-2">
                  <span>Shop Now</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-gray-900">
              <div className="group text-center hover:transform hover:scale-110 transition-all duration-300 cursor-default">
                <p className="text-3xl sm:text-4xl font-black bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  500+
                </p>
                <p className="text-sm text-gray-600 font-semibold mt-1">
                  Premium Brands
                </p>
              </div>
              <div className="group text-center hover:transform hover:scale-110 transition-all duration-300 cursor-default">
                <p className="text-3xl sm:text-4xl font-black bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  5,000+
                </p>
                <p className="text-sm text-gray-600 font-semibold mt-1">
                  Quality Products
                </p>
              </div>
              <div className="group text-center hover:transform hover:scale-110 transition-all duration-300 cursor-default">
                <p className="text-3xl sm:text-4xl font-black bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  50,000+
                </p>
                <p className="text-sm text-gray-600 font-semibold mt-1">
                  Satisfied Clients
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="w-full lg:w-5/12 order-1 lg:order-2 flex justify-center mt-10 lg:mt-0">
            <div className="relative group">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>

              {/* Main Image */}
              <img
                src={image}
                alt="Premium Electronics"
                className="relative w-full h-72 sm:h-96 md:h-[500px] lg:h-[520px] rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500 object-cover"
              />

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-black text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm animate-pulse">
                🔥 HOT DEALS
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="relative overflow-hidden bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 py-10 mt-8 shadow-inner shadow-gray-800">
        <div className="animate-marquee whitespace-nowrap flex items-center italic font-serif">
          {["Smartphone", "Tablet", "Laptop", "Smartwatch", "Headphones"].map(
            (item, index) => (
              <span
                key={index}
                className="glow-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mx-10 tracking-wide uppercase"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
