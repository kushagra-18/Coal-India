import { Link } from "react-router-dom";

function Category() {
 
  const cardData = [
     {
        id: 1,
        title: "Technology",
        cardClass : "card text-white card-category bg-secondary mb-3",
        imgurl:'https://content.techgig.com/photo/83600041/what-it-takes-for-technologies-to-go-from-breakthrough-to-big-time.jpg?27767',
      },
      {
        id: 2,
        title: "Business",
        cardClass : "card text-white card-category bg-success mb-3",
        imgurl:'https://www.incimages.com/uploaded_files/image/1920x1080/shutterstock_1145284904_372957.jpg',
      },
    ];


    return (
    <div className="category-comps">
      <div class="card-deck">
      {cardData.map((data) => (
      <div className= {data.cardClass}>
        <Link style={{ textDecoration: 'none', color: 'white' }}  to={`/blogs/category/${data.title}`}>
        <img src= {data.imgurl} className="card-img-top" alt="..." style={{height:'11rem'}} ></img>
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