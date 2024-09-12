import { initializeContract } from './contract.js';
import { connectWallet } from './wallet.js';
import { showPage, updateDashboards } from './utils.js';
import { setupSmallBusiness } from './smallBusiness.js';
import { setupInvestor } from './investor.js';
import { setupBigBusiness } from './bigBusiness.js';

async function initApp() {
    try {
        await initializeContract();
        setupEventListeners();
        setupDashboards();
    } catch (error) {
        console.error('Failed to initialize app:', error);
        alert('Failed to initialize the application. Please check your connection and try again.');
    }
}

function setupEventListeners() {
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    
    document.querySelectorAll('.dashboard-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const page = e.currentTarget.getAttribute('data-page');
            showPage(page);
        });
    });
}

function setupDashboards() {
    setupSmallBusiness();
    setupInvestor();
    setupBigBusiness();
}

document.addEventListener('DOMContentLoaded', initApp);

export { updateDashboards };