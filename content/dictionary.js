const getDefinition = async (word) => {
  const dir = word.slice(0, 1);
  const file = word.slice(0, 2);

  const url = `${baseURL}/${dir}/${file}.json`;

  const definitions = await fetch(url).then(res => res.json());

  return definitions[word];
}

/*const getDefinition = async (word) => {
  const dir = word.slice(0, 1);
  const file = `${dir}.json`;
  const filePath = browser.runtime.getURL(`api/${dir}/${file}`);

  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error('File not found');
    }

    const data = await response.json();

    if (data[word]) {
      const definition = data[word];
      const wordDetails = [];

      definition.etymologies.forEach((etymology) => {
        etymology.partsOfSpeech.forEach((pos) => {
          pos.senses.forEach((sense) => {
            wordDetails.push({
              partOfSpeech: pos.partOfSpeech,
              sense: sense.sense
            });
          });
        });
      });

      return {
        word: definition.word,
        details: wordDetails
      };
    } else {
      throw new Error('Definition not found');
    }
  } catch (error) {
    console.error('Error fetching definition:', error);
    return {
      word: word,
      details: []
    };
  }
};*/



document.addEventListener('dblclick', function (event) {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 1) {
      showTooltip(event.pageX, event.pageY, selectedText);
  }
});

function showTooltip(x, y, word) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip'; 

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
    const { word: wordName, details } = meaning;

    let tooltipContent = `<strong>${wordName}</strong><br><br>`;

    details.forEach((detail) => {
      tooltipContent += `<strong>${detail.partOfSpeech}</strong>: ${detail.sense}<br>`;
    });

    tooltip.innerHTML = tooltipContent;
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