import React from "react";
import Button from "../Button/Button";
import ApiContext from "../ApiContext";
import { findNote, findFolder } from "../notes-helpers";
import PropTypes from "prop-types";
import "./NotePageNav.css";

export default class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {}
    },
    match: {
      params: {}
    }
  };
  static contextType = ApiContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <div className="NotePageNav">
        <Button
          tag="button"
          role="link"
          onClick={() => this.props.history.goBack()}
          className="NotePageNav-back-button"
          aria-label="go back"
        >
          <br />
          Back
        </Button>
        {folder && <h3 className="Folder-name">{folder.name}</h3>}
      </div>
    );
  }
}

NotePageNav.propType = {
  push: PropTypes.func.isRequired
};
