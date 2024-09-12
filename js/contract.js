//

let contract;
let signer;

const contractAddress = '0x1432b3621DF6467Ae4E48Cb6A71a3468918DE391';
const contractABI = [
    "function createInvoice(address recipient, uint256 amount) public returns (uint256)",
    "function payInvoice(uint256 tokenId) public payable",
    "function listInvoiceForSale(uint256 tokenId, uint256 salePrice) public",
    "function buyInvoice(uint256 tokenId) public payable",
    "function getInvoiceDetails(uint256 tokenId) public view returns (uint256, address, address, bool, bool, uint256)",
    "event InvoiceCreated(uint256 indexed tokenId, uint256 amount, address indexed issuer, address indexed recipient)"
];

async function initializeContract() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log('Contract initialized');
        } catch (error) {
            console.error('Failed to initialize contract:', error);
            throw error;
        }
    } else {
        console.error('Ethereum object not found, install MetaMask.');
        throw new Error('Ethereum object not found, install MetaMask.');
    }
}

async function createInvoice(recipient, amount) {
    try {
        const tx = await contract.createInvoice(recipient, amount);
        const receipt = await tx.wait();
        console.log('Invoice created:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
}

async function payInvoice(tokenId, amount) {
    try {
        const tx = await contract.payInvoice(tokenId, { value: amount });
        const receipt = await tx.wait();
        console.log('Invoice paid:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error paying invoice:', error);
        throw error;
    }
}

async function listInvoiceForSale(tokenId, salePrice) {
    try {
        const tx = await contract.listInvoiceForSale(tokenId, salePrice);
        const receipt = await tx.wait();
        console.log('Invoice listed for sale:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error listing invoice for sale:', error);
        throw error;
    }
}

async function buyInvoice(tokenId, price) {
    try {
        const tx = await contract.buyInvoice(tokenId, { value: price });
        const receipt = await tx.wait();
        console.log('Invoice bought:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error buying invoice:', error);
        throw error;
    }
}

async function getInvoiceDetails(tokenId) {
    try {
        const details = await contract.getInvoiceDetails(tokenId);
        return {
            amount: details[0],
            issuer: details[1],
            recipient: details[2],
            paid: details[3],
            forSale: details[4],
            salePrice: details[5]
        };
    } catch (error) {
        console.error('Error getting invoice details:', error);
        throw error;
    }
}

export {
    initializeContract,
    createInvoice,
    payInvoice,
    listInvoiceForSale,
    buyInvoice,
    getInvoiceDetails
};
