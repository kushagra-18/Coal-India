function HeaderTitle(props) {
    return (
      <div className="container_padding">
        <hr />
        <h5>
          <div className="mb-1 text-muted">
            &nbsp;&nbsp;<i className= {props.icon}></i> {props.title}
          </div>
        </h5>
        <hr />
        </div>
    );
  }
  
  export default HeaderTitle;