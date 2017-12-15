import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
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

  authenticate(provider) {
    base.AuthWithOAuthPopup(provider, this.authHandler);
  }

  authHandler(err, authData) {
    console.log(authData);
    // if(err) {
    //   console.error(err);
    //   return;
    // }
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
    const logout = <button>Log Out</button>;

    // Check if they are logged in at all
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // Check if they are the owner of the store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of the store.</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
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
