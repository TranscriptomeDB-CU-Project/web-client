# Transcriptome DB Web Client

This web client serves as a user-friendly interface for querying, selecting, and downloading genetic samples from our database. You can explore the design of the website by visiting the [Figma project](https://www.figma.com/file/mxBhmxHTbRjoWCol12IGCs/Transcriptome-DB-Project-Design).

## Prerequisites

Before you start, ensure you have the following installed on your machine:

- Node.js
- Yarn

## Installation

1. Clone this repository to your local machine.

```bash
git clone https://github.com/TranscriptomeDB-CU-Project/web-client
```

2. Navigate into the project directory.

```bash
cd web-client
```

3. Install project dependencies using Yarn.

```bash
yarn
```

## Environment Variables

Prior to running or building the project, it's essential to create a new `.env` file by duplicating the `.env.example` file and completing the variables.

## Development

To start the development server, run the following command:

```bash
yarn dev
```

This will start the development server, and you should be able to access your application at http://localhost:3000.

## Testing

As some of the logic in the project is complex, it's crucial to have tests in place to ensure the code's correctness.

To run tests for the project, execute the following command:

```bash
yarn test
```
