import React from "react";

export default React.createContext({
  notes: [],
  folders: [],
  toggle: false,
  API: "http://localhost:9090",
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
  deleteFolder: () => {},
  toggleErros: () => {},
  throwError: () => {},
  back: () => {}
});
