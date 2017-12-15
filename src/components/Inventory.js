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

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>
          Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>
          Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>
          Log In with Twitter</button>
      </nav>
    )
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input type="text" value={fish.name} name="name" placeholder="name"
          onChange={(e) => this.handleChange(e, key)}/>
        <input type="text" value={fish.price} name="price" placeholder="price"
          onChange={(e) => this.handleChange(e, key)}/>
        <select type="text" value={fish.status} name="status" placeholder="status"
          onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea type="text" value={fish.desc} name="desc" placeholder="desc"
          onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" value={fish.image} name="image" placeholder="image"
          onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
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

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
};

export default Inventory;
