document.getElementById("scrape-button").addEventListener("click", function () {
    // Get the value of the input field
    UniName = document.getElementById("university-name").value;
    let url = `http://localhost:3000/scraper?name=${UniName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let output = '<ul>';
            data.forEach(school => {
                output += `<li>Name: ${school.name}, Rating: ${school.rating}</li>`;
            });
            output += '</ul>';
            document.getElementById('scraper-results').innerHTML = output;
        })
        .catch(error => console.log(error));
});