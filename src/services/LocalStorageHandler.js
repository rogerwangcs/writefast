const pagesKey = "pages";

export default class LocalStorageHandler {
  constructor() {}

  static generateID = () => {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

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
    const withIDPage = Object.assign(
      { _id: LocalStorageHandler.generateID() },
      newPage
    );
    let pages = LocalStorageHandler.getPages().slice();
    pages.push(withIDPage);
    localStorage.setItem(pagesKey, JSON.stringify(pages));
  };

  static deletePage = pageID => {
    let pages = LocalStorageHandler.getPages().slice();
    pages = pages.filter(page => page._id !== pageID);
    localStorage.setItem(pagesKey, JSON.stringify(pages));
  };
}
