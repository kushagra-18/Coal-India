import bannerImage from "../images/banner.png";
import "../styles/styles.css";
import {useState} from "react";

function BannerMain() {
  document.title = "Coal India | Home";

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="banner-main-parent">
    <div className="banner-main">
      <img src={bannerImage} id="banner" alt="banner"  onLoad={() => setIsLoading(false)} />
    </div>
    <div className="banner-text" style={{visibility: isLoading ? "hidden" : "visible"}}>Automatic Number Plate Detection</div>
    </div>

  );
}

export default BannerMain;
