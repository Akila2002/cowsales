import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent  {
 
  cowDetails = `
    <b>Name:</b> Jersey Cow
    <b>Rate:</b> 40000
    <b>Milk:</b> 15 liter per day
    <b>State:</b> Pregnancy
    And more details contact us <a href="tel:+91 9486666928">9486666928</a>
  `;
  cow2Details = `
  <b>Name:</b> Jersey Cow
  <b>Rate:</b> 38000
  <b>Milk:</b> 13 liter per day
  <b>State:</b> Milk Cattle
  And more details contact us <a href="tel:+91 9486666928">9486666928</a>
`;

  cow3Details = `
<b>Name:</b> Jersey Cow
<b>Rate:</b> 37000
<b>Milk:</b> 14 liter per day
<b>State:</b> Milk Cattle
And more details contact us <a href="tel:+91 9486666928">9486666928</a>
`;
  cow4Details = `
<b>Name:</b> Helstein Frienian Cow
<b>Rate:</b> 30000
<b>Milk:</b> 10 liter per day
<b>State:</b> Pregnancy
And more details contact us <a href="tel:+91 9486666928">9486666928</a>
`;
  cow5Details = `
<b>Name:</b> Helstein Frienian Cow
<b>Rate:</b> 38000
<b>Milk:</b> 12 liter per day
<b>State:</b> Milk Cattle + Calf
And more details contact us <a href="tel:+91 9486666928">9486666928</a>
`;
  cow6Details = `
<b>Name:</b> Helstein Frienian Cow
<b>Rate:</b> 50000
<b>Milk:</b> 18 liter per day
<b>State:</b> Milk Cattle
And more details contact us <a href="tel:+91 9486666928">9486666928</a>
`;


// }
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-available',
//   templateUrl: './available.component.html',
//   styleUrls: ['./available.component.css']
// })
// export class AvailableComponent {
//   cowDetails = `
//     <b>Name:</b> Jersey Cow
//     <b>Rate:</b> 40000
//     <b>Milk:</b> 15 liter per day
//     <b>State:</b> Pregnancy
//     And more details contact us <a href="tel:+91 9486666928">9486666928</a>
//   `;

//   filterCategory = [
//     {
//       id: 1,
//       image: './assets/images/j1.jpg',
//       title: 'Title 1',
//       description: 'Description 1',
//       price: 10
//     },
//     // Add more items with similar structure as needed
//   ];

//   cartItems: any[] = [];
  

//   addtocart(item: any) {
//     // Check if the item is already in the cart based on its ID
//     const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);

//     if (existingItem) {
//       // If the item already exists in the cart, you can increase its quantity or do other actions
//       // For example, increment the quantity here
//       existingItem.quantity++;
//     } else {
//       // If the item is not in the cart, add it with a quantity of 1
//       this.cartItems.push({ ...item, quantity: 1 });
//     }

//     console.log('Added to cart:', item);
//     console.log('Cart Items:', this.cartItems);
//   }

//   removeFromCart(index: number) {
//     // Remove an item from the cart based on its index
//     this.cartItems.splice(index, 1);
//     console.log('Removed from cart at index', index);
//     console.log('Cart Items:', this.cartItems);
//   }
  
}