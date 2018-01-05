import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticateGithub = this.authenticateGithub.bind(this);
    this.authenticateFacebook = this.authenticateFacebook.bind(this);
    this.authenticateTwitter = this.authenticateTwitter.bind(this);
    this.logout = this.logout.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler({ user });
      }
    });
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

  authenticateGithub() {
    var provider = new base.auth.GithubAuthProvider();
    base.auth().signInWithPopup(provider).then(this.authHandler);
  }

  authenticateFacebook() {
    var provider = new base.auth.FacebookAuthProvider();
    base.auth().signInWithPopup(provider).then(this.authHandler);
  }

  authenticateTwitter() {
    var provider = new base.auth.TwitterAuthProvider();
    base.auth().signInWithPopup(provider).then(this.authHandler).catch(function(error) {
      console.log(error);
    });
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(authData) {
    console.log(authData);

    // grab store info
    const storeRef = base.database().ref(this.props.storeId);

    // query the firebase once from the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};
      // claim as our own if no previous owner
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticateGithub()}>
          Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticateFacebook()}>
          Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticateTwitter()}>
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
    const logout = <button onClick={this.logout}>Log Out</button>;

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
  storeId: React.PropTypes.string.isRequired,
};

export default Inventory;
