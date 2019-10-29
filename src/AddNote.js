import React from "react";
import ApiContext from "./ApiContext";
import config from "./config";
import "./Form/Form.css";

export default class AddNote extends React.Component {
  state = {
    title: "",
    content: "",
    folderSelect: "",
    folderId: "",
    formValid: false,
    titleValid: false,
    contentValid: false,
    folderSelectValid: false,
    validationMessage: null
  };

  static contextType = ApiContext;

  goBack = () => {
    this.props.history.goBack();
  };

  updateFormEntry(event) {
    const name = event.target.name;
    const value = event.target.value;
    let id;
    if (event.target.selectedOptions) {
      id = event.target.selectedOptions[0].id;
      this.setState({
        folderId: id
      });
    }
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
    let hasErrors = false;

    value = value.trim();
    if (name === "title" || name === "content") {
      if (value.length < 1) {
        hasErrors = true;
      } else {
        hasErrors = false;
      }
    } else if (name === "folderSelect" && value === "Select") {
      hasErrors = true;
    } else {
      hasErrors = false;
    }

    this.setState(
      {
        [`${name}Valid`]: !hasErrors
      },
      this.formValid
    );
  }

  formValid() {
    const { titleValid, contentValid, folderSelectValid } = this.state;
    if (titleValid && contentValid && folderSelectValid === true) {
      this.setState({
        formValid: true,
        validationMessage: null
      });
    } else {
      this.setState({
        formValid: !this.formValid,
        validationMessage: "Please fill out all fields"
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title, content, folderId } = this.state;
    const note = {
      name: title,
      content: content,
      folderId: folderId,
      modified: new Date()
    };

    this.setState({ error: null });

    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(async res => {
        if (!res.ok) {
          const err = await res.json();
          console.log(`Error is: ${err}`);
          throw err;
        }
        return res.json();
      })
      .then(data => {
        this.goBack();
        this.context.addNote(data);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const folders = this.context.folders;
    const options = folders.map(folder => {
      return (
        <option key={folder.id} id={folder.id}>
          {folder.name}
        </option>
      );
    });

    return (
      <form className="mainForm" onSubmit={event => this.handleSubmit(event)}>
        <h2 className="title">Add Note</h2>
        <div className="form-group">
          <label htmlFor="title">Note Title:</label>
          <input
            type="text"
            className="field"
            name="title"
            id="title"
            aria-required="true"
            aria-label="enter note title"
            onChange={event => this.updateFormEntry(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            className="field"
            name="content"
            id="content"
            aria-required="true"
            aria-label="enter note content"
            onChange={event => this.updateFormEntry(event)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="folder-select">Folder:</label>
          <select
            type="text"
            className="field"
            name="folderSelect"
            id="folder-select"
            aria-required="true"
            aria-label="select folder"
            ref={this.folderSelect}
            onChange={event => this.updateFormEntry(event)}
          >
            <option>Select</option>
            {options}
          </select>
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
            disabled={!this.state.formValid}
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}
