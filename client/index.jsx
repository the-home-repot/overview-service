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
  getProductInfo() {
    axios.get(`/productinfo/${this.state.id}`)
        .then((info) => {
          console.log(info);
          const updatedState = {
                  title: info.data.prods[0].title,
                  descs: info.data.descs,
                  price: info.data.prods[0].price,
                  rating: this.averageRating(info.data.revs)
                }   
                return updatedState; 
        }).then((state) => {
          this.setState(state);
          console.log(this.state)
        }).catch((err) => {
          console.log('Error in axios GET request', err)
        })
  }
  componentDidMount() {
    window.addEventListener('updateProduct', event => {
      this.setState({id: event.detail})
    })
    this.getProductInfo();
  }
    componentDidUpdate(prevProps, prevState) {
      if (this.state.id !== prevState.id) {
        console.log('i hit here recnetly');
        this.getProductInfo();
      }
    }
  
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