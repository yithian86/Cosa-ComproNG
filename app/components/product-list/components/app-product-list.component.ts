import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { ListPicker } from "ui/list-picker"

import { CategoriesDBService } from "~/components/categories/services/app-categories.database.service";
import { ProductsDBService } from "~/components/product-list/services/app-products.database.service";

@Component({
  selector: "app-product-list",
  templateUrl: "components/product-list/views/app-product-list.component.html",
  styleUrls: ["components/product-list/styles/app-product-list.component.css"],
  providers: [CategoriesDBService, ProductsDBService]
})
export class AppProductListComponent implements OnInit {
  public categoryList: Array<string>;
  public productListByCategory: Array<any>;
  public selectedCategoryIndex: number;
  public isFilterByOpened: boolean;
  public isAddProductOpened: boolean;

  constructor(
    private routerExtensions: RouterExtensions,
    private categoriesDBService: CategoriesDBService,
    private productsDBService: ProductsDBService
  ) {
    this.selectedCategoryIndex = 0;
    this.categoryList = [];
    this.productListByCategory = [];
  }

  ngOnInit() {
    this.retrieveProductList();
  }


  //////////////////////////////////////// GETTERS AND SETTERS ///////////////////////////////////////////
  public getProductListByCategory = () => this.productListByCategory && this.productListByCategory.length > 0 ? this.productListByCategory : [];

  public getProductList = (index: number): Array<any> => {
    if (this.productListByCategory && this.productListByCategory[index] && this.productListByCategory[index].productList) {
      // console.log(JSON.stringify(this.productListByCategory[index]));
      return this.productListByCategory[index].productList;
    } else {
      return [];
    }
  }

  public getCategory = (index: number): string => {
    if (this.productListByCategory && this.productListByCategory[index] && this.productListByCategory[index].category) {
      return this.productListByCategory[index].category;
    } else {
      return "-";
    }
  }

  public getProductListHeight = (index: number) => {
    if (this.productListByCategory && this.productListByCategory[index] && this.productListByCategory[index].productList) {
      return this.productListByCategory[index].productList.length * 78;
    } else {
      return 0;
    }
  }

  public getFilterByText = () => {
    if (this.categoryList && this.categoryList.length > 0) {
      return `Filter products by: ${this.categoryList[this.selectedCategoryIndex]}`;
    } else {
      return "-";
    }
  }


  ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
  public isProductListEmpty = (index: number) => {
    return !(this.productListByCategory && this.productListByCategory[index] && this.productListByCategory[index].productList && this.productListByCategory[index].productList.length > 0);
  }

  public isProductListByCategoryEmpty = () => {
    return !(this.productListByCategory && this.productListByCategory.length > 0);
  }


  ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
  public retrieveProductListByCategory = (category: string) => {
    this.productListByCategory = [];

    this.productsDBService.getProducts(category)
      .then((productList: Array<any>) => {

        if (productList && productList.length > 0) {
          this.productListByCategory.push({
            category: category,
            productList: productList
          });
        }
      })
      .catch(error => console.error(error));
  }

  public retrieveProductList = () => {
    this.categoriesDBService.getCategories()
      .then((categories: Array<string>) => {
        this.categoryList = categories;
        this.categoryList.unshift("All");

        categories.forEach((category) => {
          this.retrieveProductListByCategory(category);
        })
      })
      .catch(error => console.error(error));
  }


  ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
  public onCategorySelected = (event?: any) => {
    if (event && event.object) {
      const picker: any = <ListPicker>event.object;
      this.selectedCategoryIndex = picker.selectedIndex;
    } else {
      if (this.categoryList && this.categoryList.length > 0) {
        if (this.selectedCategoryIndex === 0) {
          // Show all products
          this.retrieveProductList();
        } else {
          // Filter by a specific category
          const selectedCategory: string = this.categoryList[this.selectedCategoryIndex];
          this.retrieveProductListByCategory(selectedCategory);
        }
        console.log("Filter list by:", this.categoryList[this.selectedCategoryIndex]);
      }
      this.isFilterByOpened = false;
    }
  }

  public onTapProduct = () => {
    console.log("TAPPED PRODUCT!");
  }

  public goToBarcodeScanner = () => {
    console.log("Navigating to Barcode Scanner...");
    this.routerExtensions.navigate(["/home/productList/barcodeScanner"], {
      transition: {
        name: "slideLeft",
        duration: 300
      }
    });
  }

  public goToGroceryListDetails = () => {
    console.log("Navigating to Grocery List Details...");
    this.routerExtensions.navigate(["/home/groceryList/groceryListDetails"], {
      transition: {
        name: "slideRight",
        duration: 300
      }
    });
  }
}