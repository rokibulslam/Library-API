// Connect With DOM 
const inputText = document.getElementById('input-value');
const spinner = document.getElementById('spinner')
const errorDiv = document.getElementById('error')
const itemFound = document.getElementById('not-found');
const parentDiv = document.getElementById('search-result');
// get input value and fetch data
const searchField = () => {
    spinner.classList.remove("d-none")
    const inptuValue = inputText.value;
    // Input Error Handling
    if (inptuValue === "") {
        errorDiv.innerText = "Search field Cannot be empty."
         spinner.classList.add("d-none")
        return;
    }
    // Clear 
    errorDiv.innerText = "";
    inputText.value = "";
    itemFound.innerHTML = '';
    parentDiv.textContent = '';
    // Get Api 
    fetch(`https://openlibrary.org/search.json?q=${inptuValue}`)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
}

// Display Search Result
const displaySearchResult = books => {
    spinner.classList.add("d-none")
    if (books.numFound === 0) {
        errorDiv.innerText = 'Books Not Found'
        return;
    }
    // itemFound.innerHTML = '';
    // Create dynamic div for count total search item 
    const gotItemNumber = document.createElement('div')
    gotItemNumber.innerHTML = `<h4 class= "text-white">Number of Books Found : ${books.numFound}</h5>`
    itemFound.appendChild(gotItemNumber);
    // parentDiv.textContent = '';
    // Get single book details to display website 
    books.docs.forEach((book) => {
        // console.log(book)
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card m-3 shadow" style="width: 18rem;">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Books Name: ${book.title}</h5>
                    <h6 class="card-text">Author-Name: ${book.author_name}</h6>
                    <h6 class="card-text">1st Published: ${book.first_publish_year}</h6>
                    <h6 class="card-text">Publisher: ${book.publisher}</h6>

                </div>
            </div>
        `;
        parentDiv.appendChild(div)
    })
}
