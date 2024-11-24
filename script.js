document.getElementById('csvFileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            displayCSV(content);
        };
        reader.readAsText(file);
    }
}

function displayCSV(csvContent) {
    const rows = csvContent.split("\n");
    const table = document.getElementById('csvTable');
    table.innerHTML = '';

    rows.forEach((row, rowIndex) => {
        const cells = parseCSV(row);
        const tableRow = document.createElement('tr');

        cells.forEach((cell, cellIndex) => {
            const tableCell = document.createElement(rowIndex === 0 ? 'th' : 'td');
            if (rowIndex > 0) {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = cell;
                input.addEventListener('input', () => updateCSVData(rowIndex, cellIndex, input.value));
                tableCell.appendChild(input);

                const translateButton = document.createElement('button');
                translateButton.textContent = 'Translate';
                translateButton.addEventListener('click', () => {
                    if (input.value.trim() === '') {
                        alert('Невозможно перевести пустое значение!');
                        return;
                    }
                    translateText(input, rowIndex, cellIndex);
                });
                tableCell.appendChild(translateButton);
            } else {
                tableCell.textContent = cell.trim();
            }
            tableRow.appendChild(tableCell);
        });

        table.appendChild(tableRow);
    });

    initializeCSVData(rows);
}

let csvData = [];

function initializeCSVData(rows) {
    csvData = rows.map(row => parseCSV(row));
}

function updateCSVData(rowIndex, cellIndex, value) {
    csvData[rowIndex][cellIndex] = value;
}

function downloadCSV() {
    let csvContent = csvData.map(row => {
        if (row.length > 0) {
            const lastIndex = row.length - 1;
            const lastValue = row[lastIndex];

            if (!lastValue.startsWith('"') || !lastValue.endsWith('"')) {
                row[lastIndex] = `"${lastValue}"`;
            }
        }
        return row.join(",");
    }).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Localization.txt';
    link.click();
}


function parseCSV(csvLine) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < csvLine.length; i++) {
        const char = csvLine[i];

        if (char === '"' && (i === 0 || csvLine[i - 1] !== '\\')) {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current.trim());

    return result;
}

function translateText(input, rowIndex, cellIndex) {
    const originalText = input.value;
    const selectedLanguage = document.getElementById('languageSelect').value;
    const modelSelect = document.getElementById('modelSelect').value;
    const key = document.getElementById('keyInput').value;
    const customPrompt = document.getElementById('promptInput').value;

    if (!key.trim()) {
        alert('Key is required for translation.');
        return;
    }

    const translateButton = input.parentNode.querySelector('button');
    translateButton.disabled = true;

    fetch('translate.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            text: originalText, 
            language: selectedLanguage,
            model: modelSelect,
            key: key,
            prompt: customPrompt
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.translatedText) {
            input.value = data.translatedText;
            updateCSVData(rowIndex, cellIndex, data.translatedText);
        } else {
            alert('Translation failed');
        }
    })
    .catch(error => console.error('Error:', error))
    .finally(() => {
        translateButton.disabled = false;
    });
}

