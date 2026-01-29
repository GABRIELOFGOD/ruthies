import Marquee from "react-fast-marquee";

const Announcement = () => {
  return (
    <div className="bg-gray-300 px-2 py-1">
      <Marquee pauseOnClick={true} speed={50} gradient={false}>
        Announcement goes here!
      </Marquee>
    </div>
  )
}
export default Announcement;