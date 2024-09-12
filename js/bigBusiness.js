import { payInvoice, getInvoiceDetails } from './contract.js';
import { showNotification, formatAddress, formatAmount } from './utils.js';
import { getConnectedAddress } from './wallet.js';

export function setupBigBusiness() {
    // Set up any event listeners or initialize big business-specific elements
}

export async function updateBigBusinessDashboard() {
    const invoicesContainer = document.getElementById('receivedInvoices');
    invoicesContainer.innerHTML = 'Loading received invoices...';

    try {
        const address = await getConnectedAddress();
        // In a real application, you would fetch the invoices from the blockchain
        // For this MVP, we'll simulate it with a few hardcoded invoices
        const invoices = [
            { id: 5, amount: ethers.utils.parseEther('5'), issuer: '0xdef...', status: 'Unpaid' },
            { id: 6, amount: ethers.utils.parseEther('7'), issuer: '0xghi...', status: 'Paid' },
        ];

        let invoicesHTML = '<h3>Received Invoices</h3>';
        invoices.forEach(invoice => {
            invoicesHTML += `
                <div class="invoice">
                    <p>Invoice ID: ${invoice.id}</p>
                    <p>Amount: ${formatAmount(invoice.amount)}</p>
                    <p>Issuer: ${formatAddress(invoice.issuer)}</p>
                    <p>Status: ${invoice.status}</p>
                    ${invoice.status === 'Unpaid' ? `<button onclick="payReceivedInvoice(${invoice.id}, '${invoice.amount}')">Pay Invoice</button>` : ''}
                </div>
            `;
        });

        invoicesContainer.innerHTML = invoicesHTML;
    } catch (error) {
        invoicesContainer.innerHTML = 'Failed to load received invoices. Please try again.';
    }
}

async function payReceivedInvoice(invoiceId, amount) {
    try {
        await payInvoice(invoiceId, amount);
        showNotification('Invoice paid successfully!', 'success');
        updateBigBusinessDashboard();
    } catch (error) {
        showNotification('Failed to pay invoice. Please try again.', 'error');
    }
}

// Expose the payReceivedInvoice function globally so it can be called from inline event handlers
window.payReceivedInvoice = payReceivedInvoice;