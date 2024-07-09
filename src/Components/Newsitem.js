import React from 'react'

const Newsitem=(props)=> {



  
    let{title, description, imageUrl, newsUrl,author,date}=props;
    return (
      <div>
        <div className="card">
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p class="card-text"><small class="text-body-secondary">By{!author?"unknown":author} on {date}</small></p>

    <a href={newsUrl} target ="_blank" className="btn btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }


export default Newsitem

