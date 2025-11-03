# Gego Analytics - GEO Analytics Dashboard

A Vue.js 3 demonstration of Gego's GEO (Generative Engine Optimization) analytics capabilities. This single-page application showcases how Gego tracks brand mentions and keyword visibility across multiple Large Language Models (LLMs).

## Features

- **Real-time Analytics**: Live connection status and data refresh
- **Brand Keyword Search**: Search for specific brands or keywords to analyze their mentions
- **Comprehensive Dashboard**: Overview cards showing total responses, prompts, LLMs, and schedules
- **Top Keywords Visualization**: Interactive ranking of most mentioned keywords
- **Response Trends**: Time-series chart showing daily response counts
- **LLM Performance**: Detailed statistics by LLM provider
- **Prompt Performance**: Analysis of prompt effectiveness across LLMs

## Prerequisites

1. **Gego Backend**: The Gego API server must be running on `http://localhost:8989`
2. **Node.js**: Version 20.19.0 or higher
3. **Data**: The Gego backend should have some prompts, LLMs, and response data

## Configuration

### Environment Variables

The demo uses environment variables to configure the API connection. Create a `.env` file in the project root:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8989/api/v1
```

**Note**: In Vite, environment variables must be prefixed with `VITE_` to be accessible in the browser.

### Default Configuration

If no environment variable is set, the demo defaults to `http://localhost:8989/api/v1`.

## Quick Start

1. **Start the Gego API server**:
   ```bash
   cd ../gego
   gego api --port 8989
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

## How It Works

### Connection Status
The dashboard automatically checks the connection to the Gego API server and displays the status in the header. If the connection fails, you'll see an error message with instructions.

### Brand Keyword Search
Use the search functionality to analyze specific brands or keywords:
- Enter any brand name (e.g., "Netflix", "Tesla", "Spotify")
- View total mentions, unique prompts, and LLM providers
- See breakdown by provider and timeline information

### Analytics Dashboard
The dashboard provides comprehensive insights:

- **Overview Cards**: Key metrics at a glance
- **Top Keywords**: Most mentioned keywords with visual ranking
- **Response Trends**: 30-day trend chart showing daily response counts
- **LLM Performance**: Detailed statistics for each LLM provider
- **Prompt Performance**: Analysis of prompt effectiveness

## API Integration

The demo uses the native `fetch` API to communicate with Gego's REST API endpoints:

- `GET /api/v1/health` - Health check
- `GET /api/v1/stats` - Comprehensive statistics
- `GET /api/v1/llms` - LLM provider information
- `GET /api/v1/prompts` - Prompt templates
- `POST /api/v1/search` - Keyword search functionality

## Technology Stack

- **Vue.js 3** - Reactive frontend framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **VueUse** - Vue composition utilities
- **date-fns** - Date manipulation utilities

## Use Cases Demonstrated

This demo showcases Gego's capabilities for:

1. **SEO/Marketing Research**: Track how brands are mentioned by AI assistants
2. **Competitive Analysis**: Compare keyword visibility across different LLMs
3. **Prompt Engineering**: Identify which prompts generate the most keyword mentions
4. **Trend Analysis**: Monitor changes in keyword mentions over time
5. **LLM Performance**: Compare response patterns across different providers

## Troubleshooting

### Connection Issues
- Ensure the Gego API server is running on port 8989
- Check that the API server is accessible from your browser
- Verify that CORS is properly configured in the Gego server

### No Data Displayed
- Make sure you have prompts, LLMs, and response data in your Gego instance
- Run some prompts using `gego run` to generate response data
- Check the browser console for any JavaScript errors

### Search Not Working
- Verify that the keyword exists in your response data
- Check that the search keyword is at least 2 characters long
- Ensure the Gego search service is properly configured

## Development

To modify or extend the demo:

1. **API Service**: Edit `src/services/api.ts` to modify API communication
2. **Components**: Update `src/App.vue` to change the dashboard layout
3. **Styling**: Modify Tailwind classes for visual changes
4. **Charts**: Update Chart.js configuration in the trends chart

## License

This demo is part of the Gego project and follows the same license terms.