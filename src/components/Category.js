import { Link } from "react-router-dom";
import numPlate from '../images/number.jpeg';

function Category() {
 
  const cardData = [
     {
        id: 1,
        title: "Number Plate Recognition",
        cardClass : "card text-white card-category bg-secondary mb-3",
        imgUrl: numPlate,
      },
      {
        id: 2,
        title: "Car Parking Detection",
        cardClass : "card text-white card-category bg-success mb-3",
        imgUrl:'https://www.clairvoyant.ai/hubfs/Download%20Images%20For%20Training%202.jpeg',
      },
    ];


    return (
    <div className="category-comps">
      <div className="card-deck">
      {cardData.map((data) => (
      <div className= {data.cardClass}>
        <Link style={{ textDecoration: 'none', color: 'white' }}  to={`/${data.title}`}>
        <img src= {data.imgUrl} className="card-img-top" alt="..."></img>
        <div className="card-body">
          <p className="card-text">
            {data.title}
          </p>
        </div>
        </Link>
      </div>
      
  ))}
  </div>
    </div>
  );
}

export default Category;