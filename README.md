# 🎥 Guacamole Recording Player

A modern, containerized web application for playing session recordings created by [Apache Guacamole](https://guacamole.apache.org/). This project builds upon the archived [Glyptodon Enterprise Player](https://github.com/glyptodon/apache-guacamole-player) to provide enhanced functionality and easier deployment.

https://github.com/user-attachments/assets/d47abfb1-101e-4d23-bae5-432d4b1d2ec3

## 🚀 [Try it now!](https://thomas-mckanna.github.io/guacamole-recording-player/)

## ✨ Features

- **🎯 Local Recording Playback**: Play session recordings stored locally on your machine using the browser's File API
- **🌐 Remote Recording Support**: Access recordings from remote URLs through a simple query parameter interface
- **🐳 Containerized Deployment**: Easy deployment using Docker containers
- **📦 Static Web Application**: No server-side processing required
- **🎨 Modern Web Interface**: Clean, responsive design for optimal viewing experience

## 🚀 Quick Start

### Using Docker

```bash
docker run -p 8080:80 tmckanna940/guacamole-recording-player
```

The application will be available at `http://localhost:8080`

## 📖 Usage

### Local Recordings

1. Open the application in your web browser
2. Click "Choose File" to select a local recording file
3. The recording will begin playing automatically

### Remote Recordings

You can access remote recordings in two ways:

1. **Direct URL**:
   ```
   /remote?url=https://example.com/path/to/recording
   ```

2. **Base64 Encoded URL**:
   ```
   /remote?url=aHR0cHM6Ly9leGFtcGxlLmNvbS9wYXRoL3RvL3JlY29yZGluZw==
   ```

### ⚠️ Important Note on Remote Recordings

When accessing remote recordings, the server hosting the recording must have appropriate CORS (Cross-Origin Resource Sharing) headers configured. The following headers are required:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## 🛠️ Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/Thomas-McKanna/guacamole-recording-player.git

# Build the project
mvn package

# Build the Docker image
docker build -t guacamole-recording-player .
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original work by Glyptodon Enterprise Player team
- Apache Guacamole project for the recording format specification

