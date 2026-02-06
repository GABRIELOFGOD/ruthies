import Marquee from "react-fast-marquee";

const Announcement = () => {
  return (
    <div className="bg-gray-900 px-4 py-2 md:py-3 border-b border-gray-800">
      <Marquee pauseOnClick={true} speed={50} gradient={false}>
        <span className="text-gray-300 text-sm md:text-base font-medium">
          🎉 Spring Collection Now Available | Free Shipping on Orders Above
          $100 | Limited Time Offer: 20% Off
        </span>
      </Marquee>
    </div>
  );
};
export default Announcement;
