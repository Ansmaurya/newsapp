import React, { Component } from "react";
import Newsitems from "./Newsitems";
import Spinner from "./Spinner";
import PropTypes  from 'prop-types';


export default class News extends Component{
  static defaultProps={
    country:'in',
    pageSize: 8,
    category:'general',
  }
static propTypes={
country:PropTypes.string,
pageSize:PropTypes.number,
category: PropTypes.string,

}
capitalizeFirstLetter=(string)=>{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  

    
    constructor(props){
        super(props);
       this.state={
         articles:[],
         loading: true,
         page: 1
         }
         document.title=`${this.capitalizeFirstLetter(this.props.category)}-SharaNews`;
    }
    async updateNews(pageNo){
      let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b756b92b06b4910aae9c80d80afe897&page=${this.state.page}&pageSize-${this.props.pageSize}`;
      this.setState({loading: true});
      let data= await fetch(url);
      let parsedData= await data.json()
      this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
  })
      }
    
    async componentDidMount()
    {
  
  //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b756b92b06b4910aae9c80d80afe897&page=1pageSize-${this.props.pageSize}`;
  //     this.setState({loading: true});
  //     let data= await fetch(url);
  //     let parsedData= await data.json()
  //     console.log(parsedData);
  //     this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading:false
  // })
  this.updateNews();
      }
      handleNext=async()=>{
      //   console.log("Next")
      //   if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){
      // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b756b92b06b4910aae9c80d80afe897&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading: true});
      // let data= await fetch(url);
      // let parsedData= await data.json()
      // console.log(parsedData);
      // this.setState({
      //     page: this.state.page+1,
      //     articles: parsedData.articles,
      //     loading: false
      //   })
      // }
      this.setState({page: this.state.page+1})
      this.updateNews();
       
      }
      handleprevious= async()=>{
      //   console.log("Previous")
        
      //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6b756b92b06b4910aae9c80d80afe897&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading: true});
      // let data= await fetch(url);
      // let parsedData= await data.json()
      // this.setState({
      //     page: this.state.page-1,
      //     articles: parsedData.articles,
      //     loading: false
      //   })
      this.setState({page: this.state.page-1})
      this.updateNews();
      }      
      
    
  render() {
    return (<div className="cantainer my-3">
        <h2 className="text-center" style={{margin:'35px 0px',color:'red'}}>SharaNews-Top {this.capitalizeFirstLetter(this.props.category)} headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <Newsitems
              title={element.title?element.title: ""}
              description={element.description?element.description: ""}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source.name}/>
            </div>
          })}
          
           </div>
           <div className="container d-flex justify-content-between">
           <button disabled={this.state.page<=1}  type="button"className="btn btn-primary"onClick={this.handleprevious} >	⇦ Previous</button>
           <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-secondary"onClick={this.handleNext}>Next	⇨</button>
           </div>
           </div>

    );
  }
}

