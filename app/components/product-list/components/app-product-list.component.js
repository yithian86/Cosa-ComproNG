"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var router_1 = require("@angular/router");
var dialogs_1 = require("ui/dialogs");
var app_component_1 = require("~/app.component");
var app_categories_database_service_1 = require("~/components/categories/services/app-categories.database.service");
var app_product_list_database_service_1 = require("~/components/product-list/services/app-product-list.database.service");
var app_grocery_list_database_service_1 = require("~/components/grocery-list-details/services/app-grocery-list.database.service");
var AppProductListComponent = /** @class */ (function (_super) {
    __extends(AppProductListComponent, _super);
    function AppProductListComponent(activatedRoute, routerExtensions, categoriesDBService, productsDBService, groceryListDetailsDBService) {
        var _this = _super.call(this) || this;
        _this.activatedRoute = activatedRoute;
        _this.routerExtensions = routerExtensions;
        _this.categoriesDBService = categoriesDBService;
        _this.productsDBService = productsDBService;
        _this.groceryListDetailsDBService = groceryListDetailsDBService;
        //////////////////////////////////////// GETTERS AND SETTERS ///////////////////////////////////////////
        _this.getproductsListByCategory = function () { return _this.productsListByCategory && _this.productsListByCategory.length > 0 ? _this.productsListByCategory : []; };
        _this.getProductList = function (index) {
            if (_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].productList) {
                // console.log(JSON.stringify(this.productsListByCategory[index]));
                return _this.productsListByCategory[index].productList;
            }
            else {
                return [];
            }
        };
        _this.getCategory = function (index) {
            if (_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].category) {
                return _this.productsListByCategory[index].category;
            }
            else {
                return "-";
            }
        };
        _this.getProductListHeight = function (index) {
            if (_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].productList) {
                return _this.productsListByCategory[index].productList.length * 78;
            }
            else {
                return 0;
            }
        };
        _this.getFilterByText = function () {
            if (_this.categoryList && _this.categoryList.length > 0) {
                return "Filter products by: " + _this.selectedCategory;
            }
            else {
                return "-";
            }
        };
        ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
        _this.isProductListEmpty = function (index) {
            return !(_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].productList && _this.productsListByCategory[index].productList.length > 0);
        };
        _this.isProductsListByCategoryEmpty = function () {
            return !(_this.productsListByCategory && _this.productsListByCategory.length > 0);
        };
        ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
        _this.retrieveproductsListByCategory = function (category) {
            _this.productsListByCategory = [];
            _this.productsDBService.getProducts(category)
                .then(function (productList) {
                if (productList && productList.length > 0) {
                    _this.productsListByCategory.push({
                        category: category,
                        productList: productList
                    });
                }
            })
                .catch(function (error) { return console.error(error); });
        };
        _this.retrieveProductList = function () {
            _this.categoriesDBService.getCategories()
                .then(function (categories) {
                _this.categoryList = categories;
                _this.categoryList.unshift("All");
                categories.forEach(function (category) {
                    _this.retrieveproductsListByCategory(category);
                });
            })
                .catch(function (error) { return console.error(error); });
        };
        _this.onTapProduct = function (event, categoryIndex) {
            if (_this.readOnlyMode !== "readOnly") {
                var productIndex = event.index;
                var product_1 = _this.getProductList(categoryIndex)[productIndex];
                var categoryName = _this.getCategory(categoryIndex);
                console.log("TAPPED PRODUCT: " + product_1.productName + ", CATEGORY: " + categoryName);
                _this.groceryListDetailsDBService.getListItem(_this.activeListId, product_1.id)
                    .then(function (items) {
                    if (!items || items.length === 0) {
                        _this.groceryListDetailsDBService.insertIntoGroceryListDetails(_this.activeListId, product_1.id, 1)
                            .then(function () {
                            _this.displayMessage(product_1.productName + " added to your grocery list!");
                            _this.goToGroceryListDetails();
                        })
                            .catch(function (error) { return console.error(error); });
                    }
                    else {
                        _this.displayMessage(product_1.productName + " already present in your grocery list!", "error");
                    }
                })
                    .catch(function (error) { return console.error(error); });
            }
        };
        _this.showPrices = function (product) {
            var productId = product.id;
            // console.log("SHOW PRICES", product);
            // Get prices for the product with id = productId
            _this.productsDBService.getProductPrices(productId)
                .then(function (productPrices) {
                var stringifiedPrices = [];
                if (productPrices.length > 0) {
                    stringifiedPrices = productPrices.map(function (price) {
                        return "\n            Normal: " + price.normalPrice.toFixed(2) + "\u20AC\n            Special offer: " + price.specialPrice.toFixed(2) + "\u20AC on " + price.specialDate + "\n            Seller: " + price.sellerId + "\n            ";
                    });
                }
                else {
                    stringifiedPrices = ["No prices for this product."];
                }
                // Open dialog window containing all the prices for the clicked product
                var options = {
                    title: "Prices:",
                    message: "",
                    cancelButtonText: "Back",
                    actions: stringifiedPrices
                };
                dialogs_1.action(options);
            })
                .catch(function (error) { return console.error(error); });
        };
        _this.showCategoryDialog = function () {
            var options = {
                title: "Choose product category:",
                message: "",
                cancelButtonText: "Cancel",
                actions: _this.categoryList
            };
            dialogs_1.action(options).then(function (selectedCategory) {
                if (selectedCategory && selectedCategory !== "Cancel") {
                    _this.selectedCategory = selectedCategory;
                    if (selectedCategory === "All") {
                        // Show all products
                        _this.retrieveProductList();
                    }
                    else {
                        // Filter by a specific category
                        _this.retrieveproductsListByCategory(selectedCategory);
                    }
                    console.log("Filter list by:", selectedCategory);
                }
            });
        };
        _this.goToBarcodeScanner = function () {
            console.log("Navigating to Barcode Scanner...");
            _this.routerExtensions.navigate(["/home/productList/barcode-scanner"], {
                transition: {
                    name: "slideLeft",
                    duration: 300
                }
            });
        };
        _this.goToGroceryListDetails = function () {
            console.log("Navigating to Grocery List Details...");
            _this.routerExtensions.navigate(["/home/groceryListDetails"], {
                transition: {
                    name: "slideRight",
                    duration: 300
                }
            });
        };
        _this.readOnlyParamSubscription = _this.activatedRoute.params.subscribe(function (params) {
            _this.readOnlyMode = params['mode'];
            _this.activeListId = params['listId'];
        });
        _this.selectedCategory = "All";
        _this.categoryList = [];
        _this.productsListByCategory = [];
        return _this;
    }
    AppProductListComponent.prototype.ngOnInit = function () {
        this.retrieveProductList();
    };
    ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
    AppProductListComponent.prototype.ngOnDestroy = function () {
        if (this.readOnlyParamSubscription) {
            this.readOnlyParamSubscription.unsubscribe();
        }
        ;
    };
    ;
    AppProductListComponent = __decorate([
        core_1.Component({
            selector: "app-product-list",
            templateUrl: "components/product-list/views/app-product-list.component.html",
            styleUrls: ["components/product-list/styles/app-product-list.component.css"],
            providers: [app_categories_database_service_1.CategoriesDBService, app_product_list_database_service_1.ProductsDBService, app_grocery_list_database_service_1.GroceryListDetailsDBService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_extensions_1.RouterExtensions,
            app_categories_database_service_1.CategoriesDBService,
            app_product_list_database_service_1.ProductsDBService,
            app_grocery_list_database_service_1.GroceryListDetailsDBService])
    ], AppProductListComponent);
    return AppProductListComponent;
}(app_component_1.AppComponent));
exports.AppProductListComponent = AppProductListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFDakYsMENBQWlEO0FBQ2pELHNDQUFvQztBQUVwQyxpREFBK0M7QUFDL0Msb0hBQXVHO0FBQ3ZHLDBIQUF5RztBQUN6RyxrSUFBMkg7QUFTM0g7SUFBNkMsMkNBQVk7SUFRdkQsaUNBQ1UsY0FBOEIsRUFDOUIsZ0JBQWtDLEVBQ2xDLG1CQUF3QyxFQUN4QyxpQkFBb0MsRUFDcEMsMkJBQXdEO1FBTGxFLFlBT0UsaUJBQU8sU0FTUjtRQWZTLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQ0FBMkIsR0FBM0IsMkJBQTJCLENBQTZCO1FBa0JsRSx3R0FBd0c7UUFDakcsK0JBQXlCLEdBQUcsY0FBZ0MsT0FBQSxLQUFJLENBQUMsc0JBQXNCLElBQUksS0FBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUF4RyxDQUF3RyxDQUFDO1FBRXJLLG9CQUFjLEdBQUcsVUFBQyxLQUFhO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsSUFBSSxLQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hILG1FQUFtRTtnQkFDbkUsTUFBTSxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENB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LENBQUMsQ0FBQztRQUNILEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsS0FBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsS0FBSSxDQUFDLHNCQUFzQixHQUFHLEVBQUUsQ0FBQzs7SUFDbkMsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBaUZELHdHQUF3RztJQUN4Ryw2Q0FBVyxHQUFYO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDL0MsQ0FBQztRQUFBLENBQUM7SUFDSixDQUFDO0lBQUEsQ0FBQztJQWxIUyx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLCtEQUErRDtZQUM1RSxTQUFTLEVBQUUsQ0FBQywrREFBK0QsQ0FBQztZQUM1RSxTQUFTLEVBQUUsQ0FBQyxxREFBbUIsRUFBRSxxREFBaUIsRUFBRSwrREFBMkIsQ0FBQztTQUNqRixDQUFDO3lDQVUwQix1QkFBYztZQUNaLG9DQUFnQjtZQUNiLHFEQUFtQjtZQUNyQixxREFBaUI7WUFDUCwrREFBMkI7T0FidkQsdUJBQXVCLENBdU5uQztJQUFELDhCQUFDO0NBQUEsQUF2TkQsQ0FBNkMsNEJBQVksR0F1TnhEO0FBdk5ZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIn4vYXBwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yaWVzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9jYXRlZ29yaWVzL3NlcnZpY2VzL2FwcC1jYXRlZ29yaWVzLmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdHNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9zZXJ2aWNlcy9hcHAtcHJvZHVjdC1saXN0LmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9ncm9jZXJ5LWxpc3QtZGV0YWlscy9zZXJ2aWNlcy9hcHAtZ3JvY2VyeS1saXN0LmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSUNhdGVnb3J5UHJvZHVjdHMsIElQcm9kdWN0IH0gZnJvbSBcIn4vY29tcG9uZW50cy90eXBpbmdzL3Byb2R1Y3RcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1wcm9kdWN0LWxpc3RcIixcclxuICB0ZW1wbGF0ZVVybDogXCJjb21wb25lbnRzL3Byb2R1Y3QtbGlzdC92aWV3cy9hcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJjb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9zdHlsZXMvYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuY3NzXCJdLFxyXG4gIHByb3ZpZGVyczogW0NhdGVnb3JpZXNEQlNlcnZpY2UsIFByb2R1Y3RzREJTZXJ2aWNlLCBHcm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBQcm9kdWN0TGlzdENvbXBvbmVudCBleHRlbmRzIEFwcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIHJlYWRPbmx5UGFyYW1TdWJzY3JpcHRpb246IGFueTtcclxuICBwdWJsaWMgY2F0ZWdvcnlMaXN0OiBBcnJheTxzdHJpbmc+O1xyXG4gIHB1YmxpYyBwcm9kdWN0c0xpc3RCeUNhdGVnb3J5OiBBcnJheTxJQ2F0ZWdvcnlQcm9kdWN0cz47XHJcbiAgcHVibGljIHNlbGVjdGVkQ2F0ZWdvcnk6IHN0cmluZztcclxuICBwcml2YXRlIHJlYWRPbmx5TW9kZTogc3RyaW5nO1xyXG4gIHByaXZhdGUgYWN0aXZlTGlzdElkOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhY3RpdmF0ZWRSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIGNhdGVnb3JpZXNEQlNlcnZpY2U6IENhdGVnb3JpZXNEQlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHByb2R1Y3RzREJTZXJ2aWNlOiBQcm9kdWN0c0RCU2VydmljZSxcclxuICAgIHByaXZhdGUgZ3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlOiBHcm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2VcclxuICApIHtcclxuICAgIHN1cGVyKCk7XHJcblxyXG4gICAgdGhpcy5yZWFkT25seVBhcmFtU3Vic2NyaXB0aW9uID0gdGhpcy5hY3RpdmF0ZWRSb3V0ZS5wYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgIHRoaXMucmVhZE9ubHlNb2RlID0gcGFyYW1zWydtb2RlJ107XHJcbiAgICAgIHRoaXMuYWN0aXZlTGlzdElkID0gcGFyYW1zWydsaXN0SWQnXTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5ID0gXCJBbGxcIjtcclxuICAgIHRoaXMuY2F0ZWdvcnlMaXN0ID0gW107XHJcbiAgICB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgPSBbXTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5yZXRyaWV2ZVByb2R1Y3RMaXN0KCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBHRVRURVJTIEFORCBTRVRURVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgZ2V0cHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA9ICgpOiBBcnJheTxJQ2F0ZWdvcnlQcm9kdWN0cz4gPT4gdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeS5sZW5ndGggPiAwID8gdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5IDogW107XHJcblxyXG4gIHB1YmxpYyBnZXRQcm9kdWN0TGlzdCA9IChpbmRleDogbnVtYmVyKTogQXJyYXk8SVByb2R1Y3Q+ID0+IHtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0KSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0pKTtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3Q7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0Q2F0ZWdvcnkgPSAoaW5kZXg6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5jYXRlZ29yeSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5jYXRlZ29yeTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcIi1cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQcm9kdWN0TGlzdEhlaWdodCA9IChpbmRleDogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0Lmxlbmd0aCAqIDc4O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RmlsdGVyQnlUZXh0ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAodGhpcy5jYXRlZ29yeUxpc3QgJiYgdGhpcy5jYXRlZ29yeUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gYEZpbHRlciBwcm9kdWN0cyBieTogJHt0aGlzLnNlbGVjdGVkQ2F0ZWdvcnl9YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcIi1cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gQ0hFQ0tFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBpc1Byb2R1Y3RMaXN0RW1wdHkgPSAoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuICEodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdCAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0Lmxlbmd0aCA+IDApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzUHJvZHVjdHNMaXN0QnlDYXRlZ29yeUVtcHR5ID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgcmV0dXJuICEodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeS5sZW5ndGggPiAwKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gU0VSVklDRVMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyByZXRyaWV2ZXByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgPSAoY2F0ZWdvcnk6IHN0cmluZykgPT4ge1xyXG4gICAgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ID0gW107XHJcblxyXG4gICAgdGhpcy5wcm9kdWN0c0RCU2VydmljZS5nZXRQcm9kdWN0cyhjYXRlZ29yeSlcclxuICAgICAgLnRoZW4oKHByb2R1Y3RMaXN0OiBBcnJheTxJUHJvZHVjdD4pID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHByb2R1Y3RMaXN0ICYmIHByb2R1Y3RMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeS5wdXNoKHtcclxuICAgICAgICAgICAgY2F0ZWdvcnk6IGNhdGVnb3J5LFxyXG4gICAgICAgICAgICBwcm9kdWN0TGlzdDogcHJvZHVjdExpc3RcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXRyaWV2ZVByb2R1Y3RMaXN0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5jYXRlZ29yaWVzREJTZXJ2aWNlLmdldENhdGVnb3JpZXMoKVxyXG4gICAgICAudGhlbigoY2F0ZWdvcmllczogQXJyYXk8c3RyaW5nPikgPT4ge1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlMaXN0ID0gY2F0ZWdvcmllcztcclxuICAgICAgICB0aGlzLmNhdGVnb3J5TGlzdC51bnNoaWZ0KFwiQWxsXCIpO1xyXG5cclxuICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goKGNhdGVnb3J5KSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnJldHJpZXZlcHJvZHVjdHNMaXN0QnlDYXRlZ29yeShjYXRlZ29yeSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBIQU5ETEVSUy9BQ1RJT05TIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMucmVhZE9ubHlQYXJhbVN1YnNjcmlwdGlvbikge1xyXG4gICAgICB0aGlzLnJlYWRPbmx5UGFyYW1TdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH07XHJcbiAgfTtcclxuXHJcbiAgcHVibGljIG9uVGFwUHJvZHVjdCA9IChldmVudDogYW55LCBjYXRlZ29yeUluZGV4OiBudW1iZXIpOiB2b2lkID0+IHtcclxuICAgIGlmICh0aGlzLnJlYWRPbmx5TW9kZSAhPT0gXCJyZWFkT25seVwiKSB7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RJbmRleDogbnVtYmVyID0gZXZlbnQuaW5kZXg7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3Q6IElQcm9kdWN0ID0gdGhpcy5nZXRQcm9kdWN0TGlzdChjYXRlZ29yeUluZGV4KVtwcm9kdWN0SW5kZXhdO1xyXG4gICAgICBjb25zdCBjYXRlZ29yeU5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0Q2F0ZWdvcnkoY2F0ZWdvcnlJbmRleCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKGBUQVBQRUQgUFJPRFVDVDogJHtwcm9kdWN0LnByb2R1Y3ROYW1lfSwgQ0FURUdPUlk6ICR7Y2F0ZWdvcnlOYW1lfWApO1xyXG5cclxuICAgICAgdGhpcy5ncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UuZ2V0TGlzdEl0ZW0odGhpcy5hY3RpdmVMaXN0SWQsIHByb2R1Y3QuaWQpXHJcbiAgICAgICAgLnRoZW4oKGl0ZW1zOiBBcnJheTxhbnk+KSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZS5pbnNlcnRJbnRvR3JvY2VyeUxpc3REZXRhaWxzKHRoaXMuYWN0aXZlTGlzdElkLCBwcm9kdWN0LmlkLCAxKVxyXG4gICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoYCR7cHJvZHVjdC5wcm9kdWN0TmFtZX0gYWRkZWQgdG8geW91ciBncm9jZXJ5IGxpc3QhYCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdvVG9Hcm9jZXJ5TGlzdERldGFpbHMoKVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheU1lc3NhZ2UoYCR7cHJvZHVjdC5wcm9kdWN0TmFtZX0gYWxyZWFkeSBwcmVzZW50IGluIHlvdXIgZ3JvY2VyeSBsaXN0IWAsIFwiZXJyb3JcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dQcmljZXMgPSAocHJvZHVjdDogSVByb2R1Y3QpOiB2b2lkID0+IHtcclxuICAgIGNvbnN0IHByb2R1Y3RJZDogbnVtYmVyID0gcHJvZHVjdC5pZDtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwiU0hPVyBQUklDRVNcIiwgcHJvZHVjdCk7XHJcblxyXG4gICAgLy8gR2V0IHByaWNlcyBmb3IgdGhlIHByb2R1Y3Qgd2l0aCBpZCA9IHByb2R1Y3RJZFxyXG4gICAgdGhpcy5wcm9kdWN0c0RCU2VydmljZS5nZXRQcm9kdWN0UHJpY2VzKHByb2R1Y3RJZClcclxuICAgICAgLnRoZW4oKHByb2R1Y3RQcmljZXM6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICBsZXQgc3RyaW5naWZpZWRQcmljZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgICAgICBpZiAocHJvZHVjdFByaWNlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICBzdHJpbmdpZmllZFByaWNlcyA9IHByb2R1Y3RQcmljZXMubWFwKChwcmljZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgIE5vcm1hbDogJHtwcmljZS5ub3JtYWxQcmljZS50b0ZpeGVkKDIpfeKCrFxyXG4gICAgICAgICAgICBTcGVjaWFsIG9mZmVyOiAke3ByaWNlLnNwZWNpYWxQcmljZS50b0ZpeGVkKDIpfeKCrCBvbiAke3ByaWNlLnNwZWNpYWxEYXRlfVxyXG4gICAgICAgICAgICBTZWxsZXI6ICR7cHJpY2Uuc2VsbGVySWR9XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgc3RyaW5naWZpZWRQcmljZXMgPSBbXCJObyBwcmljZXMgZm9yIHRoaXMgcHJvZHVjdC5cIl07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBPcGVuIGRpYWxvZyB3aW5kb3cgY29udGFpbmluZyBhbGwgdGhlIHByaWNlcyBmb3IgdGhlIGNsaWNrZWQgcHJvZHVjdFxyXG4gICAgICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgdGl0bGU6IFwiUHJpY2VzOlwiLFxyXG4gICAgICAgICAgbWVzc2FnZTogXCJcIixcclxuICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQmFja1wiLFxyXG4gICAgICAgICAgYWN0aW9uczogc3RyaW5naWZpZWRQcmljZXNcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBhY3Rpb24ob3B0aW9ucyk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd0NhdGVnb3J5RGlhbG9nID0gKCkgPT4ge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHRpdGxlOiBcIkNob29zZSBwcm9kdWN0IGNhdGVnb3J5OlwiLFxyXG4gICAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxyXG4gICAgICBhY3Rpb25zOiB0aGlzLmNhdGVnb3J5TGlzdFxyXG4gICAgfTtcclxuXHJcbiAgICBhY3Rpb24ob3B0aW9ucykudGhlbigoc2VsZWN0ZWRDYXRlZ29yeSkgPT4ge1xyXG4gICAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSAmJiBzZWxlY3RlZENhdGVnb3J5ICE9PSBcIkNhbmNlbFwiKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSA9PT0gXCJBbGxcIikge1xyXG4gICAgICAgICAgLy8gU2hvdyBhbGwgcHJvZHVjdHNcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVQcm9kdWN0TGlzdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBGaWx0ZXIgYnkgYSBzcGVjaWZpYyBjYXRlZ29yeVxyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZXByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkoc2VsZWN0ZWRDYXRlZ29yeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmlsdGVyIGxpc3QgYnk6XCIsIHNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnb1RvQmFyY29kZVNjYW5uZXIgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gQmFyY29kZSBTY2FubmVyLi4uXCIpO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3Byb2R1Y3RMaXN0L2JhcmNvZGUtc2Nhbm5lclwiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZUxlZnRcIixcclxuICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvVG9Hcm9jZXJ5TGlzdERldGFpbHMgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gR3JvY2VyeSBMaXN0IERldGFpbHMuLi5cIik7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvZ3JvY2VyeUxpc3REZXRhaWxzXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlUmlnaHRcIixcclxuICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSJdfQ==