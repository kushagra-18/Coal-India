import { Link } from "react-router-dom";

function RTCard(props) {

 
  const cardData = [
     {
        id: 1,
        title: "Total Vehicle In Field",
        cardClass : "card text-white card-category card-category-rd bg-secondary",
        icn:'fa fa-truck-arrow-right',
        number: (props.data.ti) ? props.data.ti : 0,
      },
      {
        id: 2,
        title: "Total Vehicle Count",
        cardClass : "card text-white card-category card-category-rd bg-info",
        icn:'fa fa-truck',
        number: (props.data.tv) ? props.data.tv : 0,
      },

      {
        id: 3,
        title: "Total Vehicle out of Field",
        cardClass : "card text-white card-category card-category-rd bg-success",
        icn:'fa fa-truck-fast',
        number: (props.data.to) ? props.data.to : 0,
      },
    ];


    return (
    <div className="category-comps rt-card">
      <div className="card-deck">
      {cardData.map((data) => (
      <div className= {data.cardClass}>
         <Link style={{ textDecoration: 'none', color: 'white' }}  to='/data-all'>
        <div className="card-body rt-card-body">
        <font size = '5'><i className = {data.icn}></i></font>
         <div className="number-data">{data.number}</div>
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

export default RTCard;