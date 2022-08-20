import BannerMain from "../components/BannerMain";
import HeaderTitle from "../components/HeaderTitle";
import RealTimeData from "../components/RealTimeData";
import Category from "../components/Category";
import AuthContext from "../storage/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
document.title = "Coal India | Home";

function Home() {
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const isLoggedIn = authCtx.authenticated;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="home-main">
      <BannerMain></BannerMain>
      <RealTimeData></RealTimeData>
      <HeaderTitle icon="fa fa-info" title="Services"></HeaderTitle>
      <Category></Category>
      {/* <Footer/> */}
    </div>
  );
}

export default Home;
