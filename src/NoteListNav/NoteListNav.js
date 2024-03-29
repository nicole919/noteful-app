import React from "react";
import { NavLink, Link } from "react-router-dom";
import Button from "../Button/Button";
import ApiContext from "../ApiContext";
import "./NoteListNav.css";

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  render() {
    const { folders = [] } = this.context;
    return (
      <div className="NoteListNav">
        <ul className="NoteListNav-list">
          {folders.map(folder => (
            <li key={folder.id}>
              <NavLink
                className="NoteListNav-folder-link"
                to={`/folder/${folder.id}`}
              >
                {folder.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div>
          <Button
            tag={Link}
            to="/add-folder"
            type="button"
            className="NoteListNav-add-folder-button"
            aria-label="add folder"
          >
            <br />+ Folder
          </Button>
        </div>
      </div>
    );
  }
}
