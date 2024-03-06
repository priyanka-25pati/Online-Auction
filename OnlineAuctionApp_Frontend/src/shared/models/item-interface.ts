export interface Item {
    itemID: number; 
    sellerID: number;
    categoryID: number;
    title: string;
    description: string;
    startingBid: number;
    reservePrice?: number; 
    auctionDuration: number;
    startTime: string; 
    endTime: string; 
    status: string;
}
