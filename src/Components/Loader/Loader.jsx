import { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class Spinner extends Component {
  render() {
    return (
      <Loader
        type="ThreeDots"
        color="#3f51b5"
        height={100}
        width={100}
        timeout={3000}
      />
    );
  }
}
