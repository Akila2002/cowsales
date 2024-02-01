// import { InMemoryDbService ,RequestInfo} from 'angular-in-memory-web-api';
// import { Injectable } from '@angular/core';

// // export interface Order {
// //   id: number;
// //   name: string;
// //   mobile: string;
// //   address: string;
// // }
// @Injectable({
//   providedIn: 'root',
// })
// export class InMemoryDataService implements InMemoryDbService {
//   createDb() {
//     const posts = [
//       {
//         "id": "1",
//         "name": "Jersey Cow",
//         "image": "https://i.pinimg.com/originals/32/f5/44/32f544d9bfc81ef877e3d10b53d2cb41.jpg",
//         "milk": "15 liter per day",
//         "state": "Pregnancy",
//         "price": "40000",
//         "extra": "And more details contact us 9486666928"
//       },
//       {
//         "id": "2",
//         "name": "Jersey Cow",
//         "image": "https://i.pinimg.com/originals/16/dd/b4/16ddb416e38a0eaecd4d9661a8ba5d15.jpg",
//         "milk": "13 liter per day",
//         "state": "Milk Cattle",
//         "price": "38000",
//         "extra": "And more details contact us 9486666928"
//       },
//       {
//         "id": "3",
//         "name": "Jersey Cow",
//         "image": "https://images.fineartamerica.com/images-medium-large-5/jersey-cow-in-pasture-michelle-wrighton.jpg",
//         "milk": "14 liter per day",
//         "state": "Milk Cattle",
//         "price": "37000",
//         "extra": "And more details contact us 9486666928"
//       },
//       {
//         "id": "4",
//         "name": "Helstein Frienian Cow",
//         "image": "https://tiimg.tistatic.com/fp/1/005/578/holstein-friesian-cow-440.jpg",
//         "milk": "10 liter per day",
//         "state": "Pregnancy",
//         "price": "30000",
//         "extra": "And more details contact us 9486666928"
//       },
//       {
//         "id": "5",
//         "name": "Helstein Frienian Cow",
//         "image": "https://i.pinimg.com/736x/f0/64/fc/f064fc0ec9b59f09ef71a98bf3dec55e--cattle-farming-holstein-cows.jpg",
//         "milk": "12 liter per day",
//         "state": "Milk Cattle + Calf",
//         "price": "38000",
//         "extra": "And more details contact us 9486666928"
//       },
//       {
//         "id": "6",
//         "name": "Helstein Frienian Cow",
//         "image": "https://images.engormix.com/profile_photos/ph-20180216_061647-S-12368-hols.jpg",
//         "milk": "18 liter per day",
//         "state": "Milk Cattle",
//         "price": "50000",
//         "extra": "And more details contact us 9486666928"
//       }    ];

//       // const orders: Order[] = [
//       //   { id: 1, name: 'John Doe', mobile: '1234567890', address: 'Some Address' },
//       // ];
//       // const orders = [
//       //   {
//       //     id: 1,
//       //   }
//       // ]
//       const order = [
         
//         { id: 1, name: 'John Doe', mobile: '1234567890', address: 'Some Address' },
          
        
//       ];
    
//       return { posts, order };
//     }







//     // Override post method to handle form submissions
//     post(reqInfo: RequestInfo) {
//     if (reqInfo.collectionName === 'Order') {
//       return this.handleOrdersPost(reqInfo);
//     }

//     // If the collectionName is not 'orders', use the default behavior
//     return undefined;
//   }

//   private handleOrdersPost(reqInfo: RequestInfo) {
//     const newOrder = reqInfo.utils.getJsonBody(reqInfo.req);
//     console.log('New Order:', newOrder); // Check what you get here

//     // Generate a unique ID for the new order (you can use a more robust ID generation logic)
//     newOrder.id = this.genId(reqInfo.collection);

//     // Add the new order to the 'orders' collection
//     reqInfo.collection.push(newOrder);
//     console.log('Updated Orders:', reqInfo.collection); // Check the updated collection
    
//     // Return a response indicating success
//     const options = {
//       body: newOrder, // Include the new order in the response body

//       status: 200,
//       headers: reqInfo.headers,
//       url: reqInfo.url,
//     };
//     return reqInfo.utils.createResponse$(() => options);
//   }

//   // Function to generate a unique ID (replace with your logic)
//   private genId(collection: any[]): number {
//     return collection.length > 0 ? Math.max(...collection.map(item => item.id)) + 1 : 1;
//   }

    
//   }
  


  
  
  

