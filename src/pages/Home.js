import { Link, NavLink } from 'react-router-dom';
import BannerMain from '../components/BannerMain';
import HeaderTitle from '../components/HeaderTitle';
import RealTimeData from '../components/RealTimeData';
import Category from '../components/Category';

function Home() {
    return (
        <div className="home-main">
      <BannerMain></BannerMain>
      <RealTimeData></RealTimeData>
      <HeaderTitle icon="fa fa-info" title="Services"></HeaderTitle>
      <Category></Category>
      </div>
    );
}

export default Home;