import React from "react";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      count2: 0,
    };
    console.log(this.props.name + "User constructor");
  }
  componentDidMount() {
    // This method is called after the component is mounted
    console.log(this.props.name + "User component mounted");
  }
  componentDidUpdate() {
    // This method is called after the component is updated
    console.log(this.props.name + "User component updated");
  }
  render() {
    console.log(this.props.name + "User render" + this.state.count);
    const { name, location } = this.props;
    const { count, count2 } = this.state;
    return (
      <div className="user-card">
        <h3>Count: {count}</h3>
        <h3>Count2: {count2}</h3>
        <button
          onClick={() => {
            this.setState({ count: count + 1, count2: count + 1 });
          }}
        >
          Increment
        </button>
        <h2>{name}</h2>
        <p>{location}</p>
      </div>
    );
  }
}
export default User;
