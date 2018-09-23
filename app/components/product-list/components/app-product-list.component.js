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
        _this.onTapProduct = function (categoryIndex, productIndex) {
            if (_this.readOnlyMode !== "readOnly") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFDakYsMENBQWlEO0FBQ2pELHNDQUFvQztBQUVwQyxpREFBK0M7QUFDL0Msb0hBQXVHO0FBQ3ZHLDBIQUF5RztBQUN6RyxrSUFBMkg7QUFTM0g7SUFBNkMsMkNBQVk7SUFRdkQsaUNBQ1UsY0FBOEIsRUFDOUIsZ0JBQWtDLEVBQ2xDLG1CQUF3QyxFQUN4QyxpQkFBb0MsRUFDcEMsMkJBQXdEO1FBTGxFLFlBT0UsaUJBQU8sU0FTUjtRQWZTLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQ0FBMkIsR0FBM0IsMkJBQTJCLENBQTZCO1FBa0JsRSx3R0FBd0c7UUFDakcsK0JBQXlCLEdBQUcsY0FBZ0MsT0FBQSxLQUFJLENBQUMsc0JBQXNCLElBQUksS0FBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUF4RyxDQUF3RyxDQUFDO1FBRXJLLG9CQUFjLEdBQUcsVUFBQyxLQUFhO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsSUFBSSxLQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hILG1FQUFtRTtnQkFDbkUsTUFBTSxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENB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SyxDQUFDO1FBQzlCLEtBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxzQkFBc0IsR0FBRyxFQUFFLENBQUM7O0lBQ25DLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQWlGRCx3R0FBd0c7SUFDeEcsNkNBQVcsR0FBWDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLENBQUM7UUFBQSxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7SUFsSFMsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSwrREFBK0Q7WUFDNUUsU0FBUyxFQUFFLENBQUMsK0RBQStELENBQUM7WUFDNUUsU0FBUyxFQUFFLENBQUMscURBQW1CLEVBQUUscURBQWlCLEVBQUUsK0RBQTJCLENBQUM7U0FDakYsQ0FBQzt5Q0FVMEIsdUJBQWM7WUFDWixvQ0FBZ0I7WUFDYixxREFBbUI7WUFDckIscURBQWlCO1lBQ1AsK0RBQTJCO09BYnZELHVCQUF1QixDQXNObkM7SUFBRCw4QkFBQztDQUFBLEFBdE5ELENBQTZDLDRCQUFZLEdBc054RDtBQXROWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL3JvdXRlci1leHRlbnNpb25zXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCJ+L2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2F0ZWdvcmllc0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvY2F0ZWdvcmllcy9zZXJ2aWNlcy9hcHAtY2F0ZWdvcmllcy5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9wcm9kdWN0LWxpc3Qvc2VydmljZXMvYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvc2VydmljZXMvYXBwLWdyb2NlcnktbGlzdC5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElDYXRlZ29yeVByb2R1Y3RzLCBJUHJvZHVjdCB9IGZyb20gXCJ+L2NvbXBvbmVudHMvdHlwaW5ncy9wcm9kdWN0XCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJhcHAtcHJvZHVjdC1saXN0XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiY29tcG9uZW50cy9wcm9kdWN0LWxpc3Qvdmlld3MvYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiY29tcG9uZW50cy9wcm9kdWN0LWxpc3Qvc3R5bGVzL2FwcC1wcm9kdWN0LWxpc3QuY29tcG9uZW50LmNzc1wiXSxcclxuICBwcm92aWRlcnM6IFtDYXRlZ29yaWVzREJTZXJ2aWNlLCBQcm9kdWN0c0RCU2VydmljZSwgR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwUHJvZHVjdExpc3RDb21wb25lbnQgZXh0ZW5kcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyByZWFkT25seVBhcmFtU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgcHVibGljIGNhdGVnb3J5TGlzdDogQXJyYXk8c3RyaW5nPjtcclxuICBwdWJsaWMgcHJvZHVjdHNMaXN0QnlDYXRlZ29yeTogQXJyYXk8SUNhdGVnb3J5UHJvZHVjdHM+O1xyXG4gIHB1YmxpYyBzZWxlY3RlZENhdGVnb3J5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSByZWFkT25seU1vZGU6IHN0cmluZztcclxuICBwcml2YXRlIGFjdGl2ZUxpc3RJZDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBjYXRlZ29yaWVzREJTZXJ2aWNlOiBDYXRlZ29yaWVzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwcm9kdWN0c0RCU2VydmljZTogUHJvZHVjdHNEQlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZTogR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG5cclxuICAgIHRoaXMucmVhZE9ubHlQYXJhbVN1YnNjcmlwdGlvbiA9IHRoaXMuYWN0aXZhdGVkUm91dGUucGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICB0aGlzLnJlYWRPbmx5TW9kZSA9IHBhcmFtc1snbW9kZSddO1xyXG4gICAgICB0aGlzLmFjdGl2ZUxpc3RJZCA9IHBhcmFtc1snbGlzdElkJ107XHJcbiAgICB9KTtcclxuICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IFwiQWxsXCI7XHJcbiAgICB0aGlzLmNhdGVnb3J5TGlzdCA9IFtdO1xyXG4gICAgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ID0gW107XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucmV0cmlldmVQcm9kdWN0TGlzdCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gR0VUVEVSUyBBTkQgU0VUVEVSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGdldHByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgPSAoKTogQXJyYXk8SUNhdGVnb3J5UHJvZHVjdHM+ID0+IHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkubGVuZ3RoID4gMCA/IHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA6IFtdO1xyXG5cclxuICBwdWJsaWMgZ2V0UHJvZHVjdExpc3QgPSAoaW5kZXg6IG51bWJlcik6IEFycmF5PElQcm9kdWN0PiA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdCkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdKSk7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENhdGVnb3J5ID0gKGluZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0uY2F0ZWdvcnkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0uY2F0ZWdvcnk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UHJvZHVjdExpc3RIZWlnaHQgPSAoaW5kZXg6IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdC5sZW5ndGggKiA3ODtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEZpbHRlckJ5VGV4dCA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHRoaXMuY2F0ZWdvcnlMaXN0ICYmIHRoaXMuY2F0ZWdvcnlMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGBGaWx0ZXIgcHJvZHVjdHMgYnk6ICR7dGhpcy5zZWxlY3RlZENhdGVnb3J5fWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIENIRUNLRVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgaXNQcm9kdWN0TGlzdEVtcHR5ID0gKGluZGV4OiBudW1iZXIpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiAhKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdC5sZW5ndGggPiAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc1Byb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlFbXB0eSA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiAhKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkubGVuZ3RoID4gMCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFNFUlZJQ0VTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgcmV0cmlldmVwcm9kdWN0c0xpc3RCeUNhdGVnb3J5ID0gKGNhdGVnb3J5OiBzdHJpbmcpID0+IHtcclxuICAgIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMucHJvZHVjdHNEQlNlcnZpY2UuZ2V0UHJvZHVjdHMoY2F0ZWdvcnkpXHJcbiAgICAgIC50aGVuKChwcm9kdWN0TGlzdDogQXJyYXk8SVByb2R1Y3Q+KSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwcm9kdWN0TGlzdCAmJiBwcm9kdWN0TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkucHVzaCh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgICAgICAgICAgcHJvZHVjdExpc3Q6IHByb2R1Y3RMaXN0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV0cmlldmVQcm9kdWN0TGlzdCA9ICgpID0+IHtcclxuICAgIHRoaXMuY2F0ZWdvcmllc0RCU2VydmljZS5nZXRDYXRlZ29yaWVzKClcclxuICAgICAgLnRoZW4oKGNhdGVnb3JpZXM6IEFycmF5PHN0cmluZz4pID0+IHtcclxuICAgICAgICB0aGlzLmNhdGVnb3J5TGlzdCA9IGNhdGVnb3JpZXM7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3QudW5zaGlmdChcIkFsbFwiKTtcclxuXHJcbiAgICAgICAgY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZXByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkoY2F0ZWdvcnkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gSEFORExFUlMvQUNUSU9OUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLnJlYWRPbmx5UGFyYW1TdWJzY3JpcHRpb24pIHtcclxuICAgICAgdGhpcy5yZWFkT25seVBhcmFtU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9O1xyXG4gIH07XHJcblxyXG4gIHB1YmxpYyBvblRhcFByb2R1Y3QgPSAoY2F0ZWdvcnlJbmRleDogbnVtYmVyLCBwcm9kdWN0SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgaWYgKHRoaXMucmVhZE9ubHlNb2RlICE9PSBcInJlYWRPbmx5XCIpIHtcclxuICAgICAgY29uc3QgcHJvZHVjdDogSVByb2R1Y3QgPSB0aGlzLmdldFByb2R1Y3RMaXN0KGNhdGVnb3J5SW5kZXgpW3Byb2R1Y3RJbmRleF07XHJcbiAgICAgIGNvbnN0IGNhdGVnb3J5TmFtZTogc3RyaW5nID0gdGhpcy5nZXRDYXRlZ29yeShjYXRlZ29yeUluZGV4KTtcclxuICAgICAgY29uc29sZS5sb2coYFRBUFBFRCBQUk9EVUNUOiAke3Byb2R1Y3QucHJvZHVjdE5hbWV9LCBDQVRFR09SWTogJHtjYXRlZ29yeU5hbWV9YCk7XHJcblxyXG4gICAgICB0aGlzLmdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZS5nZXRMaXN0SXRlbSh0aGlzLmFjdGl2ZUxpc3RJZCwgcHJvZHVjdC5pZClcclxuICAgICAgICAudGhlbigoaXRlbXM6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICAgIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlLmluc2VydEludG9Hcm9jZXJ5TGlzdERldGFpbHModGhpcy5hY3RpdmVMaXN0SWQsIHByb2R1Y3QuaWQsIDEpXHJcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShgJHtwcm9kdWN0LnByb2R1Y3ROYW1lfSBhZGRlZCB0byB5b3VyIGdyb2NlcnkgbGlzdCFgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29Ub0dyb2NlcnlMaXN0RGV0YWlscygpXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShgJHtwcm9kdWN0LnByb2R1Y3ROYW1lfSBhbHJlYWR5IHByZXNlbnQgaW4geW91ciBncm9jZXJ5IGxpc3QhYCwgXCJlcnJvclwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd1ByaWNlcyA9IChwcm9kdWN0OiBJUHJvZHVjdCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgcHJvZHVjdElkOiBudW1iZXIgPSBwcm9kdWN0LmlkO1xyXG4gICAgLy8gY29uc29sZS5sb2coXCJTSE9XIFBSSUNFU1wiLCBwcm9kdWN0KTtcclxuXHJcbiAgICAvLyBHZXQgcHJpY2VzIGZvciB0aGUgcHJvZHVjdCB3aXRoIGlkID0gcHJvZHVjdElkXHJcbiAgICB0aGlzLnByb2R1Y3RzREJTZXJ2aWNlLmdldFByb2R1Y3RQcmljZXMocHJvZHVjdElkKVxyXG4gICAgICAudGhlbigocHJvZHVjdFByaWNlczogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgIGxldCBzdHJpbmdpZmllZFByaWNlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG4gICAgICAgIGlmIChwcm9kdWN0UHJpY2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgIHN0cmluZ2lmaWVkUHJpY2VzID0gcHJvZHVjdFByaWNlcy5tYXAoKHByaWNlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgTm9ybWFsOiAke3ByaWNlLm5vcm1hbFByaWNlLnRvRml4ZWQoMil94oKsXHJcbiAgICAgICAgICAgIFNwZWNpYWwgb2ZmZXI6ICR7cHJpY2Uuc3BlY2lhbFByaWNlLnRvRml4ZWQoMil94oKsIG9uICR7cHJpY2Uuc3BlY2lhbERhdGV9XHJcbiAgICAgICAgICAgIFNlbGxlcjogJHtwcmljZS5zZWxsZXJJZH1cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBzdHJpbmdpZmllZFByaWNlcyA9IFtcIk5vIHByaWNlcyBmb3IgdGhpcyBwcm9kdWN0LlwiXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE9wZW4gZGlhbG9nIHdpbmRvdyBjb250YWluaW5nIGFsbCB0aGUgcHJpY2VzIGZvciB0aGUgY2xpY2tlZCBwcm9kdWN0XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICB0aXRsZTogXCJQcmljZXM6XCIsXHJcbiAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJCYWNrXCIsXHJcbiAgICAgICAgICBhY3Rpb25zOiBzdHJpbmdpZmllZFByaWNlc1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGFjdGlvbihvcHRpb25zKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93Q2F0ZWdvcnlEaWFsb2cgPSAoKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgdGl0bGU6IFwiQ2hvb3NlIHByb2R1Y3QgY2F0ZWdvcnk6XCIsXHJcbiAgICAgIG1lc3NhZ2U6IFwiXCIsXHJcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXHJcbiAgICAgIGFjdGlvbnM6IHRoaXMuY2F0ZWdvcnlMaXN0XHJcbiAgICB9O1xyXG5cclxuICAgIGFjdGlvbihvcHRpb25zKS50aGVuKChzZWxlY3RlZENhdGVnb3J5KSA9PiB7XHJcbiAgICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ICYmIHNlbGVjdGVkQ2F0ZWdvcnkgIT09IFwiQ2FuY2VsXCIpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5O1xyXG4gICAgICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ID09PSBcIkFsbFwiKSB7XHJcbiAgICAgICAgICAvLyBTaG93IGFsbCBwcm9kdWN0c1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZVByb2R1Y3RMaXN0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEZpbHRlciBieSBhIHNwZWNpZmljIGNhdGVnb3J5XHJcbiAgICAgICAgICB0aGlzLnJldHJpZXZlcHJvZHVjdHNMaXN0QnlDYXRlZ29yeShzZWxlY3RlZENhdGVnb3J5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXIgbGlzdCBieTpcIiwgc2VsZWN0ZWRDYXRlZ29yeSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvVG9CYXJjb2RlU2Nhbm5lciA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZyB0byBCYXJjb2RlIFNjYW5uZXIuLi5cIik7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvcHJvZHVjdExpc3QvYmFyY29kZS1zY2FubmVyXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ29Ub0dyb2NlcnlMaXN0RGV0YWlscyA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZyB0byBHcm9jZXJ5IExpc3QgRGV0YWlscy4uLlwiKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9ncm9jZXJ5TGlzdERldGFpbHNcIl0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVSaWdodFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19