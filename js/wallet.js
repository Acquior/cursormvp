import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js";
import { showNotification } from './utils.js';

let signer = null;

export async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            const address = await signer.getAddress();
            showNotification(`Wallet connected: ${formatAddress(address)}`, 'success');
            document.getElementById('connectWalletBtn').textContent = 'Wallet Connected';
            return signer;
        } catch (error) {
            console.error('Failed to connect wallet:', error);
            showNotification('Failed to connect wallet. Please try again.', 'error');
        }
    } else {
        showNotification('Please install MetaMask to use this application.', 'error');
    }
}

export function getSigner() {
    return signer;
}

export async function getConnectedAddress() {
    if (signer) {
        return await signer.getAddress();
    }
    return null;
}

function formatAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}