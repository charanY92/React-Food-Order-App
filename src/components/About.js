import User from "./UserClass";
import { Component } from "react";
class About extends Component {
  constructor(props) {
    super(props);

    console.log("parent constructor");
  }

  componentDidMount() {
    // This method is called after the component is mounted
    console.log("Parent component mounted");
  }

  render() {
    console.log("parent render");
    return (
      <div className="about">
        <header className="about-header">
          <h1>About Us</h1>
        </header>
        <main>
          <div className="user-card">
            <User name={"First child "} location={"Hyderabad"} />
            {/* <User name={"Second child "} location={"Hyderabad"} /> */}
          </div>
        </main>
      </div>
    );
  }
}

export default About;
