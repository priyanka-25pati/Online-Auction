import { environment } from "./environment";

export const urls = {
    login: `${environment.baseUrl}/api/Users`,
    register: `${environment.baseUrl}/api/Users`,
    
    list: `${environment.baseUrl}/api/Items`,
    getItem: `${environment.baseUrl}/api/Items`,
    getCategory: `${environment.baseUrl}/api/Items`,
    update: `${environment.baseUrl}/api/Items`,
    delete: `${environment.baseUrl}/api/Items`,



    placeBid: `${environment.baseUrl}/api/Bids`,
    getBid: `${environment.baseUrl}/api/Bids`,
    getBidId: `${environment.baseUrl}/api/Bids`, 
    getCurrentHighestBid: `${environment.baseUrl}/api/Bids/CurrentHighest`,


    getUser: `${environment.baseUrl}/api/Users`,
    createUser: `${environment.baseUrl}/api/Users`,
    getUserId: `${environment.baseUrl}/api/Users`, 
    updateUser: `${environment.baseUrl}/api/Users`,
    deleteUser: `${environment.baseUrl}/api/Users`,



};
