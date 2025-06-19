let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    let {
        title,
        link,
        description
    } = result;
    // Creating Result Item [Div container]
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");

    searchResultsEl.appendChild(resultItemEl);

    // Creating Title Element [Anchor Title]
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";

    resultItemEl.appendChild(resultTitleEl);

    // Creating Break Element [Title Break]
    let titleBreakEl = document.createElement("br");

    resultItemEl.appendChild(titleBreakEl);

    // Creating URl Element [Anchor URL]
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;

    resultItemEl.appendChild(urlEl);

    // Creating Break Element [Line Break]
    let lineBreakEl = document.createElement("br");

    resultItemEl.appendChild(lineBreakEl);

    // Creating Description Element [Paragragh]
    let descripitionEl = document.createElement("p");
    descripitionEl.classList.add("line-description");
    descripitionEl.textContent = description;

    resultItemEl.appendChild(descripitionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    /* 
    //to get only one result instead of many more..
    let result = searchResults[0];
    createAndAppendSearchResults(result);
    */
    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }

}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = ""; // it will help to get the new result as u wish
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        // console.log(searchInput);
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                // console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia)