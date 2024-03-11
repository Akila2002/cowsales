import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
// import html2canvas from 'html2canvas';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public orderHistory: any = [];

  @ViewChild('orderHistoryTable') orderHistoryTable!: ElementRef;

  constructor(private cartservice: CartService) { }

  ngOnInit(): void {
    this.cartservice.getOrderHistory().subscribe((res: any) => {
      this.orderHistory = res;
    });
  }

  // generatePdfForOrder(order: any) {
  //   const element = document.getElementById(`order-item-${order.id}`);

  //   html2canvas(element!).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jspdf.jsPDF();
  //     const imgWidth = pdf.internal.pageSize.getWidth();
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //     pdf.save(`order_${order.id}.pdf`);
  //   });
  // }



  calculateTotalAmount(items: any[]): number {
    return items.reduce((total, item) => total + parseFloat(item.price), 0);
  }

  generatePdfForOrder(order: any) {
    const pdf = new jspdf.jsPDF();

    // Set border around the entire PDF
    pdf.rect(5, 5, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height - 10, 'S');


    // Background rectangle for the logo and company information
    pdf.setFillColor(200, 200, 200); // Light gray background color
    pdf.rect(10, 10, 190, 50, 'F'); // Rectangle for background

    // Company Logo (as a circle)
    const logo = "./assets/images/ice cow.jpg"; // Replace with the actual path to your logo
    pdf.circle(30, 35, 12, 'F'); // Circle with center at (30, 35) and radius 12
    pdf.addImage(logo, 'JPG', 18, 23, 24, 24); // Adjust the position and dimensions as needed

    // Company Information
    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0); // Black text color for company name

    // Set a different font style, for example, 'Arial'
    pdf.setFont("Arial");

    pdf.text('CHANTHIRAN CATTLE TRADE & DAIRY FARM', 50, 30); // Adjust the position as needed

    // Reset font for other text
    pdf.setFont("Helvetica"); // You can set it to the default font or any other font you prefer

    pdf.setTextColor(0, 0, 0); // Black text color for phone number
    pdf.setFontSize(12);
    pdf.text('Phone: 9486666928', 50, 48); // Adjust the position as needed
    pdf.setTextColor(0, 0, 0); // Black text color for address
    pdf.text('Address: Avudayanoor-627 808, Tenkasi-District, TamilNadu, India', 50, 58); // Adjust the position as needed


    //Add product ID with a smaller font size
    pdf.setFontSize(10);
    pdf.text(`Order ID:              ${order.id}`, 10, 80); // Adjust the position as needed

    // Add Customer Information with a smaller font size
    pdf.text(`Customer Name:  ${order.name}`, 10, 90);
    pdf.text(`Mobile:                 ${order.mobile}`, 10, 100);
    pdf.text(`Address:               ${order.address}`, 10, 110);
    // Add Product Details
    let yPos = 130;
    const colWidths = [50, 30, 30, 30, 40]; // Adjust the column widths as needed

    // Set font size and style for the table header
    pdf.setFontSize(10);
    pdf.setFont('bold'); // Use 'bold' to set font style
    pdf.setFillColor(200, 200, 200); // Light gray background color for header

    // Table header
    pdf.rect(10, yPos, colWidths.reduce((sum, width) => sum + width, 0), 8, 'F');
    pdf.text('Product Name', 15, yPos + 5);
    pdf.text('Price', 75, yPos + 5);
    pdf.text('Milk', 105, yPos + 5);
    pdf.text('State', 135, yPos + 5);
    pdf.text('Image', 165, yPos + 5);

    yPos += 15;

    // Set font style back to normal for the table content
    pdf.setFont('normal'); // Use 'normal' to set font style

    order.items.forEach((item: any) => {
      // Product Name
      pdf.text(item.name, 15, yPos);

      // Price, Milk, State
      pdf.text(item.price, 75, yPos);
      pdf.text(item.milk, 105, yPos);
      pdf.text(item.state, 135, yPos);
      // Image (smaller size)
      pdf.addImage(item.image, 'JPEG', 165, yPos, 17, 10); // Adjust image dimensions as needed

      yPos += 20; // Adjust the vertical spacing between rows
    });

    // Add Total Amount on the right side
    const totalAmount = this.calculateTotalAmount(order.items);
    pdf.setFontSize(14);
    pdf.text(`Total Amount: Rs.${totalAmount}`, 190, yPos + 10, { align: 'right' }); // Adjust the position as needed


    // Footer Details
    const footerText = 'Thank you For Shopping With CHANTHIRAN CATTLE TRADE & DAIRY FARM!';

    // Calculate the width of the text in a way compatible with jsPDF
    const fontSize = 14; // Set the desired font size
    const textWidth = pdf.getStringUnitWidth(footerText) * fontSize / pdf.internal.scaleFactor;

    // Calculate the center position
    const centerPosition = (pdf.internal.pageSize.width - textWidth) / 2;
    // Set a smaller font size for "From" and "Shipping to" lines
    const smallerFontSize = 3;
    pdf.text(`From:            Avudayanoor-627 808, Tenkasi-District`, 10, 230); // Adjust yPos as needed
    pdf.text(`Shipping to: ${order.address}`, 10, 240); // Adjust yPos as needed

    pdf.setFontSize(fontSize); // Set the font size before adding the text

    pdf.text(footerText, centerPosition, pdf.internal.pageSize.height - 10); // Centered at the bottom
    pdf.text(footerText, centerPosition, pdf.internal.pageSize.height - 10); // Centered at the bottom

    pdf.setFontSize(fontSize);
    pdf.text(footerText, centerPosition, pdf.internal.pageSize.height - 10);
    // Open the PDF in a new window or tab
    pdf.output('dataurlnewwindow');

    // You can also use pdf.output('dataurl') if you want to open it in the same tab
  }


  // Save the PDF
  // pdf.save(`order_${order.id}.pdf`);

}

