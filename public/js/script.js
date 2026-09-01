(() => {
  "use strict";

  // 1. Bootstrap custom form validation
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//  Collapse on Scroll & Click
const searchContainer = document.getElementById("expandedSearchContainer");
const compactPill = document.getElementById("compactSearchPill");
const categoryTabs = document.getElementById("navCategoryTabs");

if (searchContainer && compactPill && categoryTabs) {
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      collapseSearch();
    } else {
      expandSearch();
    }
  });

 
  compactPill.addEventListener("click", (e) => {
    e.stopPropagation();
    expandSearch();
  });

  function collapseSearch() {
    searchContainer.classList.add("collapsed");
    categoryTabs.classList.add("d-none");
    compactPill.classList.remove("d-none");
  }

  function expandSearch() {
    searchContainer.classList.remove("collapsed");
    categoryTabs.classList.remove("d-none");
    compactPill.classList.add("d-none");
  }
}