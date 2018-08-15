import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { action } from "ui/dialogs";

import { ProductsDBService } from "~/components/product-list/services/app-product-list.database.service";
import { CategoriesDBService } from "~/components/categories/services/app-categories.database.service";
import { IProduct } from "~/components/typings/product";

@Component({
  selector: "app-barcode-scanner",
  templateUrl: "components/product-list/views/app-barcode-scanner.component.html",
  styleUrls: ["components/product-list/styles/app-barcode-scanner.component.css"],
  providers: [BarcodeScanner, ProductsDBService, CategoriesDBService]
})
export class AppBarcodeScannerComponent implements OnInit {
  public product: IProduct;
  public categoryList: Array<string>
  public isEditing: boolean;
  public format: string;
  public code: string;

  constructor(
    private routerExtensions: RouterExtensions,
    private barcodeScanner: BarcodeScanner,
    private productsDBService: ProductsDBService,
    private categoriesDBService: CategoriesDBService
  ) {
    this.format = " - ";
    this.code = " - ";
    this.isEditing = true;

    this.resetProduct();
  }

  ngOnInit() {
    this.categoriesDBService.getCategories().then((categories: Array<string>) => this.categoryList = categories);
  }

  public isProductValid = () => this.product && this.product.productName && this.product.barCode && this.product.category

  public scanBarcode() {
    this.isEditing = true;
    this.resetProduct();

    this.barcodeScanner
      .scan({
        formats: "CODE_39, CODE_93, CODE_128, EAN_8, EAN_13, UPC_E", // QR_CODE also allowed
        showFlipCameraButton: true,
        preferFrontCamera: false,
        showTorchButton: true,
        beepOnScan: true,
        torchOn: false,
        resultDisplayDuration: 2000,
        orientation: "portrait",
        openSettingsIfPermissionWasPreviouslyDenied: true //ios only 
      })
      .then((result) => {
        this.format = result.format;
        this.code = result.text;

        console.log("Looking for duplicates in the database...");
        // this.productsDBService.getProductByBarcode("8001120912916")
        this.productsDBService.getProductByBarcode(this.code)
          .then((resultProduct: IProduct) => {
            if (!!resultProduct) {
              console.log("Found it!", JSON.stringify(resultProduct));
              this.isEditing = false;
              this.product = resultProduct;
            } else {
              console.log("No products found with this barcode:", this.code);
              this.product.barCode = this.code;
            }
          })
          .catch(error => console.error(error));

      }, (errorMessage) => {
        console.log("Error when scanning " + errorMessage);
      });
  }

  public addProduct = (): void => {
    if (this.isProductValid()) {
      this.productsDBService.addProduct(this.product)
        .then((id: number) => {
          id ? console.log("Product added with id:", id) : console.log("There was a problem:", id);
          this.resetProduct();
        })
        .catch(error => console.error("Error while trying to add a new product:", error));
    }
  }

  public resetProduct = (): void => {
    this.product = {
      barCode: "",
      brand: "",
      category: "",
      id: undefined,
      productName: "",
      weightVolume: ""
    }
  }

  public showCategoryDialog = () => {
    let options = {
      title: "Choose product category:",
      message: "",
      cancelButtonText: "Cancel",
      actions: this.categoryList
    };

    action(options).then((result) => {
      if (result && result !== "Cancel") {
        this.product.category = result;
      }
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