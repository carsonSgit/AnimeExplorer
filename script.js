function searchAnime() {
    // Get the value from the text field
    const searchTerm = document.getElementById('searchInput').value;

    // Construct the API URL
    const apiUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchTerm)}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract relevant information from the API response
            const animeData = data.data[0];
            const title = animeData?.titles[0]?.title || 'Title not found';
            const score = animeData?.score || 'Score not available';
            const scoredBy = animeData?.scored_by || 'Number of scores not available';
            const popularity = animeData?.popularity || 'Popularity not available';
            const imageUrl = animeData?.images?.jpg?.image_url || 'Image not found';
            const synopsis = animeData?.synopsis || 'Synopsis not available';

            // Display the information in the result div
            const resultHtml = `
            <div class="anime-info">
            <div>
                <h2>${title}</h2>
                <img src="${imageUrl}" alt="Anime Cover">
                <p>Rated: ${score}/10</p>
                <p>Scored by: ${scoredBy} users</p>
                <p>Popularity: ${popularity}</p>
            </div>
            <div>
                <p id="synopsis">${synopsis}</p>
            </div>
            </div>
            `;

            document.getElementById('result').innerHTML = resultHtml;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('result').innerHTML = 'Error fetching data. Please try again.';
        });
}
