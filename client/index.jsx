import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Title from './components/title.jsx'
import Rating from './components/rating.jsx'
import Description from './components/description.jsx'
import Price from './components/price.jsx'
import AddToCart from './components/addtocart.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 32,
      title: null,
      descs: [],
      price: null,
    }
  }
  componentDidMount() {
      const data = {id: this.state.id};
      const updatedState = {};
      $.ajax({
        method: 'POST',
        url: '/descriptions',
        data: data,
        success: (res) => {
          console.log('Super Successful GET');
          let descs = [];
          for (let obj of res) {
            descs.push(obj.description)
          }
          updatedState.descs = descs;
        },
        error: () => {
          console.log('error getting descriptions')
        }
      })
      $.ajax({
        method: 'POST',
        url: '/products',
        data: data,
        success: (res) => {
          console.log('Super Successful GET');
          let {title, price} = res[0];
          updatedState.title = title;
          updatedState.price = price;
          this.setState(updatedState);
        },
        error: () => {
          console.log('error getting products')
        }
      })

      //Post Request for Reviews
      $.ajax({
        method: 'POST',
        url: '/reviews',
        data: data,
        success: (res) => {
          console.log('Super Successful GET');
          console.log(res);
          let total = res.reduce((acc, obj) => {
            return acc + obj.rating;
          }, 0);
          let avgRating = (total / res.length).toFixed(1);
          console.log(avgRating);
          updatedState.rating = avgRating;
          this.setState(updatedState);
        },
        error: () => {
          console.log('error getting reviews')
        }
      })
    }
  
  render() {
    return (
      <div className="flex-container">
        <Title title={this.state.title} />
        <Rating rating={this.state.rating} />
        <Description tempvar={this.state.descs} />
        <Price price={this.state.price} />
        <AddToCart /> 
      </div>
    )
  }
}


ReactDOM.render(<App/>, document.getElementById('app'));