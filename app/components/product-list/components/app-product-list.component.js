"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var router_1 = require("@angular/router");
var dialogs_1 = require("ui/dialogs");
var app_categories_database_service_1 = require("~/components/categories/services/app-categories.database.service");
var app_product_list_database_service_1 = require("~/components/product-list/services/app-product-list.database.service");
var app_grocery_list_database_service_1 = require("~/components/grocery-list-details/services/app-grocery-list.database.service");
var AppProductListComponent = /** @class */ (function () {
    function AppProductListComponent(activatedRoute, routerExtensions, categoriesDBService, productsDBService, groceryListDetailsDBService) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.routerExtensions = routerExtensions;
        this.categoriesDBService = categoriesDBService;
        this.productsDBService = productsDBService;
        this.groceryListDetailsDBService = groceryListDetailsDBService;
        //////////////////////////////////////// GETTERS AND SETTERS ///////////////////////////////////////////
        this.getproductsListByCategory = function () { return _this.productsListByCategory && _this.productsListByCategory.length > 0 ? _this.productsListByCategory : []; };
        this.getProductList = function (index) {
            if (_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].productList) {
                // console.log(JSON.stringify(this.productsListByCategory[index]));
                return _this.productsListByCategory[index].productList;
            }
            else {
                return [];
            }
        };
        this.getCategory = function (index) {
            if (_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].category) {
                return _this.productsListByCategory[index].category;
            }
            else {
                return "-";
            }
        };
        this.getProductListHeight = function (index) {
            if (_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].productList) {
                return _this.productsListByCategory[index].productList.length * 78;
            }
            else {
                return 0;
            }
        };
        this.getFilterByText = function () {
            if (_this.categoryList && _this.categoryList.length > 0) {
                return "Filter products by: " + _this.selectedCategory;
            }
            else {
                return "-";
            }
        };
        ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
        this.isProductListEmpty = function (index) {
            return !(_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].productList && _this.productsListByCategory[index].productList.length > 0);
        };
        this.isProductsListByCategoryEmpty = function () {
            return !(_this.productsListByCategory && _this.productsListByCategory.length > 0);
        };
        ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
        this.retrieveproductsListByCategory = function (category) {
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
        this.retrieveProductList = function () {
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
        this.onTapProduct = function (event, categoryIndex) {
            if (_this.readOnlyMode !== "readOnly") {
                var productIndex = event.index;
                var product_1 = _this.getProductList(categoryIndex)[productIndex];
                var categoryName = _this.getCategory(categoryIndex);
                console.log("TAPPED PRODUCT: " + product_1.productName + ", CATEGORY: " + categoryName);
                _this.groceryListDetailsDBService.getListItem(_this.activeListId, product_1.id)
                    .then(function (items) {
                    if (!items || items.length === 0) {
                        _this.groceryListDetailsDBService.insertIntoGroceryListDetails(_this.activeListId, product_1.id, 1)
                            .then(function () { return _this.goToGroceryListDetails(); })
                            .catch(function (error) { return console.error(error); });
                    }
                    else {
                        console.error("Product already present in the current grocery list!");
                    }
                })
                    .catch(function (error) { return console.error(error); });
            }
        };
        this.showCategoryDialog = function () {
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
        this.goToBarcodeScanner = function () {
            console.log("Navigating to Barcode Scanner...");
            _this.routerExtensions.navigate(["/home/productList/barcode-scanner"], {
                transition: {
                    name: "slideLeft",
                    duration: 300
                }
            });
        };
        this.goToGroceryListDetails = function () {
            console.log("Navigating to Grocery List Details...");
            _this.routerExtensions.navigate(["/home/groceryListDetails"], {
                transition: {
                    name: "slideRight",
                    duration: 300
                }
            });
        };
        this.readOnlyParamSubscription = this.activatedRoute.params.subscribe(function (params) {
            _this.readOnlyMode = params['mode'];
            _this.activeListId = params['listId'];
        });
        this.selectedCategory = "All";
        this.categoryList = [];
        this.productsListByCategory = [];
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
}());
exports.AppProductListComponent = AppProductListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFDakYsMENBQWlEO0FBQ2pELHNDQUFvQztBQUVwQyxvSEFBdUc7QUFDdkcsMEhBQXlHO0FBQ3pHLGtJQUEySDtBQVMzSDtJQVFFLGlDQUNVLGNBQThCLEVBQzlCLGdCQUFrQyxFQUNsQyxtQkFBd0MsRUFDeEMsaUJBQW9DLEVBQ3BDLDJCQUF3RDtRQUxsRSxpQkFjQztRQWJTLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQTZCO1FBZ0JsRSx3R0FBd0c7UUFDakcsOEJBQXlCLEdBQUcsY0FBZ0MsT0FBQSxLQUFJLENBQUMsc0JBQXNCLElBQUksS0FBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUF4RyxDQUF3RyxDQUFDO1FBRXJLLG1CQUFjLEdBQUcsVUFBQyxLQUFhO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsSUFBSSxLQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hILG1FQUFtRTtnQkFDbkUsTUFBTSxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDeEQsQ0FBQztZQUFDLElB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QUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQWlGRCx3R0FBd0c7SUFDeEcsNkNBQVcsR0FBWDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9DLENBQUM7UUFBQSxDQUFDO0lBQ0osQ0FBQztJQUFBLENBQUM7SUFoSFMsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFdBQVcsRUFBRSwrREFBK0Q7WUFDNUUsU0FBUyxFQUFFLENBQUMsK0RBQStELENBQUM7WUFDNUUsU0FBUyxFQUFFLENBQUMscURBQW1CLEVBQUUscURBQWlCLEVBQUUsK0RBQTJCLENBQUM7U0FDakYsQ0FBQzt5Q0FVMEIsdUJBQWM7WUFDWixvQ0FBZ0I7WUFDYixxREFBbUI7WUFDckIscURBQWlCO1lBQ1AsK0RBQTJCO09BYnZELHVCQUF1QixDQWlMbkM7SUFBRCw4QkFBQztDQUFBLEFBakxELElBaUxDO0FBakxZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuaW1wb3J0IHsgQ2F0ZWdvcmllc0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvY2F0ZWdvcmllcy9zZXJ2aWNlcy9hcHAtY2F0ZWdvcmllcy5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9wcm9kdWN0LWxpc3Qvc2VydmljZXMvYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvc2VydmljZXMvYXBwLWdyb2NlcnktbGlzdC5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElDYXRlZ29yeVByb2R1Y3RzLCBJUHJvZHVjdCB9IGZyb20gXCJ+L2NvbXBvbmVudHMvdHlwaW5ncy9wcm9kdWN0XCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJhcHAtcHJvZHVjdC1saXN0XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiY29tcG9uZW50cy9wcm9kdWN0LWxpc3Qvdmlld3MvYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiY29tcG9uZW50cy9wcm9kdWN0LWxpc3Qvc3R5bGVzL2FwcC1wcm9kdWN0LWxpc3QuY29tcG9uZW50LmNzc1wiXSxcclxuICBwcm92aWRlcnM6IFtDYXRlZ29yaWVzREJTZXJ2aWNlLCBQcm9kdWN0c0RCU2VydmljZSwgR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwUHJvZHVjdExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyByZWFkT25seVBhcmFtU3Vic2NyaXB0aW9uOiBhbnk7XHJcbiAgcHVibGljIGNhdGVnb3J5TGlzdDogQXJyYXk8c3RyaW5nPjtcclxuICBwdWJsaWMgcHJvZHVjdHNMaXN0QnlDYXRlZ29yeTogQXJyYXk8SUNhdGVnb3J5UHJvZHVjdHM+O1xyXG4gIHB1YmxpYyBzZWxlY3RlZENhdGVnb3J5OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSByZWFkT25seU1vZGU6IHN0cmluZztcclxuICBwcml2YXRlIGFjdGl2ZUxpc3RJZDogbnVtYmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYWN0aXZhdGVkUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBjYXRlZ29yaWVzREJTZXJ2aWNlOiBDYXRlZ29yaWVzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwcm9kdWN0c0RCU2VydmljZTogUHJvZHVjdHNEQlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZTogR3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnJlYWRPbmx5UGFyYW1TdWJzY3JpcHRpb24gPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgdGhpcy5yZWFkT25seU1vZGUgPSBwYXJhbXNbJ21vZGUnXTtcclxuICAgICAgdGhpcy5hY3RpdmVMaXN0SWQgPSBwYXJhbXNbJ2xpc3RJZCddO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBcIkFsbFwiO1xyXG4gICAgdGhpcy5jYXRlZ29yeUxpc3QgPSBbXTtcclxuICAgIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA9IFtdO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnJldHJpZXZlUHJvZHVjdExpc3QoKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEdFVFRFUlMgQU5EIFNFVFRFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBnZXRwcm9kdWN0c0xpc3RCeUNhdGVnb3J5ID0gKCk6IEFycmF5PElDYXRlZ29yeVByb2R1Y3RzPiA9PiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5Lmxlbmd0aCA+IDAgPyB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgOiBbXTtcclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RMaXN0ID0gKGluZGV4OiBudW1iZXIpOiBBcnJheTxJUHJvZHVjdD4gPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSkpO1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDYXRlZ29yeSA9IChpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLmNhdGVnb3J5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLmNhdGVnb3J5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RMaXN0SGVpZ2h0ID0gKGluZGV4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QubGVuZ3RoICogNzg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRGaWx0ZXJCeVRleHQgPSAoKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLmNhdGVnb3J5TGlzdCAmJiB0aGlzLmNhdGVnb3J5TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBgRmlsdGVyIHByb2R1Y3RzIGJ5OiAke3RoaXMuc2VsZWN0ZWRDYXRlZ29yeX1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBDSEVDS0VSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGlzUHJvZHVjdExpc3RFbXB0eSA9IChpbmRleDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gISh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QubGVuZ3RoID4gMCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNQcm9kdWN0c0xpc3RCeUNhdGVnb3J5RW1wdHkgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gISh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5Lmxlbmd0aCA+IDApO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBTRVJWSUNFUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIHJldHJpZXZlcHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA9IChjYXRlZ29yeTogc3RyaW5nKSA9PiB7XHJcbiAgICB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgPSBbXTtcclxuXHJcbiAgICB0aGlzLnByb2R1Y3RzREJTZXJ2aWNlLmdldFByb2R1Y3RzKGNhdGVnb3J5KVxyXG4gICAgICAudGhlbigocHJvZHVjdExpc3Q6IEFycmF5PElQcm9kdWN0PikgPT4ge1xyXG5cclxuICAgICAgICBpZiAocHJvZHVjdExpc3QgJiYgcHJvZHVjdExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5LnB1c2goe1xyXG4gICAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXHJcbiAgICAgICAgICAgIHByb2R1Y3RMaXN0OiBwcm9kdWN0TGlzdFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlUHJvZHVjdExpc3QgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmNhdGVnb3JpZXNEQlNlcnZpY2UuZ2V0Q2F0ZWdvcmllcygpXHJcbiAgICAgIC50aGVuKChjYXRlZ29yaWVzOiBBcnJheTxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3QgPSBjYXRlZ29yaWVzO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlMaXN0LnVuc2hpZnQoXCJBbGxcIik7XHJcblxyXG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVwcm9kdWN0c0xpc3RCeUNhdGVnb3J5KGNhdGVnb3J5KTtcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEhBTkRMRVJTL0FDVElPTlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5yZWFkT25seVBhcmFtU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVhZE9ubHlQYXJhbVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgb25UYXBQcm9kdWN0ID0gKGV2ZW50OiBhbnksIGNhdGVnb3J5SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgaWYgKHRoaXMucmVhZE9ubHlNb2RlICE9PSBcInJlYWRPbmx5XCIpIHtcclxuICAgICAgY29uc3QgcHJvZHVjdEluZGV4OiBudW1iZXIgPSBldmVudC5pbmRleDtcclxuICAgICAgY29uc3QgcHJvZHVjdDogSVByb2R1Y3QgPSB0aGlzLmdldFByb2R1Y3RMaXN0KGNhdGVnb3J5SW5kZXgpW3Byb2R1Y3RJbmRleF07XHJcbiAgICAgIGNvbnN0IGNhdGVnb3J5TmFtZTogc3RyaW5nID0gdGhpcy5nZXRDYXRlZ29yeShjYXRlZ29yeUluZGV4KTtcclxuICAgICAgY29uc29sZS5sb2coYFRBUFBFRCBQUk9EVUNUOiAke3Byb2R1Y3QucHJvZHVjdE5hbWV9LCBDQVRFR09SWTogJHtjYXRlZ29yeU5hbWV9YCk7XHJcblxyXG4gICAgICB0aGlzLmdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZS5nZXRMaXN0SXRlbSh0aGlzLmFjdGl2ZUxpc3RJZCwgcHJvZHVjdC5pZClcclxuICAgICAgICAudGhlbigoaXRlbXM6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICAgIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlLmluc2VydEludG9Hcm9jZXJ5TGlzdERldGFpbHModGhpcy5hY3RpdmVMaXN0SWQsIHByb2R1Y3QuaWQsIDEpXHJcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5nb1RvR3JvY2VyeUxpc3REZXRhaWxzKCkpXHJcbiAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJQcm9kdWN0IGFscmVhZHkgcHJlc2VudCBpbiB0aGUgY3VycmVudCBncm9jZXJ5IGxpc3QhXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzaG93Q2F0ZWdvcnlEaWFsb2cgPSAoKSA9PiB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgdGl0bGU6IFwiQ2hvb3NlIHByb2R1Y3QgY2F0ZWdvcnk6XCIsXHJcbiAgICAgIG1lc3NhZ2U6IFwiXCIsXHJcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCIsXHJcbiAgICAgIGFjdGlvbnM6IHRoaXMuY2F0ZWdvcnlMaXN0XHJcbiAgICB9O1xyXG5cclxuICAgIGFjdGlvbihvcHRpb25zKS50aGVuKChzZWxlY3RlZENhdGVnb3J5KSA9PiB7XHJcbiAgICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ICYmIHNlbGVjdGVkQ2F0ZWdvcnkgIT09IFwiQ2FuY2VsXCIpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBzZWxlY3RlZENhdGVnb3J5O1xyXG4gICAgICAgIGlmIChzZWxlY3RlZENhdGVnb3J5ID09PSBcIkFsbFwiKSB7XHJcbiAgICAgICAgICAvLyBTaG93IGFsbCBwcm9kdWN0c1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZVByb2R1Y3RMaXN0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEZpbHRlciBieSBhIHNwZWNpZmljIGNhdGVnb3J5XHJcbiAgICAgICAgICB0aGlzLnJldHJpZXZlcHJvZHVjdHNMaXN0QnlDYXRlZ29yeShzZWxlY3RlZENhdGVnb3J5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXIgbGlzdCBieTpcIiwgc2VsZWN0ZWRDYXRlZ29yeSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvVG9CYXJjb2RlU2Nhbm5lciA9ICgpOiB2b2lkID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZyB0byBCYXJjb2RlIFNjYW5uZXIuLi5cIik7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvcHJvZHVjdExpc3QvYmFyY29kZS1zY2FubmVyXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ29Ub0dyb2NlcnlMaXN0RGV0YWlscyA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZyB0byBHcm9jZXJ5IExpc3QgRGV0YWlscy4uLlwiKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9ncm9jZXJ5TGlzdERldGFpbHNcIl0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVSaWdodFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19