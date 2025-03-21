# AI PPT Generator

## Description

This application generates PowerPoint presentations from user-provided prompts using AI. It uses OpenRouter for content generation and siliconflow.cn for image generation.

## Installation

1.  Install Docker Desktop.
2.  Install Docker Compose. On macOS, this is typically included with Docker Desktop. If not, you can install it separately using Homebrew: `brew install docker-compose`.
3.  Clone this repository.
4.  Navigate to the project directory.
5.  Create a `.env` file with your OpenRouter API key:

    ```
    OPENROUTER_API_KEY=your_api_key
    ```
5.  Run `docker-compose up --build` to build and start the application. If you encounter a "port already in use" error, you can change the port in the `docker-compose.yml` file.

## Usage

1.  Open your browser and navigate to `http://localhost:5001`.
2.  Enter your prompt, OpenRouter API key, and select the LLM.
3.  Click the "Generate PPT" button.
4.  A download link will appear with the generated PowerPoint presentation.
