<table>
  <tr>
    <td>
      <h1>Bocchi API</h1>
      <p>REST API built with NestJS that provides information about the anime <strong>Bocchi the Rock!</strong> by consuming data from <a href="https://jikan.moe/">Jikan API</a>.</p>
    </td>
    <td>
      <img src="./bocchi.jpg" width="300">
    </td>
  </tr>
</table>

## Technologies

- [NestJS](https://nestjs.com/) - Node.js Framework
- [TypeScript](https://www.typescriptlang.org/)
- [Axios](https://axios-http.com/) - HTTP Client

## Installation

```bash
git clone https://github.com/UlisesChoco/bocchi-api

cd .\bocchi-api\

npm install

npm run start
```

## Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/bocchi/season-one` | Season one information |
| GET | `/bocchi/season-two` | Season two information |
| GET | `/bocchi/special-episode` | Special episode information |
| GET | `/bocchi/movie` | Movie information |

## Responses

### Successful Response (200 OK)

All endpoints return the same JSON structure:

```json
{
  "data": {
    "images": {
      "jpg": {
        "image_url": "https://cdn.myanimelist.net/images/anime/1448/127956.jpg"
      }
    },
    "trailer": {
      "embed_url": "https://www.youtube.com/embed/example"
    },
    "title_english": "Bocchi the Rock!",
    "title_japanese": "ぼっち・ざ・ろっく！",
    "episodes": 12,
    "aired": {
      "from": "2022-10-09T00:00:00+00:00",
      "to": "2022-12-25T00:00:00+00:00"
    },
    "duration": "24 min per ep",
    "rating": "PG-13 - Teens 13 or older",
    "synopsis": "Hitori Gotoh, \"Bocchi-chan,\" is a girl who's so introverted...",
    "background": "Bocchi the Rock! adapts the first three volumes..."
  }
}
```

### Error Responses

#### 404 Not Found
When the anime does not exist in the external API.

```json
{
  "statusCode": 404,
  "message": "Anime with ID 99999 not found in external API"
}
```

#### 429 Too Many Requests
When the request limit to the external API is exceeded.

```json
{
  "statusCode": 429,
  "message": "Too many requests to external API. Please try again later."
}
```

#### 503 Service Unavailable
When the external API is unavailable or times out.

```json
{
  "statusCode": 503,
  "message": "External API is unavailable. Please try again later."
}
```

#### 500 Internal Server Error
When an unexpected error occurs on the server.

```json
{
  "statusCode": 500,
  "message": "An unexpected error occurred while fetching anime data"
}
```

## Project Structure

```
src/
├── api/
│   ├── interfaces/
│   │   ├── anime.interface.ts
│   │   ├── image.interface.ts
│   │   ├── trailer.interface.ts
│   │   └── aired.interface.ts
│   ├── mapper/
│   │   └── anime.mapper.ts
│   ├── bocchi.controller.ts
│   ├── bocchi.service.ts
│   └── bocchi.module.ts
├── app.module.ts
└── main.ts
```

## External API

This API consumes data from [Jikan API v4](https://docs.api.jikan.moe/), an unofficial MyAnimeList API.

### Anime IDs Used

| Content | MAL ID |
|-----------|--------|
| Season 1 | 47917 |
| Season 2 | 61006 |
| Special Episode | 59806 |
| Movie | 55357 |
