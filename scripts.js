document.addEventListener('DOMContentLoaded', () => {
    const chapVerseEl = document.getElementById('chapVerse');
    const scriptureEl = document.getElementById('scripture');

    fetch('scriptures.json')
      .then(response => {
        if(!response.ok) {
            throw new Error('Failed to fetch scriptures');
        }
        return response.json();
      })
      .then(data => {
        if(data.length === 0) {
            chapVerseEl.textContent = "No scriptures available";
            return;
        }

        const day = new Date().getDate();
        const index = (day - 1) % data.length;
        const todayVerse = data[index];

        chapVerseEl.textContent = todayVerse.reference;
        scriptureEl.textContent = todayVerse.verse;
      })
      .catch(error => {
        console.error('Error loading scripture:', error);
        chapVerseEl.textContent = "Oops, something went wrong.";
      });
});