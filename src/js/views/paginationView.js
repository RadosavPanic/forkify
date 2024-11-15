import View from "./View.js";
import { PAGINATION_ACTION_TYPES } from "../helpers.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1)
      return this._generateMarkupButton(
        PAGINATION_ACTION_TYPES.FIRST_PAGE,
        currentPage
      );

    // Last page
    if (currentPage === numPages && numPages > 1)
      return this._generateMarkupButton(
        PAGINATION_ACTION_TYPES.LAST_PAGE,
        currentPage
      );

    // Other page
    if (currentPage < numPages)
      return this._generateMarkupButton(
        PAGINATION_ACTION_TYPES.OTHER_PAGE,
        currentPage
      );

    // Page 1, and there are no other pages
    return "";
  }

  _generateMarkupButton(scenario, currentPage) {
    function generatePreviousButton() {
      const pageNum = currentPage - 1;

      return `
        <button class="btn--inline pagination__btn--prev" data-goto="${pageNum}">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${pageNum}</span>
        </button>       
      `;
    }

    function generateNextButton() {
      const pageNum = currentPage + 1;

      return `
        <button class="btn--inline pagination__btn--next" data-goto="${pageNum}">
          <span>Page ${pageNum}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    }

    if (scenario === PAGINATION_ACTION_TYPES.FIRST_PAGE)
      return generateNextButton();

    if (scenario === PAGINATION_ACTION_TYPES.LAST_PAGE)
      return generatePreviousButton();

    if (scenario === PAGINATION_ACTION_TYPES.OTHER_PAGE)
      return generatePreviousButton().concat(generateNextButton());
  }
}

export default new PaginationView();
