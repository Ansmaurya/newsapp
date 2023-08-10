import React, { Component } from 'react'

export class Newsitems extends Component {
   
    
  render() {
    let {title, description, imageUrl, newsUrl,author, date, source} = this.props;
    return (
      <div>
        <div className="card" >
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex:'1'}}>{source}</span>
  <img src={!imageUrl?"https://static.toiimg.com/thumb/msid-98663299,imgsize-123168,width-400,resizemode-4/98663299.jpg": imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text" style={{color:"red"}}><small className="text-danger" >By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small>
      </p>
    <a  href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default Newsitems
