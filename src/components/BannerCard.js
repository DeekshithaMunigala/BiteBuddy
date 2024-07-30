import { CDN_URL } from "../utils/links";

const BannerCard = (props) => {
  const { imageId } = props.bannerImage;
  return (
    <div>
      <img
        className="w-32 h-40 overflow-clip object-fit mx-20"
        src={CDN_URL + imageId}
        alt="banner-img"
      />
    </div>
  );
};

export default BannerCard;
