# CodeFramer

CodeFramer is a versatile code editor designed to enhance your coding experience with its intuitive interface and powerful features. Built with a focus on performance and resource efficiency, CodeFramer is perfect for developers looking for a reliable coding platform.

<img src="./assets/arch.png" alt="CodeFramer Architecture" width="600px">

## Features

- **Isolated Execution Environment:** Each code execution request creates a new isolated container. This ensures that code runs securely and independently, providing an output while maintaining system integrity. Containers are deleted automatically after execution to optimize resource usage.
- **Resource Efficient:** CodeFramer operates efficiently, minimizing system resource consumption to ensure smooth performance.
- **Autocomplete:** Speed up your coding process with intelligent autocomplete suggestions that help you write code faster.
- **Syntax Highlighting:** Benefit from accurate syntax highlighting across a variety of programming languages, improving code readability.
- **AI Chatbot Support:** Get intelligent assistance and real-time support for your coding queries through our integrated AI chatbot.
- **Modern Interface:** Enjoy a clean and intuitive user interface that promotes productivity.
- **Enhanced Performance:** Experience fast coding and editing with optimized performance, allowing for seamless multitasking.

## Tech Stack

- **Frontend:** Next.js 14
- **Backend:** Next.js 14 API Routes, Node.js, Express
- **Database:** MongoDB
- **Tools:** Docker
- **Authentication:** JSON Web Tokens (JWT)
- **Styling:** Tailwind CSS, ShadCN, Aceternity UI
- **Other Libraries:** React Query, Monaco Editor

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/en/download/)

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/lakshaybabbar/codeframer.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd codeframer/next-app
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Configure Environment Variables:**

    Create a `.env.local` file in the nextjs application and add the following variables:

    - `ACCESS_SECRET_KEY`: Your defined access secret key.
    - `URI`: MongoDB URI address.
    - `BASE_URL`: Hosting address.
    - `CODE_AI_API`: Google AI Studio API key for editor in-built ai.
    - `GENERAL_AI_API`: Google AI Studio API key for chat.
    - `COMPILER_URL`: Path to the compiler server.

    Create a `.env` file in the compiler server and add the following variables:

    - `ACCESS_SECRET_KEY`: Your defined access secret key. Note: Same as nextjs appication.
    - `ORIGIN`: Allowed origin for cors.

5.  **Start the Compiler Server for code execution in an isolated environment:**

    ```bash
    cd compiler-server
    bash ./entrypoint.sh
    ```

6.  **Start the development server:**

    ```bash
    cd ../next-app
    npm start
    ```

## Bug Reports

If you encounter any bugs or issues while using CodeFramer, please open an issue on GitHub with detailed information about the problem.

## License

CodeFramer is licensed under the MIT License.
