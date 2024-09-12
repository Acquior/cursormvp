import { createInvoice, listInvoiceForSale, getInvoiceDetails } from './contract.js';
import { showNotification, formatAddress, formatAmount } from './utils.js';
import { getConnectedAddress } from './wallet.js';

export function setupSmallBusiness() {
    const createInvoiceForm = document.getElementById('createInvoiceForm');
    if (createInvoiceForm) {
        createInvoiceForm.addEventListener('submit', handleCreateInvoice);
    }
}

async function handleCreateInvoice(event) {
    event.preventDefault();
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;

    try {
        const receipt = await createInvoice(recipient, amount);
        showNotification('Invoice created successfully!', 'success');
        updateSmallBusinessDashboard();
    } catch (error) {
        showNotification('Failed to create invoice. Please try again.', 'error');
    }
}

export async function updateSmallBusinessDashboard() {
    const invoicesContainer = document.getElementById('smallBusinessInvoices');
    invoicesContainer.innerHTML = 'Loading invoices...';

    try {
        const address = await getConnectedAddress();
        // In a real application, you would fetch the user's invoices from the blockchain
        // For this MVP, we'll simulate it with a few hardcoded invoices
        const invoices = [
            { id: 1, amount: ethers.utils.parseEther('1'), recipient: '0x123...', status: 'Unpaid' },
            { id: 2, amount: ethers.utils.parseEther('2'), recipient: '0x456...', status: 'Paid' },
        ];

        let invoicesHTML = '<h3>Your Invoices</h3>';
        invoices.forEach(invoice => {
            invoicesHTML += `
                <div class="invoice">
                    <p>Invoice ID: ${invoice.id}</p>
                    <p>Amount: ${formatAmount(invoice.amount)}</p>
                    <p>Recipient: ${formatAddress(invoice.recipient)}</p>
                    <p>Status: ${invoice.status}</p>
                    ${invoice.status === 'Unpaid' ? `<button onclick="listForSale(${invoice.id})">List for Sale</button>` : ''}
                </div>
            `;
        });

        invoicesContainer.innerHTML = invoicesHTML;
    } catch (error) {
        invoicesContainer.innerHTML = 'Failed to load invoices. Please try again.';
    }
}

async function listForSale(invoiceId) {
    const salePrice = prompt('Enter the sale price in ETH:');
    if (salePrice) {
        try {
            const salePriceWei = ethers.utils.parseEther(salePrice);
            await listInvoiceForSale(invoiceId, salePriceWei);
            showNotification('Invoice listed for sale successfully!', 'success');
            updateSmallBusinessDashboard();
        } catch (error) {
            showNotification('Failed to list invoice for sale. Please try again.', 'error');
        }
    }
}

// Expose the listForSale function globally so it can be called from inline event handlers
window.listForSale = listForSale;