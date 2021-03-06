import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // constructor() {
  //   // super creates react component (including render) and lets us add more
  //   super();
  //   this.goToStore = this.goToStore.bind(this);
  // }
  goToStore(event) {
    event.preventDefault();
     // grab the text from the box
    const storeId = this.storeInput.value;
    console.log(`going to ${storeId}`);
     // transition ro /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`)
  }
  render() {
    return (
      <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store Name"
          defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}

// allows us to use transitionTo component
StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
