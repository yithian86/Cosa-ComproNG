import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { ActivatedRoute } from '@angular/router';
import { action } from "ui/dialogs";

import { AppComponent } from "~/app.component";
import { CategoriesDBService } from "~/components/categories/services/app-categories.database.service";
import { ProductsDBService } from "~/components/product-list/services/app-product-list.database.service";
import { GroceryListDetailsDBService } from "~/components/grocery-list-details/services/app-grocery-list.database.service";
import { ICategoryProducts, IProduct } from "~/components/typings/product";

var applicationSettings = require("application-settings");

@Component({
  selector: "app-product-list",
  templateUrl: "components/product-list/views/app-product-list.component.html",
  styleUrls: ["components/product-list/styles/app-product-list.component.css"],
  providers: [CategoriesDBService, ProductsDBService, GroceryListDetailsDBService]
})
export class AppProductListComponent extends AppComponent implements OnInit {
  public readOnlyParamSubscription: any;
  public categoryList: Array<string>;
  public productsListByCategory: Array<ICategoryProducts>;
  public selectedCategory: string;
  private readOnlyMode: string;
  private activeListId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private categoriesDBService: CategoriesDBService,
    private productsDBService: ProductsDBService,
    private groceryListDetailsDBService: GroceryListDetailsDBService
  ) {
    super();

    this.readOnlyParamSubscription = this.activatedRoute.params.subscribe(params => {
      this.readOnlyMode = params['mode'];
      this.activeListId = params['listId'] ? params['listId'] : applicationSettings.getNumber("activeListId");
    });
    this.selectedCategory = "All";
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
      return `Filter products by: ${this.selectedCategory}`;
    } else {
      return "-";
    }
  }


  ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
  public isProductListEmpty = (index: number): boolean => {
    return !(this.productsListByCategory && this.productsListByCategory[index] && this.productsListByCategory[index].productList && this.productsListByCategory[index].productList.length > 0);
  }

  public isProductsListByCategoryEmpty = (): boolean => {
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
  ngOnDestroy() {
    if (this.readOnlyParamSubscription) {
      this.readOnlyParamSubscription.unsubscribe();
    };
  };

  public onTapProduct = (categoryIndex: number, productIndex: number): void => {
    if (this.readOnlyMode !== "readOnly") {
      const product: IProduct = this.getProductList(categoryIndex)[productIndex];
      const categoryName: string = this.getCategory(categoryIndex);
      console.log(`TAPPED PRODUCT: ${product.productName}, CATEGORY: ${categoryName}`);

      this.groceryListDetailsDBService.getListItem(this.activeListId, product.id)
        .then((items: Array<any>) => {
          if (!items || items.length === 0) {
            this.groceryListDetailsDBService.insertIntoGroceryListDetails(this.activeListId, product.id, 1)
              .then(() => {
                this.displayMessage(`${product.productName} added to your grocery list!`);
                this.goToGroceryListDetails()
              })
              .catch(error => console.error(error));
          } else {
            this.displayMessage(`${product.productName} already present in your grocery list!`, "error");
          }
        })
        .catch(error => console.error(error));
    }
  }

  public showPrices = (product: IProduct): void => {
    const productId: number = product.id;
    // console.log("SHOW PRICES", product);

    // Get prices for the product with id = productId
    this.productsDBService.getProductPrices(productId)
      .then((productPrices: Array<any>) => {
        let stringifiedPrices: Array<string> = [];
        if (productPrices.length > 0) {
          stringifiedPrices = productPrices.map((price: any) => {
            return `
            Normal: ${price.normalPrice.toFixed(2)}€
            Special offer: ${price.specialPrice.toFixed(2)}€ on ${price.specialDate}
            Seller: ${price.sellerId}
            `;
          });
        } else {
          stringifiedPrices = ["No prices for this product."];
        }

        // Open dialog window containing all the prices for the clicked product
        let options = {
          title: "Prices:",
          message: "",
          cancelButtonText: "Back",
          actions: stringifiedPrices
        };

        action(options);
      })
      .catch(error => console.error(error));
  }

  public showCategoryDialog = () => {
    let options = {
      title: "Choose product category:",
      message: "",
      cancelButtonText: "Cancel",
      actions: this.categoryList
    };

    action(options).then((selectedCategory) => {
      if (selectedCategory && selectedCategory !== "Cancel") {
        this.selectedCategory = selectedCategory;
        if (selectedCategory === "All") {
          // Show all products
          this.retrieveProductList();
        } else {
          // Filter by a specific category
          this.retrieveproductsListByCategory(selectedCategory);
        }
        console.log("Filter list by:", selectedCategory);
      }
    });
  }

  public goToBarcodeScanner = (): void => {
    console.log("Navigating to Barcode Scanner...");
    this.routerExtensions.navigate(["/home/productList/barcode-scanner"], {
      transition: {
        name: "slideLeft",
        duration: 300
      }
    });
  }

  public goToGroceryListDetails = () => {
    console.log("Navigating to Grocery List Details...");
    this.routerExtensions.navigate(["/home/groceryListDetails"], {
      transition: {
        name: "slideRight",
        duration: 300
      }
    });
  }
}