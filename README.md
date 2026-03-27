# Dhansarthi - Cryptocurrency Market Dashboard

A clean, real-time cryptocurrency market dashboard built with React. Track live prices, find trending coins, and get detailed analytics all from one place.

## Features

What you can do with this dashboard:

- **Live Market Data** - Real-time crypto prices and market info pulled from CoinGecko
- **Interactive Charts** - Beautiful, responsive charts that show price history over time
- **Live Price Streaming** - Watch prices update in real-time using Binance's WebSocket
- **Trending Coins** - Automatically see what coins are trending right now
- **Top Gainers** - Check which coins performed best in the last 24 hours
- **User Accounts** - Secure login and signup with Supabase
- **Coin Details Pages** - Deep dive into individual coins with market cap, supply, ATH/ATL, and descriptions
- **Browse All Coins** - Pagination lets you scroll through the top 250+ cryptocurrencies
- **Mobile Friendly** - Works great on desktop and mobile with a dark theme
- **Flexible Charts** - Switch between live and historical price data with different time ranges

## Tech Stack

Here's what powers this dashboard:

### Frontend Core

- **React 19.2.0** - The latest version with better performance and developer tools
- **TypeScript 5.9** - Adds type safety to catch bugs before they happen
- **Vite 7.3** - Super fast build tool that reloads instantly while you develop

### Styling and UI

- **Tailwind CSS 4.2** - Write styles directly in your components
- **Recharts 3.7** - React-based charting library for those smooth price graphs
- **React Icons 5.5** - Icon library with thousands of useful icons

### Data and State

- **Redux Toolkit 2.11** - Keeps your app data organized and predictable
- **React Redux 9.2** - Connects Redux to React components
- **TanStack React Query 5.90** - Smart data fetching that handles caching for you
  - Automatically caches API responses so you don't fetch the same data twice
  - Manages stale data intelligently (resets cache at the right time)
  - Built-in loading and error states

### Authentication and Database

- **Supabase 2.98** - Open source database backend with user auth built in
  - Email and password login
  - Automatic session management
  - Real-time capabilities

### Routing

- **React Router 7.13** - Client-side routing to switch between pages
  - Protected routes for logged-in users only
  - Clean URL management

### Code Quality

- **ESLint 9.39** - Catches code mistakes automatically
- **TypeScript ESLint** - Linting rules that understand TypeScript

## API References

### CoinGecko API

Free cryptocurrency market data. You don't need to authenticate, just make requests.

**Base URL:** `https://api.coingecko.com/api/v3`

**Endpoints we use:**

- `/coins/markets` - Get the top coins sorted by market cap, includes 24 hour price changes
- `/search/trending` - See what coins are currently trending
- `/coins/{id}` - Get detailed information about a specific coin
- `/coins/{id}/market_chart` - Fetch historical price data

**Rate Limits:** Around 10-50 requests per minute on the free tier. That's plenty for this dashboard.

**Data includes:** Current price, market cap, 24 hour volume, price changes, and more.

### Binance WebSocket API

Real-time price updates via WebSocket connection (no API key needed).

**Connection URL:** `wss://stream.binance.com:9443/ws/{symbol}@trade`

Replace `{symbol}` with something like `btcusdt` for Bitcoin.

**How it works:** Connect to the WebSocket and you'll get live trade data with the current market price.

**Advantages:**
- Prices update in under 1 second
- Uses very little bandwidth
- Perfect for live charts

## Project Structure

Here's how the code is organized:

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic components like buttons and inputs
│   └── layout/         # Header, navigation, page layouts
├── pages/              # Full page components (home, coin details, login)
├── hooks/              # Custom hooks for fetching and managing data
├── services/           # Functions that call the APIs
├── context/            # React Context for authentication
├── store/              # Redux state management
├── lib/                # Configuration for third-party services
├── utils/              # Helper functions
├── types/              # TypeScript type definitions
└── routes/             # Route setup and protection logic
```

## How Authentication Works

Here's what happens when a user logs in:

1. **Sign Up** - New users create an account with email and password via Supabase
2. **Sign In** - Existing users log in with their credentials
3. **Session Saved** - The session token is stored in the browser
4. **Automatic Recovery** - If you refresh the page, it checks if you're still logged in
5. **Protected Pages** - All dashboard pages require you to be logged in
6. **Auto Logout** - If your session expires or becomes invalid, you're logged out automatically

## Performance Optimizations

We've built this to be fast. Here's how:

### Smart Data Caching

We use React Query to cache API responses smartly:

- Market coin data stays fresh for 60 seconds before we fetch again
- Trending coins cache for 5 minutes
- Historical price data doesn't auto-refresh unless you ask for it
- Coin details auto-update every 30 seconds with live data

### Rendering Speed

- Complex calculations (like price ranges) are memoized so they don't recalculate every render
- Chart updates only when prices actually change
- Pagination means we're not loading 10,000 coins at once
- Images lazy-load so the page loads faster

### Bundle Size

- Unused code gets removed during the build process
- Vite splits code into chunks that load on demand
- We use modern ES modules for smaller file sizes

### Real-time Performance

- WebSocket connection for instant price updates
- We only keep 1 day of live data in memory (not the entire history)
- WebSocket connections are cleaned up properly so no memory leaks

## User Interface and Experience

The design focuses on being useful and clean:

- **Dark Theme** - Easy on the eyes with gray and blue colors
- **Loading States** - Skeleton screens so you know something is loading
- **Error Handling** - Issues are handled gracefully without crashing
- **Interaction Feedback** - Buttons and links respond to hover for better feel
- **Responsive Layout** - Works on phones, tablets, and desktops
- **Color Signals** - Green means gains, red means losses, orange for trending

## Custom React Hooks

These hooks make data fetching simple:

- `useMarketCoins()` - Get paginated list of top coins
- `useTrendingCoins()` - See what's trending today
- `useTopGainers()` - Find the best performers in 24 hours
- `useCoinInfo()` - Get all details about a specific coin
- `usePriceHistory()` - Fetch historical data for custom date ranges
- `useLivePrice()` - Connect to Binance WebSocket for real-time prices
- `useCoin()` - Complete hook that combines everything for coin detail pages


## Contributing

We'd love your help. If you want to add features or fix bugs:

1. Fork the repository
2. Create a new branch for your work
3. Make your changes
4. Open a pull request with a description of what you changed

For big changes, open an issue first so we can discuss the approach.