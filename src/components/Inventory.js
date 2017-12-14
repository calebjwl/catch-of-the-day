import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish,
      // [property we're changing]: new value
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updatedFish)
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" value={fish.name} name="name" placeholder="name"
          onChange={(e) => this.handleChange(e, key)}/>
        <input type="text" value={fish.price} name="price" placeholder="price"/>
        <select type="text" value={fish.status} name="status" placeholder="status">
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea type="text" value={fish.desc} name="desc" placeholder="desc"></textarea>
        <input type="text" value={fish.image} name="image" placeholder="image"/>
      </div>
    )
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;
