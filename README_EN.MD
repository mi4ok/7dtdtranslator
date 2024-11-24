# 7 Days to Die Translator

A web-based tool for translating game content for 7 Days to Die using various AI models. This tool allows for easy TXT file handling, batch translation, and customizable translation prompts.

## 🌟 Features

- Support for multiple languages (Russian, English, Spanish, French)
- Integration with various AI models (GPT-4, GPT-3.5, etc.)
- Custom prompt templates with language variable support
- Interactive TXT file editor
- Real-time translation of individual cells
- Preserves special game formatting tags
- Responsive design for desktop and mobile devices
- Easy export of translated content

## 📋 Requirements

- Web server with PHP support
- Modern web browser
- OpenAI API key
- Internet connection

## 🚀 Installation

1. Clone or download the repository to your web server directory
2. Ensure your web server has PHP enabled
3. Set appropriate permissions for the files:
   ```bash
   chmod 644 *.html *.css *.js
   chmod 755 *.php
   ```

## 📁 Project Structure

```
7d2d-translator/
├── index.html      # Main application interface
├── styles.css      # CSS styles
├── script.js       # JavaScript functionality
└── translate.php   # PHP backend for API interactions
```

## 💻 Usage

1. Open the application in your web browser
2. Configure the translation settings:
   - Select target language
   - Choose AI model
   - Enter your OpenAI API key
   - (Optional) Customize the translation prompt
3. Upload your TXT file
4. Use the "Translate" buttons next to each cell to translate individual entries
5. Click the floating save button (💾) to download the translated file

## 🔧 Configuration Options

### Language Selection
- Russian (ru)
- English (en)
- Spanish (es)
- French (fr)

### Available Models
- GPT-4O
- GPT-4O Mini
- GPT-4 Turbo
- O1 Preview
- O1 Mini
- GPT-3.5 Turbo

### Custom Prompts
You can customize the translation prompt using the `{language}` variable. Example:
```
Translate the following text to {language}. Context: 7 days to die game content...
```

## ⚠️ Important Notes

- The tool preserves special formatting tags like `[(((ColourModded)))]`
- Always verify translations before using them in-game
- Large files may require more processing time
- Keep your API key secure and never share it publicly
- The tool works best with properly formatted TXT files from the game

## 🛠️ Technical Details

### File Format Support
- Accepts .txt files
- CSV structure with comma-separated values
- Supports quoted text fields
- Preserves game-specific formatting tags

### Translation Process
1. File is loaded and parsed into an editable table
2. Each cell can be individually translated
3. Translation requests are processed through OpenAI's API
4. Formatted content is preserved during translation
5. Results can be downloaded as a properly formatted file

### Error Handling
- Validates API key presence
- Checks for empty translation content
- Preserves original content if translation fails
- Provides visual feedback for translation status

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## 📝 License

This project is available for free use. Please provide attribution if you use or modify it.

## 🔍 Troubleshooting

### Common Issues
1. **Translation not working**
   - Verify your API key is correct
   - Check your internet connection
   - Ensure the text isn't empty

2. **File not loading**
   - Verify file format (.txt)
   - Check file permissions
   - Ensure proper CSV formatting

3. **Download not working**
   - Enable JavaScript in your browser
   - Check browser download permissions
   - Verify file system write permissions

For additional support, please create an issue in the repository.