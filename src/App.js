import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import NoteListNav from "./NoteListNav/NoteListNav";
import NotePageNav from "./NotePageNav/NotePageNav";
import NoteListMain from "./NoteListMain/NoteListMain";
import NotePageMain from "./NotePageMain/NotePageMain";
import AddFolder from "./AddFolder";
import AddNote from "./AddNote";
import ApiContext from "./ApiContext";
import config from "./config";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
      errorBoundaryKey: 0
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  };

  handleAddFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  handleAddNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  handleBackButton = () => {
    this.setState(
      prevState => ({
        errorBoundaryKey: prevState.errorBoundaryKey + 1
      }),
      console.clear()
    );
  };

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        <Route path="/add-folder" component={NotePageNav} />
        <Route path="/add-note" component={NotePageNav} />
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map(path => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <ErrorBoundary key={this.state.errorBoundaryKey}>
          <Route path="/note/:noteId" component={NotePageMain} />
        </ErrorBoundary>
        <Route path="/add-note" component={AddNote} />
        <Route path="/add-folder" component={AddFolder} />
      </>
    );
  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      back: this.handleBackButton,
      toggle: this.state.toggle,
      toggleErrors: this.handleErrorToggle
    };
    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <nav className="App-nav">{this.renderNavRoutes()}</nav>
          <header className="App-header">
            <h1>
              <Link to="/">Noteful</Link>{" "}
            </h1>
          </header>
          <main className="App-main">{this.renderMainRoutes()}</main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
