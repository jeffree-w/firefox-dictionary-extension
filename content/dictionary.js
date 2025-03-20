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
    tooltip.style.background = 'rgb(255, 255, 255)';
    tooltip.style.color = 'black';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.stroke = "black" //oversee
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
  
  const getDefinition = async (word) => {
    const dir = word.slice(0, 1);
    const file = word.slice(0, 2);

    const url = `${api}/${dir}/${file}.json`;

    const definitions = await fetch(url).then(res => res.json());

    return definitions[word];
}