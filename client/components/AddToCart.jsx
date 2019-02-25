import React from 'react';

class AddToCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    }
  }
  addQuantity () {
    this.setState({count: this.state.count + 1})
  }
  subtractQuantity () {
    if (this.state.count > 1) {
      this.setState({count: this.state.count - 1})
    }
  }
  resetCount () {
    this.setState({count: 1})
  }
  render () {
    return (
      <div className="add-to-cart">
        <div className="quantity-button" onClick={this.subtractQuantity.bind(this)}>-</div>
        <div className="count">{this.state.count}</div>
        <div className="quantity-button" onClick={this.addQuantity.bind(this)}>+</div>
        <div className="add-to-cart-button" onClick={this.resetCount.bind(this)}>Add to Cart</div>
      </div>
    )

  }
}
export default AddToCart;