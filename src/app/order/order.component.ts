import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
// import { CartComponent } from '../pages/cart/cart.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.http.get<any[]>("http://localhost:3000/api/orders")
      .subscribe((res: any[]) => {
        this.orders = res;
        // Fetch product details for each order
        this.orders.forEach(order => {
          this.fetchOrderItems(order);
        });
      });
  }

  fetchOrderItems(order: any): void {
    this.http.get<any[]>(`http://localhost:3000/api/orders/${order.id}/order_items`)
      .subscribe((items: any[]) => {
        order.items = items;
      });
  }
  calculateTotalAmount(items: any[]): number {
    return items.reduce((total, item) => total + parseFloat(item.price), 0);
  }
  generatePDF(order: any): void {
    const doc = new jsPDF();
    let yPos = 130; // Initial vertical position for the table



    // Set up border
    const borderWidth = 5;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const borderX = 5; // Adjust horizontal position of border
    const borderY = 5; // Adjust vertical position of border
    const borderWidthAdjusted = pageWidth - borderX * 2;
    const borderHeightAdjusted = pageHeight - borderY * 2;

    // Draw border
    doc.rect(borderX, borderY, borderWidthAdjusted, borderHeightAdjusted, 'S'); // 'S' means stroke


    // Background rectangle for the logo and company information
    doc.setFillColor(144, 238, 144); // Light green background color
    doc.rect(10, 10, 190, 50, 'F'); // Rectangle for background
    // Add company name
    doc.setFontSize(15);
    doc.text('CHANTHIRAN CATTLE TRADE & DAIRY FARM', 105, 25, { align: 'center' });
    //Add phone no
    doc.setFontSize(11);
    doc.text('Phone No:9486666928', 105, 35, { align: 'center' });
    // Add company address
    doc.setFontSize(11);
    doc.text('Address: Avudayanoor-627 808, Tenkasi-District, TamilNadu, India', 108, 45, { align: 'center' });

    // Add logo image
    const logoImg = new Image();
    logoImg.src = "./assets/images/ice cow.jpg";
    logoImg.onload = () => {
      doc.addImage(logoImg, 'PNG', 16, 22, 27, 25);


      doc.text(`Order ID:              ${order.id}`, 10, 80);
      doc.text(`Customer Name:  ${order.name}`, 10, 90);
      doc.text(`Mobile:                 ${order.mobile}`, 10, 100);
      doc.text(`Address:               ${order.address}`, 10, 110);


      // Iterate over product details
      if (order.items && order.items.length > 0) {
        doc.setFont('bold');

        doc.text('Product Details', 10, yPos);
        yPos += 12; // Increase yPos for table header

        // Table header
        doc.text('Sr. No', 20, yPos);
        doc.text('Product Name', 35, yPos);
        doc.text('Price', 80, yPos);
        doc.text('Milk', 110, yPos);
        doc.text('State', 145, yPos);
        doc.text('Image', 180, yPos);


        // Iterate over products and display details
        yPos += 12; // Increase yPos for table content
        order.items.forEach((item: any, index: number) => {
          doc.text(`${index + 1}`, 20, yPos);
          doc.text(`${item.product_name}`, 35, yPos);
          doc.text(`Rs.${item.price}`, 80, yPos); // Assuming price is in Indian Rupees
          doc.text(`${item.milk}`, 110, yPos);
          doc.text(`${item.state}`, 145, yPos);

          const imageYPos = yPos - 5; // Adjust yPos to align image with Sr. No
          // Add product image
          if (item.image) {
            const imageXPos = 180;

            doc.addImage(item.image, 'JPEG', imageXPos, imageYPos, 15, 9);
          }
          yPos += 10;
        });
        // Add Total Amount on the right side
        const totalAmount = this.calculateTotalAmount(order.items);
        doc.setFontSize(12);
        doc.text(`Total Amount: Rs.${totalAmount}`, 190, yPos + 7, { align: 'right' }); // Adjust the position as needed



        // Footer Details
        const footerText = 'Thank you For Shopping With CHANTHIRAN CATTLE TRADE & DAIRY FARM!';

        // Calculate the width of the text in a way compatible with jsPDF
        const fontSize = 14; // Set the desired font size
        const textWidth = doc.getStringUnitWidth(footerText) * fontSize / doc.internal.scaleFactor;

        // Calculate the center position
        const centerPosition = (doc.internal.pageSize.width - textWidth) / 2;
        // Set a smaller font size for "From" and "Shipping to" lines
        const smallerFontSize = 3;
        doc.text(`From            :Avudayanoor-627 808, Tenkasi-District`, 10, 230); // Adjust yPos as needed
        doc.text(`Shipping to  : ${order.address}`, 10, 240); // Adjust yPos as needed

        doc.setFontSize(fontSize); // Set the font size before adding the text

        doc.text(footerText, centerPosition, doc.internal.pageSize.height - 10); // Centered at the bottom
        doc.text(footerText, centerPosition, doc.internal.pageSize.height - 10); // Centered at the bottom

        doc.setFontSize(fontSize);
        doc.text(footerText, centerPosition, doc.internal.pageSize.height - 10);


        // Convert the PDF to a blob
        const pdfBlob = doc.output('blob');
        // Create a blob URL for the PDF
        const blobUrl = URL.createObjectURL(pdfBlob);



        // Open the PDF in a new tab
        window.open(blobUrl, '_blank');
      };
    }
  }
}


// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import jsPDF from 'jspdf';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// @Component({
//   selector: 'app-order',
//   templateUrl: './order.component.html',
//   styleUrls: ['./order.component.css']
// })
// export class OrderComponent implements OnInit {
//   orders: any[] = [];
//   pdfSrc: SafeResourceUrl | undefined;
//   isModalOpen: boolean = false;

//   constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

//   ngOnInit(): void {
//     this.getOrders();
//   }

//   getOrders(): void {
//     this.http.get<any[]>("http://localhost:3000/api/orders")
//       .subscribe((res: any[]) => {
//         this.orders = res;
//         this.orders.forEach(order => {
//           this.fetchOrderItems(order);
//         });
//       });
//   }

//   fetchOrderItems(order: any): void {
//     this.http.get<any[]>(`http://localhost:3000/api/orders/${order.id}/order_items`)
//       .subscribe((items: any[]) => {
//         order.items = items;
//       });
//   }

//   calculateTotalAmount(items: any[]): number {
//     return items.reduce((total, item) => total + parseFloat(item.price), 0);
//   }

//   generatePDF(order: any): void {
//     const doc = new jsPDF();
//     let yPos = 130;

//     const borderWidth = 5;
//     const pageWidth = doc.internal.pageSize.width;
//     const pageHeight = doc.internal.pageSize.height;
//     const borderX = 5;
//     const borderY = 5;
//     const borderWidthAdjusted = pageWidth - borderX * 2;
//     const borderHeightAdjusted = pageHeight - borderY * 2;

//     doc.rect(borderX, borderY, borderWidthAdjusted, borderHeightAdjusted, 'S');
//     doc.setFillColor(144, 238, 144);
//     doc.rect(10, 10, 190, 50, 'F');
//     doc.setFontSize(15);
//     doc.text('CHANTHIRAN CATTLE TRADE & DAIRY FARM', 105, 25, { align: 'center' });
//     doc.setFontSize(11);
//     doc.text('Phone No:9486666928', 105, 35, { align: 'center' });
//     doc.text('Address: Avudayanoor-627 808, Tenkasi-District, TamilNadu, India', 108, 45, { align: 'center' });

//     const logoImg = new Image();
//     logoImg.src = "./assets/images/ice cow.jpg";
//     logoImg.onload = () => {
//       doc.addImage(logoImg, 'PNG', 16, 22, 27, 25);

//       doc.text(`Order ID: ${order.id}`, 10, 80);
//       doc.text(`Customer Name: ${order.name}`, 10, 90);
//       doc.text(`Mobile: ${order.mobile}`, 10, 100);
//       doc.text(`Address: ${order.address}`, 10, 110);

//       if (order.items && order.items.length > 0) {
//         doc.setFont('bold');
//         doc.text('Product Details', 10, yPos);
//         yPos += 12;

//         doc.text('Sr. No', 20, yPos);
//         doc.text('Product Name', 35, yPos);
//         doc.text('Price', 80, yPos);
//         doc.text('Milk', 110, yPos);
//         doc.text('State', 145, yPos);
//         doc.text('Image', 180, yPos);

//         yPos += 12;
//         order.items.forEach((item: any, index: number) => {
//           doc.text(`${index + 1}`, 20, yPos);
//           doc.text(`${item.product_name}`, 35, yPos);
//           doc.text(`Rs.${item.price}`, 80, yPos);
//           doc.text(`${item.milk}`, 110, yPos);
//           doc.text(`${item.state}`, 145, yPos);

//           const imageYPos = yPos - 5;
//           if (item.image) {
//             const imageXPos = 180;
//             doc.addImage(item.image, 'JPEG', imageXPos, imageYPos, 15, 9);
//           }
//           yPos += 10;
//         });

//         const totalAmount = this.calculateTotalAmount(order.items);
//         doc.setFontSize(12);
//         doc.text(`Total Amount: Rs.${totalAmount}`, 190, yPos + 7, { align: 'right' });

//         const footerText = 'Thank you For Shopping With CHANTHIRAN CATTLE TRADE & DAIRY FARM!';
//         const fontSize = 14;
//         const textWidth = doc.getStringUnitWidth(footerText) * fontSize / doc.internal.scaleFactor;
//         const centerPosition = (doc.internal.pageSize.width - textWidth) / 2;
//         const smallerFontSize = 3;
//         doc.text(`From: Avudayanoor-627 808, Tenkasi-District`, 10, 230);
//         doc.text(`Shipping to: ${order.address}`, 10, 240);
//         doc.setFontSize(fontSize);
//         doc.text(footerText, centerPosition, doc.internal.pageSize.height - 10);

//         const pdfBlob = doc.output('blob');
//         const blobUrl = URL.createObjectURL(pdfBlob);
//         this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
//         this.isModalOpen = true;
//       }
//     };
//   }

//   closeModal(): void {
//     this.isModalOpen = false;
//   }
// }
