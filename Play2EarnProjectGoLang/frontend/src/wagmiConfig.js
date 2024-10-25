import { WagmiProvider, createConfig, http } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
import React from 'react';

const wagmiConfig = createConfig(
    getDefaultConfig({
        chains: [polygonAmoy],
        transports: {
            [polygonAmoy.id]: http(`https://polygon-amoy.g.alchemy.com/v2/ALCHEMy_API_KEY`),
        },
        walletConnectProjectId: 'REOWN_PROJECT_ID',
        appName: 'Play2EarnGame',
    })
);

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Web3Provider component to wrap the app
export const Web3Provider = ({ children }) => {
    return React.createElement(
        WagmiConfig,
        { config: wagmiConfig },
        React.createElement(
            QueryClientProvider,
            { client: queryClient },
            React.createElement(
                ConnectKitProvider,
                null,
                children
            )
        )
    );
};