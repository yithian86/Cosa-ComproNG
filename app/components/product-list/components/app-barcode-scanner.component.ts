import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { BarcodeScanner } from 'nativescript-barcodescanner';

@Component({
  selector: "app-barcode-scanner",
  templateUrl: "components/product-list/views/app-barcode-scanner.component.html",
  styleUrls: ["components/product-list/styles/app-barcode-scanner.component.css"],
  providers: [BarcodeScanner]
})
export class AppBarcodeScannerComponent implements OnInit {
  private format: string;
  private code: string;

  constructor(private routerExtensions: RouterExtensions, private barcodeScanner: BarcodeScanner) {
    this.format = "-";
    this.code = "-";
  }

  ngOnInit() {}

  public getResultText = (): string => {
    return `Format: ${this.format}, Content: ${this.code}`;
  }

  public scanBarcode() {
    this.barcodeScanner.scan({
      formats: "CODE_39, CODE_93, CODE_128, EAN_8, EAN_13, UPC_E", // QR_CODE also allowed
      showFlipCameraButton: true,
      preferFrontCamera: false,
      showTorchButton: true,
      beepOnScan: true,
      torchOn: false,
      resultDisplayDuration: 2000,
      orientation: "portrait",
      openSettingsIfPermissionWasPreviouslyDenied: true //ios only 
    }).then((result) => {
      this.format = result.format;
      this.code = result.text;
    }, (errorMessage) => {
      console.log("Error when scanning " + errorMessage);
    });
  }

  public goToProductList = () => {
    console.log("Navigating to Product List...");
    this.routerExtensions.navigate(["/home/productList/list"], {
      transition: {
        name: "slideRight",
        duration: 300
      }
    });
  }

}