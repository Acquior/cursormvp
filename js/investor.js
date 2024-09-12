import { buyInvoice, getInvoiceDetails } from './contract.js';
import { showNotification, formatAddress, formatAmount } from './utils.js';

export function setupInvestor() {
    // Set up any event listeners or initialize investor-specific elements
}

export async function updateInvestorDashboard() {
    const invoicesContainer = document.getElementById('availableInvoices');
    invoicesContainer.innerHTML = 'Loading available invoices...';

    try {
        // In a real application, you would fetch available invoices from the blockchain
        // For this MVP, we'll simulate it with a few hardcoded invoices
        const invoices = [
            { id: 3, amount: ethers.utils.parseEther('1.5'), issuer: '0x789...', salePrice: ethers.utils.parseEther('1.4') },
            { id: 4, amount: ethers.utils.parseEther('3'), issuer: '0xabc...', salePrice: ethers.utils.parseEther('2.8') },
        ];

        let invoicesHTML = '<h3>Available Invoices for Purchase</h3>';
        invoices.forEach(invoice => {
            invoicesHTML += `
                <div class="invoice">
                    <p>Invoice ID: ${invoice.id}</p>
                    <p>Amount: ${formatAmount(invoice.amount)}</p>
                    <p>Issuer: ${formatAddress(invoice.issuer)}</p>
                    <p>Sale Price: ${formatAmount(invoice.salePrice)}</p>
                    <button onclick="purchaseInvoice(${invoice.id}, '${invoice.salePrice}')">Purchase</button>
                </div>
            `;
        });

        invoicesContainer.innerHTML = invoicesHTML;
    } catch (error) {
        invoicesContainer.innerHTML = 'Failed to load available invoices. Please try again.';
    }
}

async function purchaseInvoice(invoiceId, salePrice) {
    try {
        await buyInvoice(invoiceId, salePrice);
        showNotification('Invoice purchased successfully!', 'success');
        updateInvestorDashboard();
    } catch (error) {
        showNotification('Failed to purchase invoice. Please try again.', 'error');
    }
}

// Expose the purchaseInvoice function globally so it can be called from inline event handlers
window.purchaseInvoice = purchaseInvoice;