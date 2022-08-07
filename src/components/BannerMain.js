import bannerImage from "../images/banner.png";
import "../styles/styles.css";

function BannerMain() {
  document.title = "Coal India | Home";

  return (
    <div className="banner-main-parent">
    <div className="banner-main">
      <img src={bannerImage} id="banner" />
    </div>
    </div>

  );
}

export default BannerMain;
