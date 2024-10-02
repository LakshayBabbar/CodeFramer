# CodeFramer

CodeFramer is a versatile code editor built to enhance your coding experience with its intuitive interface and powerful features.

## Features

- **Modern Interface:** Enjoy a clean and intuitive user interface designed for productivity.
- **Enhanced Performance:** Experience faster coding and editing with optimized performance.
- **Resource Efficient:** CodeFramer operates efficiently, minimizing system resource consumption.
- **AI Chatbot Support:** Get intelligent assistance and real-time support for your coding queries.
- **Syntax Highlighting:** Benefit from accurate syntax highlighting across various programming languages.
- **Autocomplete:** Speed up your coding process with intelligent autocomplete suggestions.

## Tech Stack

- **Frontend:** Next.js 14
- **Backend** Next.js 14 API Routes, flask
- **Database:** MongoDB
- **Authentication:** Jose (JWT)
- **Styling:** Tailwind CSS, ShadCn, Aceternity UI
- **Other Libraries:** React Query, Redux Toolkit, Monaco Editor, React-Markdown, Bcryptjs, Mongoose

## Installation

### Prerequisites

- Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/lakshaybabbar/codeframer.git
   ```

2. Navigate to the project directory:
   ```bash
   cd codeframer
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure Environment Variables:

   - `ACCESS_SECRET_KEY`: User-defined access secret key for JWT
   - `URI`: MongoDB URI address
   - `BASE_URL`: Hosting address
   - `NEXT_PUBLIC_AI_API`: Google AI Studio API
   - `COMPILER_URL`: Path of python compiler
   - `ACCESS_KEY`: User-defined access secret key for compilers

5. Start docker container for compiling python code:

   ```bash
   cd compiler/python
   docker build -t pycompiler .
   docker run -p 5000:5000 --name compiler pycompiler
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Contributing

We welcome contributions from the community! If you have ideas for improvements or bug fixes, please feel free to submit a pull request.

## Bug Reports

If you encounter any bugs or issues while using CodeFramer, please open an issue on GitHub with detailed information about the problem.

## License

CodeFramer is licensed under the MIT License.
