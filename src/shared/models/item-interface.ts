export interface Item {
    itemID: number; // Assuming this is the ID used in your Angular application
    sellerID: number;
    categoryID: number;
    title: string;
    description: string;
    startingBid: number;
    reservePrice?: number; // Make this optional to match the backend model
    auctionDuration: number;
    startTime: string; // Adjusted to string to match the backend model
    endTime: string; // Adjusted to string to match the backend model
    status: string;
}
