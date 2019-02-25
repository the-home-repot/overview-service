import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Title from './components/title.jsx';
import Rating from './components/rating.jsx';
import Description from './components/description.jsx';
import Price from './components/price.jsx';
import AddToCart from './components/addtocart.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 78,
      title: null,
      descs: [],
      price: null,
      rating: null,
      cart: 0
    } 
  }
  averageRating(arr) {
    let total = arr.reduce((acc, obj) => {
      return acc + obj.rating;
    }, 0)
    let avgRating = (total / arr.length).toFixed(1);
    return avgRating;
  }
  getProductInfo(id, callb) {
    id ? id = id : id = this.state.id;
    axios.get(`/productinfo/${id}`)
        .then((info) => {
          const updatedState = {
                  id: id,
                  title: info.data.prods[0].title,
                  descs: info.data.descs,
                  price: info.data.prods[0].price,
                  rating: this.averageRating(info.data.revs)
                }
                console.log('updatedState', updatedState);
                // this.setState(updatedState);
                if (callb) {
                  callb(updatedState);
                } 
        }).catch((err) => {
          console.log('Error in axios GET request', err)
        })
  }
  componentDidMount() {
    function callb (state) {
      this.setState(state);
    }
    window.addEventListener('updateProduct', event => {
      this.getProductInfo(event.detail, callb);
    })
    this.getProductInfo(this.state.id, callb);
  }
    // componentDidUpdate(prevProps, prevState) {
    //   function callb (state) {
    //     this.setState(state);
    //   }
    //   if (this.state.id !== prevState) {
    //     this.getProductInfo(this.state.id, callb);
    //   }
    // }
  
  render() {
    if (this.state.title !== null) {
    return (
      <div className="flex-container">
        {/* <TempCart /> */}
        <Title title={this.state.title} />
        <Rating rating={this.state.rating} />
        <Description descriptions={this.state.descs} />
        <Price price={this.state.price} />
        <AddToCart /> 
      </div>
    )
    } else {
      return (
        <div></div>
      )
    }
  }
}


ReactDOM.render(<App/>, document.getElementById('product-overview'));