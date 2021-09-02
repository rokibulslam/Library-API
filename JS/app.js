// Connect With DOM 
const inputText = document.getElementById('input-value');
const spinner = document.getElementById('spinner')
const errorDiv = document.getElementById('error')
const totalItem = document.getElementById('not-found');
const parentDiv = document.getElementById('search-result');

// get input value and fetch data
const searchField = () => {
    spinner.classList.remove("d-none")
    const inptuValue = inputText.value;
    // Input Error Handling
    if (inptuValue === "") {
        parentDiv.textContent = '';
        totalItem.innerHTML = '';
        errorDiv.innerText = "Search field Cannot be empty."
        spinner.classList.add("d-none")
        return;
    }
    // Clear 
    errorDiv.innerText = "";
    inputText.value = "";
    totalItem.innerHTML = '';
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
    const getItemNumber = document.createElement('div')
    getItemNumber.innerHTML = `<h6 class= "text-dark text-center">Number of Books Found : ${books.numFound}</h5>`
    totalItem.appendChild(getItemNumber);
    // Get first 30 books details to display website 
    books.docs.slice(0, 29).forEach((book) => {
        // Undefined error handle 
        const imgId = book.cover_i === undefined ? '8236407' : book.cover_i;
        const author = book.author_name === undefined ? 'Not Found' : book.author_name;
        const publishedDate = book.first_publish_year === undefined ? 'Not Found' : book.first_publish_year;
        const publisher = book.publisher === undefined ? 'Not Found' : book.publisher;
        // Push dynamic HTML 
        const div = document.createElement('div');
        div.innerHTML = `
            <div class = "border border-success dynamic-result card m-1 my-4 shadow-lg p-2"
            style = "width: 18rem;" >
                <img src="https://covers.openlibrary.org/b/id/${imgId}-M.jpg" class="card-img-top img-fluid" alt="...">
                <div class="card-body text-black">
                    <h5 class="card-title">Book's Name: ${book.title}</h5>
                    <p class="card-text m-1"><b>Author-Name:</b> ${author}</p>
                    <p class="card-text m-1"><b>1st Published Year:</b> ${publishedDate}</p>
                    <p class="card-text m-1"><b>Publisher:</b> ${publisher}</p>

                </div>
            </div>
        `;
        parentDiv.appendChild(div)
    })
}
