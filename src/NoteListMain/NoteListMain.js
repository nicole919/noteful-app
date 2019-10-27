import React from "react";
import { Link } from "react-router-dom";
import Note from "../NotePage/NotePage";
import Button from "../Button/Button";
import ApiContext from "../ApiContext";
import { getNotesForFolder } from "../notes-helpers";
import "./NoteListMain.css";

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  };
  static contextType = ApiContext;

  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);
    return (
      <section className="NoteListMain">
        <ul>
          {notesForFolder.map(note => (
            <li key={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified} />
            </li>
          ))}
        </ul>
        <div className="NoteListMain-button-container">
          <Button
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain-add-note-button"
          >
            <br />+ Note
          </Button>
        </div>
      </section>
    );
  }
}
