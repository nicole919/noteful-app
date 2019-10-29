import React from "react";
import Note from "../NotePage/NotePage";
import ApiContext from "../ApiContext";
import { findNote } from "../notes-helpers";
import "./NotePageMain.css";

export default class NotePageMain extends React.Component {
  state = {
    forErrors: this.props.match,
    toggle: true
  };
  static defaultProps = {
    match: {
      params: {}
    }
  };
  static contextType = ApiContext;

  handleDeleteNote = noteId => {
    this.props.history.push("/");
  };
  render() {
    const { notes = [] } = this.context;
    const { noteId } = this.state.forErrors.params;
    const note = findNote(notes, noteId) || { content: "" };
    if (this.state.toggle === false) {
      this.setState({
        forErrors: "err"
      });
      this.setState({
        forErrors: this.props.match
      });
    }

    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="NotePageMain-content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}
