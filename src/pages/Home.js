import { Link, NavLink } from "react-router-dom";
import BannerMain from "../components/BannerMain";
import HeaderTitle from "../components/HeaderTitle";
import RealTimeData from "../components/RealTimeData";
import Category from "../components/Category";


document.title = "Home | Coal India";

function Home() {
  return (
    <div className="home-main">
      <BannerMain></BannerMain>
      <div className="banner-text">Automatic Number Plate Detection</div>
      <RealTimeData></RealTimeData>
      <HeaderTitle icon="fa fa-info" title="Services"></HeaderTitle>
      <Category></Category>
    </div>
  );
}

export default Home;
