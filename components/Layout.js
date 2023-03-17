import Navbar from "./Navbar";

import {
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';


const { chains, provider } = configureChains(
    [polygon],
    [
        alchemyProvider({ apiKey: '161WAOtSAE5jevNI4o4JUYgdtP9lOUoe' }),
    ]
);

const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})
const Layout = ({ children }) => {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
        <div className="content">
            <Navbar />

            { children }
        </div>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default Layout;