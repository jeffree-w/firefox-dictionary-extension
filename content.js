document.addEventListener('mouseup', function (event) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      // Create a tooltip to display the word meaning
      showTooltip(event.pageX, event.pageY, selectedText);
    }
  });
  
  function showTooltip(x, y, word) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
    tooltip.style.background = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.maxWidth = '300px';
    tooltip.style.zIndex = '9999';
    
    fetchMeaning(word).then((meaning) => {
      tooltip.innerHTML = meaning;
    }).catch(() => {
      tooltip.innerHTML = 'Definition not found';
    });
  
    document.body.appendChild(tooltip);
  
    // Hide tooltip when mouse is moved
    tooltip.addEventListener('mouseover', function() {
      tooltip.style.display = 'none';
    });
  }
  
  async function fetchMeaning(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await fetch(url);
    const data = await response.json();
    return data[0]?.meanings[0]?.definitions[0]?.definition || 'No definition available';
  }
  

  const getDefinition = async (word) => {
    const dir = word.slice(0, 1);
    const file = word.slice(0, 2);

    const url = `${baseURL}/${dir}/${file}.json`;

    const definitions = await fetch(url).then(res => res.json());

    return definitions[word];
}