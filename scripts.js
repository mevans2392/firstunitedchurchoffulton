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

    fetch('livestreams.json')
      .then(res => res.json())
      .then(data => {
        const latest = data[0];
        const container = document.getElementById('liveStreamContainer');
        container.innerHTML = latest.embed;

        const iframe = container.querySelector('iframe');
        if(iframe) {
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.maxWidth = "720px";
          iframe.style.maxheight = "500px";
        }
      });

      const goalAmount = 50000;
      currentAmount = 0;

      fetch('amount.json')
        .then(res => res.json())
        .then(data => {
          currentAmount = data.amount;
          updateProgressBar(currentAmount, goalAmount);
        });

      function updateProgressBar(current, goal) {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');

        const percent = Math.min((current / goal) * 100, 100);
        progressBar.style.width = percent + '%';
        progressText.textContent = `$${current.toLocaleString()} raised of $${goal.toLocaleString()} goal (${percent.toFixed(1)}%)`;
      }

});