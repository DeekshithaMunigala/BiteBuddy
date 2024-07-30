import BannerCard from "./BannerCard";
import { api } from "../utils/links";
import { useEffect, useState } from "react";

import { LiaArrowRightSolid } from "react-icons/lia";
import { LiaArrowLeftSolid } from "react-icons/lia";

const MOVE_COUNT = 1;
const MAX_RIGHT_CLICK_VALUE = 4;
const MAX_LEFT_CLICK_VALUE = -2;

const Banner = () => {
  const [banner, setBanner] = useState([]);
  const [title, setTitle] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const data = await response.json();

      setTitle(data.data.cards[0].card.card.header.title);
      setBanner(data.data.cards[0].card.card.imageGridCards.info);
    };

    fetchData();
  }, []);

  const nextSlide = () => {
    if (currentSlide < MAX_RIGHT_CLICK_VALUE) {
      setCurrentSlide((prev) => prev + MOVE_COUNT);
    }
  };

  const prevSlide = () => {
    if (currentSlide > MAX_LEFT_CLICK_VALUE) {
      setCurrentSlide((prev) => prev - MOVE_COUNT);
    }
  };

  const translateXValue = -currentSlide * 10;

  if (!banner?.length) return;

  return (
    <div className="lg:mx-40 lg:w-[75rem] md:mx-32 sm:mx-10 sm:w-[650px] mx-[2%]">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">{title}</h2>
        <div className="flex gap-x-4">
          <LiaArrowLeftSolid onClick={prevSlide} />
          <LiaArrowRightSolid onClick={nextSlide} />
        </div>
      </div>
      <div className="flex flex-row justify-center overflow-x-hidden relative h-[250px] items-center p-[5px] hide-scrollbar">
        <div
          className="flex transition-transform duration-500 ease"
          style={{
            transform: `translateX(${translateXValue}%)`,
          }}
        >
          {banner.map((each) => (
            <BannerCard key={each.id} bannerImage={each} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
