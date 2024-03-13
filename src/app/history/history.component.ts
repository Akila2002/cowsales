import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
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

  calculateTotalAmount(items: any[]): number {
    return items.reduce((total, item) => total + parseFloat(item.price), 0);
  }

  generatePdfForOrder(order: any) {
    const pdf = new jspdf.jsPDF();

    pdf.rect(5, 5, pdf.internal.pageSize.width - 10, pdf.internal.pageSize.height - 10, 'S');

    pdf.setFillColor(200, 200, 200);
    pdf.rect(10, 10, 190, 50, 'F');

    const logo = "./assets/images/ice cow.jpg";
    pdf.circle(30, 35, 12, 'F');
    pdf.addImage(logo, 'JPG', 18, 23, 24, 24);

    pdf.setFontSize(18);
    pdf.setTextColor(0, 0, 0);
    pdf.text('CHANTHIRAN CATTLE TRADE & DAIRY FARM', 50, 30);

    pdf.setFont("Arial");
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Phone: 9486666928', 50, 48);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Address: Avudayanoor-627 808, Tenkasi-District, TamilNadu, India', 50, 58);

    pdf.setFontSize(10);
    pdf.text(`Order ID:              ${order.id}`, 10, 80);

    pdf.text(`Customer Name:  ${order.name}`, 10, 90);
    pdf.text(`Mobile:                 ${order.mobile}`, 10, 100);
    pdf.text(`Address:               ${order.address}`, 10, 110);

    let yPos = 130;
    const colWidths = [50, 30, 30, 30, 40];

    pdf.setFontSize(10);
    pdf.setFont('bold');
    pdf.setFillColor(200, 200, 200);

    pdf.rect(10, yPos, colWidths.reduce((sum, width) => sum + width, 0), 8, 'F');
    pdf.text('Product Name', 15, yPos + 5);
    pdf.text('Price', 75, yPos + 5);
    pdf.text('Milk', 105, yPos + 5);
    pdf.text('State', 135, yPos + 5);
    pdf.text('Image', 165, yPos + 5);

    yPos += 15;

    pdf.setFont('normal');

    order.items.forEach((item: any) => {
      pdf.text(item.name, 15, yPos);
      pdf.text(item.price, 75, yPos);
      pdf.text(item.milk, 105, yPos);
      pdf.text(item.state, 135, yPos);
      pdf.addImage(item.image, 'JPEG', 165, yPos, 17, 10);

      yPos += 20;
    });

    const totalAmount = this.calculateTotalAmount(order.items);
    pdf.setFontSize(14);
    pdf.text(`Total Amount: Rs.${totalAmount}`, 190, yPos + 10, { align: 'right' });

    const footerText = 'Thank you For Shopping With CHANTHIRAN CATTLE TRADE & DAIRY FARM!';

    const fontSize = 14;
    const textWidth = pdf.getStringUnitWidth(footerText) * fontSize / pdf.internal.scaleFactor;
    const centerPosition = (pdf.internal.pageSize.width - textWidth) / 2;

    pdf.text(`From:            Avudayanoor-627 808, Tenkasi-District`, 10, 230);
    pdf.text(`Shipping to: ${order.address}`, 10, 240);

    pdf.setFontSize(fontSize);
    pdf.text(footerText, centerPosition, pdf.internal.pageSize.height - 10);
    pdf.text(footerText, centerPosition, pdf.internal.pageSize.height - 10);

    pdf.setFontSize(fontSize);
    pdf.text(footerText, centerPosition, pdf.internal.pageSize.height - 10);

    pdf.output('dataurlnewwindow');
  }
}
