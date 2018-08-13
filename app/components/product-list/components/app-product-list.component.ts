import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { ListPicker } from "tns-core-modules/ui/list-picker/list-picker"

import { CategoriesDBService } from "~/components/categories/services/app-categories.database.service";
import { ProductsDBService } from "~/components/product-list/services/app-product-list.database.service";
import { ICategoryProducts, IProduct } from "~/components/typings/product";

@Component({
  selector: "app-product-list",
  templateUrl: "components/product-list/views/app-product-list.component.html",
  styleUrls: ["components/product-list/styles/app-product-list.component.css"],
  providers: [CategoriesDBService, ProductsDBService]
})
export class AppProductListComponent implements OnInit {
  public categoryList: Array<string>;
  public productsListByCategory: Array<ICategoryProducts>;
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
    this.productsListByCategory = [];
  }

  ngOnInit() {
    this.retrieveProductList();
  }


  //////////////////////////////////////// GETTERS AND SETTERS ///////////////////////////////////////////
  public getproductsListByCategory = (): Array<ICategoryProducts> => this.productsListByCategory && this.productsListByCategory.length > 0 ? this.productsListByCategory : [];

  public getProductList = (index: number): Array<IProduct> => {
    if (this.productsListByCategory && this.productsListByCategory[index] && this.productsListByCategory[index].productList) {
      // console.log(JSON.stringify(this.productsListByCategory[index]));
      return this.productsListByCategory[index].productList;
    } else {
      return [];
    }
  }

  public getCategory = (index: number): string => {
    if (this.productsListByCategory && this.productsListByCategory[index] && this.productsListByCategory[index].category) {
      return this.productsListByCategory[index].category;
    } else {
      return "-";
    }
  }

  public getProductListHeight = (index: number): number => {
    if (this.productsListByCategory && this.productsListByCategory[index] && this.productsListByCategory[index].productList) {
      return this.productsListByCategory[index].productList.length * 78;
    } else {
      return 0;
    }
  }

  public getFilterByText = (): string => {
    if (this.categoryList && this.categoryList.length > 0) {
      return `Filter products by: ${this.categoryList[this.selectedCategoryIndex]}`;
    } else {
      return "-";
    }
  }


  ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
  public isProductListEmpty = (index: number): boolean => {
    return !(this.productsListByCategory && this.productsListByCategory[index] && this.productsListByCategory[index].productList && this.productsListByCategory[index].productList.length > 0);
  }

  public isproductsListByCategoryEmpty = (): boolean => {
    return !(this.productsListByCategory && this.productsListByCategory.length > 0);
  }


  ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
  public retrieveproductsListByCategory = (category: string) => {
    this.productsListByCategory = [];

    this.productsDBService.getProducts(category)
      .then((productList: Array<IProduct>) => {

        if (productList && productList.length > 0) {
          this.productsListByCategory.push({
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
          this.retrieveproductsListByCategory(category);
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
          this.retrieveproductsListByCategory(selectedCategory);
        }
        console.log("Filter list by:", this.categoryList[this.selectedCategoryIndex]);
      }
      this.isFilterByOpened = false;
    }
  }

  public onTapProduct = (event: any, categoryIndex: number) => {
    const productIndex: number = event.index;
    const product: IProduct = this.getProductList(categoryIndex)[productIndex];
    const categoryName: string = this.getCategory(categoryIndex);

    console.log(`TAPPED PRODUCT: ${product.productName}, CATEGORY: ${categoryName}`);
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