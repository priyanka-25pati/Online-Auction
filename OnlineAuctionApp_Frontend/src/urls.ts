import { environment } from "./environment";

export const urls = {
    //authentication
    login: `${environment.baseUrl}/api/Users`,
    register: `${environment.baseUrl}/api/Users`,
    
    //item
    list: `${environment.baseUrl}/api/Items`,
    getItem: `${environment.baseUrl}/api/Items`,
    getCategory: `${environment.baseUrl}/api/Items`,
    update: `${environment.baseUrl}/api/Items`,
    delete: `${environment.baseUrl}/api/Items`,


    //bid
    placeBid: `${environment.baseUrl}/api/Bids`,
    getBid: `${environment.baseUrl}/api/Bids`,
    getBidId: `${environment.baseUrl}/api/Bids`, 
    getCurrentHighestBid: `${environment.baseUrl}/api/Bids/CurrentHighest`,

    //user
    getUser: `${environment.baseUrl}/api/Users`,
    createUser: `${environment.baseUrl}/api/Users`,
    getUserId: `${environment.baseUrl}/api/Users`, 
    updateUser: `${environment.baseUrl}/api/Users`,
    deleteUser: `${environment.baseUrl}/api/Users`,



};
