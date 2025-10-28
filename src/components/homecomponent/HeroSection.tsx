import image from "../../assets/mobile2.jpg";

const HeroSection = () => {
  return (
    // Main Container: Full width, light background
    <div className="w-full bg-gray-100 pt-4 sm:pt-16 lg:pt-16 2xl:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-12">
          {/* LEFT SECTION */}
          <div
            className="w-full lg:w-7/12 flex flex-col justify-center 
        order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-gray-900 mb-6">
              UPGRADE YOUR MOBILE
              <br />
              EXPERIENCE WITH
              <br />
              PREMIUM GADGETS
            </h1>
            {/* Description */}
            <p className="max-w-md md:max-w-lg text-gray-600 text-base sm:text-lg mx-auto lg:mx-0 mb-6">
              Discover the latest smartphones, powerful accessories, and
              top-rated gadgets tailored to boost your performance and match
              your lifestyle. Shop with confidence and stay ahead in technology.
            </p>

            {/* Button */}
            <div className="mb-10 flex justify-center lg:justify-start">
              <button
                className="px-8 py-3 bg-black text-white text-lg font-semibold 
            rounded-full hover:bg-gray-800 transition duration-300 shadow-md cursor-pointer"
              >
                Shop Now
              </button>
            </div>

            {/* STATS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-gray-900">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold">200+</p>
                <p className="text-sm text-gray-600">International Brands</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold">2,000+</p>
                <p className="text-sm text-gray-600">High-Quality Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold">30,000+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div className="w-full lg:w-5/12 order-1 lg:order-2 flex justify-center mt-10 lg:mt-0">
            <img
              src={image}
              alt="Fashion look"
              className="w-full h-72 sm:h-96 md:h-[500px] lg:h-[520px] 
             rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-black mt-10 flex flex-wrap items-center justify-center gap-4 py-6 sm:py-8 lg:py-10">
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 flex justify-center">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Apple
          </p>
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 flex justify-center">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Oppo
          </p>
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 flex justify-center">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ">
            Vivo
          </p>
        </div>
        <div className="w-1/2 sm:w-1/3 lg:w-1/5 flex justify-center">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Infinix
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
