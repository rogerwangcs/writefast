const pagesKey = "pages";

export default class LocalStorageHandler {
  constructor() {}

  static initializeStorage = () => {
    if (!localStorage.hasOwnProperty(pagesKey)) {
      localStorage.setItem(pagesKey, JSON.stringify([]));
    }
  };

  static getPages = () => {
    const storedPages = localStorage.getItem(pagesKey);
    return JSON.parse(storedPages);
  };

  static storePage = newPage => {
    let newPages = LocalStorageHandler.getPages().slice();
    newPages.push(newPage);
    localStorage.setItem(pagesKey, JSON.stringify(newPages));
  };
}
