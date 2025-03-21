document.addEventListener('dblclick', function (event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
      showTooltip(event.pageX, event.pageY, selectedText);
  }
});

  
function showTooltip(x, y, word) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip'; 
  console.log(word)

  Object.assign(tooltip.style, {
    position: 'absolute',
    left: `${x + 10}px`,
    top: `${y + 10}px`,
    background: '#fff',
    color: '#000',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid black',
    maxWidth: '300px',
    zIndex: '9999',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
    fontSize: '14px'
});

  getDefinition(word).then((meaning) => {
      tooltip.innerHTML = meaning;
  }).catch(() => {
      tooltip.innerHTML = 'Definition not found';
  });

  document.body.appendChild(tooltip);

  document.addEventListener('mousemove', () => {
    if (tooltip) {
        tooltip.remove();
    }
  });
}

  const getDefinition = async (word) => {
    const dir = word.slice(0, 1);
    const file = word.slice(0, 2);

    const url = `${api}/${dir}/${file}.json`;

    const definitions = await fetch(url).then(res => res.json());

    return definitions[word];
}