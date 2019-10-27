import React from "react";
import ApiContext from "./ApiContext";
import config from "./config";
import Proptypes from "prop-types";
import "./Form/Form.css";

export default class AddFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrors: false,
      title: "",
      formValid: false,
      titleValid: false,
      validationMessage: ""
    };
  }

  static contextType = ApiContext;

  goBack = () => {
    this.props.history.goBack();
  };
  updateFormEntry(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        this.validateEntry(name, value);
      }
    );
  }
  validateEntry(name, value) {
    let inputErrors;
    let hasErrors = this.state.hasErrors;

    value = value.trim();
    if (value < 1) {
      inputErrors`${name} is required`;
    } else {
      inputErrors = "";
      hasErrors = false;
    }
    this.setState(
      {
        validationMessage: inputErrors,
        [`${name}Valid`]: !hasErrors,
        hasErrors: !hasErrors
      },
      this.formValid
    );
  }

  formValid() {
    const { titleValid } = this.state;
    if (titleValid === true) {
      this.setState({
        formValid: true
      });
    } else {
      this.setState({
        formValid: !this.formValid
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    const folder = {
      folderName: title
    };

    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      body: JSON.stringify(folder),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(async res => {
        if (!res.ok) {
          const error = await res.json();
          throw error;
        }
        return res.json();
      })
      .then(data => {
        this.goBack();
        this.context.addFolder(data);
      })
      .catch(error => {
        this.setState({ error });
      });
  }
  render() {
    return (
      <form className="Form" onSubmit={event => this.handleSubmit(event)}>
        <h2 className="title">Add Folder</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="field"
            name="title"
            id="title"
            onChange={event => this.updateFormEntry(event)}
          />
        </div>
        <div className="buttons">
          <button
            type="button"
            className="button"
            onClick={() => this.goBack()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button"
            disabled={this.state.formValid === false}
          >
            Save
          </button>
          {}
        </div>
      </form>
    );
  }
}

AddFolder.propType = {
  push: Proptypes.func.isRequired
};
