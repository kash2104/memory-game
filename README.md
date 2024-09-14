# Memory Match

The Memory Game is a classic card-matching game built using React.js, designed to test and enhance players' memory skills. The game features an engaging interface, smooth animations, and keeps track of the player's score. The project showcases modern web development techniques and state management using Redux.

## Features

- **Game Play**: Players match pairs of cards to complete the game. The game keeps track of the number of turns taken.
- **Leaderboard**: Displays the top scorers.
- **High Score**: Celebrates when the player achieves a new high score with confetti animation.
- **Responsive Design**: Optimized for various screen sizes, including mobile devices.
- **User Authentication**: Secure login and signup functionalities with token-based authentication.

## Tech Stack

**React.js**: For building the user interface and managing component state. \
**Tailwind CSS**: For styling and responsive design. \
**Redux:** For state management, including user authentication and game state. \
**Confetti:** To celebrate high scores. \
**Node.js:** For backend services. \
**Express.js:** For creating the API endpoints. \
**MongoDB:** For storing game scores and user data. \
**Axios:** For making API requests.

## Playgroud

![PlayGround](https://github.com/user-attachments/assets/a2694b82-7278-4519-9a07-0b329bd5161b)

## Leader Board

![Leader Board](https://github.com/user-attachments/assets/3880e2c0-c8da-4074-92b7-60c8aec55cf5)

## Installation

Clone the repository

```bash
  git clone https://github.com/kash2104/memory-game.git
```

Install dependencies

```bash
  cd memory-game
  npm install
```

Navigate to server directory

```bash
  cd ./server
  npm install
```

## Environment Variables

Setting up environment variables for frontend

```bash
  cd memory-game
```

Create a .env file

```bash
  REACT_APP_BASE_URL=your_backend_url
```

Setting up environment variables for backend

```bash
  cd ./server
```

Create a .env file

```bash
  MONGODB_URL=your_mongodb_url
  JWT_SECRET=your_jwt_secret
  PORT=port_number_to_run_backend
```

## Run Locally

Start the server

```bash
  npm run dev
```

## API Reference

#### Get all scores

```http
  GET /api/v1/score/getAllScores
```

| Description                          |
| :----------------------------------- |
| Get all the game scores of the user. |

#### Get highest score

```http
  GET /api/v1/score/getHighestScore
```

| Description                        |
| :--------------------------------- |
| Get the highest score of the user. |

#### Update score after finishing the game

```http
  GET /api/v1/score/updateScore
```

| Description                                            |
| :----------------------------------------------------- |
| Adds the score and updates highest score if applicable |

#### Leader Board

```http
  GET /api/v1/score/getLeaderboard
```

| Description                         |
| :---------------------------------- |
| Get the top 10 scorers of the game. |
