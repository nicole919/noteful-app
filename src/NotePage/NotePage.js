import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import moment from "moment";
import config from "../config";
import PropTypes from "prop-types";
import "./NotePage.css";

export default class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {}
  };
  static contextType = ApiContext;

  handleClickDelete = event => {
    event.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    const { name, id, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="Note-title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          className="Note-delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          remove
        </button>
        <div className="Note-dates">
          <div className="Note-dates-modified">
            Modified on {moment(modified).format("MMMM Do, YYYY")}
          </div>
        </div>
      </div>
    );
  }
}

Note.propType = {
  onDeleteNote: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  modified: PropTypes.string
};
