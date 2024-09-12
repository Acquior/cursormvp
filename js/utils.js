export function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

export function formatAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatAmount(amount) {
    return ethers.utils.formatEther(amount) + ' ETH';
}

export async function updateDashboards() {
    // This function will be implemented to update all dashboards
    console.log('Updating dashboards...');
    // Add calls to update functions for each dashboard
}

export function showNotification(message, type = 'info') {
    // Implement a notification system here
    console.log(`${type.toUpperCase()}: ${message}`);
    alert(message);
}