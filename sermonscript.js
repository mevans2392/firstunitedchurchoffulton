document.addEventListener('DOMContentLoaded', () => {
  fetch('embed.json')
    .then(res => res.json())
    .then(data => {
      if (!data || data.length === 0) return;

      const liveContainer = document.getElementById('liveStreamContainer');
      const pastContainer = document.getElementById('pastStreamsContainer');

      // Function to load embed HTML into the main video container
      function loadVideoIntoMain(embedHTML) {
        liveContainer.innerHTML = embedHTML;
        const iframe = liveContainer.querySelector('iframe');
        if (iframe) {
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.maxWidth = "720px";
          iframe.style.maxHeight = "405px";
          iframe.style.display = "block";
          iframe.style.margin = "0 auto";
          iframe.style.border = "none";
        }
      }

      // Load the first (latest) video
      loadVideoIntoMain(data[0].embed);

      // Create clickable previews for the rest
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const previewWrapper = document.createElement('div');
        previewWrapper.innerHTML = item.embed;

        const previewIframe = previewWrapper.querySelector('iframe');
        if (previewIframe) {
          previewIframe.style.width = "100%";
          previewIframe.style.height = "100%";
          previewIframe.style.maxWidth = "400px";
          previewIframe.style.display = "block";
          previewIframe.style.margin = "20px auto";
          previewIframe.style.cursor = "pointer";
          previewIframe.style.border = "none";

          // When clicked, show this video in the top section
        previewWrapper.style.cursor = "pointer"; // make it look clickable
        previewWrapper.addEventListener('click', () => {
        loadVideoIntoMain(item.embed);
        console.log('clicked');
        });

          pastContainer.appendChild(previewWrapper);
        }
      }
    });
});

