import bannerImage from '../images/banner.gif';
import '../styles/styles.css'

function BannerMain(){

    document.title = "Coal India| Number Plate Recognition";

    return (
        <div className="banner-main">
    <img src= {bannerImage} id="banner"/>
    </div>
    );
}

export default BannerMain;