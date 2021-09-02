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
        parentDiv.textContent = '';
        itemFound.innerHTML = '';
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
    // Create dynamic div for count total search item 
    const gotItemNumber = document.createElement('div')
    gotItemNumber.innerHTML = `<h6 class= "text-dark text-center">Number of Books Found : ${books.numFound}</h5>`
    itemFound.appendChild(gotItemNumber);
    // Get single book details to display website 
    books.docs.forEach((book) => {
        // console.log(book)
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card m-3 shadow-lg p-2" style="width: 18rem;">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title}</h5>
                    <p class="card-text m-1"><b>Author-Name:</b> ${book.author_name}</p>
                    <p class="card-text m-1"><b>1st Published:</b> ${book.first_publish_year}</p>
                    <p class="card-text m-1"><b>Publisher:</b> ${book.publisher}</p>

                </div>
            </div>
        `;
        parentDiv.appendChild(div)
    })
}
