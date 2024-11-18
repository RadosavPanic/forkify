import View from "./View.js";
import previewView from "./previewView.js";
import icons from "url:../../img/icons.svg";

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a recipe and bookmark it first.";
  _message = "";

  _generateMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }

  // Polymorphism extended from View class, error icon is changed
  renderError(message = this._errorMessage) {
    const markup = `
       <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-bookmarked"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new BookmarksView();
