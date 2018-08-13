"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var app_categories_database_service_1 = require("~/components/categories/services/app-categories.database.service");
var app_product_list_database_service_1 = require("~/components/product-list/services/app-product-list.database.service");
var AppProductListComponent = /** @class */ (function () {
    function AppProductListComponent(routerExtensions, categoriesDBService, productsDBService) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.categoriesDBService = categoriesDBService;
        this.productsDBService = productsDBService;
        //////////////////////////////////////// GETTERS AND SETTERS ///////////////////////////////////////////
        this.getProductListByCategory = function () { return _this.productListByCategory && _this.productListByCategory.length > 0 ? _this.productListByCategory : []; };
        this.getProductList = function (index) {
            if (_this.productListByCategory && _this.productListByCategory[index] && _this.productListByCategory[index].productList) {
                // console.log(JSON.stringify(this.productListByCategory[index]));
                return _this.productListByCategory[index].productList;
            }
            else {
                return [];
            }
        };
        this.getCategory = function (index) {
            if (_this.productListByCategory && _this.productListByCategory[index] && _this.productListByCategory[index].category) {
                return _this.productListByCategory[index].category;
            }
            else {
                return "-";
            }
        };
        this.getProductListHeight = function (index) {
            if (_this.productListByCategory && _this.productListByCategory[index] && _this.productListByCategory[index].productList) {
                return _this.productListByCategory[index].productList.length * 78;
            }
            else {
                return 0;
            }
        };
        this.getFilterByText = function () {
            if (_this.categoryList && _this.categoryList.length > 0) {
                return "Filter products by: " + _this.categoryList[_this.selectedCategoryIndex];
            }
            else {
                return "-";
            }
        };
        ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
        this.isProductListEmpty = function (index) {
            return !(_this.productListByCategory && _this.productListByCategory[index] && _this.productListByCategory[index].productList && _this.productListByCategory[index].productList.length > 0);
        };
        this.isProductListByCategoryEmpty = function () {
            return !(_this.productListByCategory && _this.productListByCategory.length > 0);
        };
        ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
        this.retrieveProductListByCategory = function (category) {
            _this.productListByCategory = [];
            _this.productsDBService.getProducts(category)
                .then(function (productList) {
                if (productList && productList.length > 0) {
                    _this.productListByCategory.push({
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
                    _this.retrieveProductListByCategory(category);
                });
            })
                .catch(function (error) { return console.error(error); });
        };
        ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
        this.onCategorySelected = function (event) {
            if (event && event.object) {
                var picker = event.object;
                _this.selectedCategoryIndex = picker.selectedIndex;
            }
            else {
                if (_this.categoryList && _this.categoryList.length > 0) {
                    if (_this.selectedCategoryIndex === 0) {
                        // Show all products
                        _this.retrieveProductList();
                    }
                    else {
                        // Filter by a specific category
                        var selectedCategory = _this.categoryList[_this.selectedCategoryIndex];
                        _this.retrieveProductListByCategory(selectedCategory);
                    }
                    console.log("Filter list by:", _this.categoryList[_this.selectedCategoryIndex]);
                }
                _this.isFilterByOpened = false;
            }
        };
        this.onTapProduct = function (event, categoryIndex) {
            var productIndex = event.index;
            var product = _this.getProductList(categoryIndex)[productIndex];
            var categoryName = _this.getCategory(categoryIndex);
            console.log("TAPPED PRODUCT: " + product.productName + ", CATEGORY: " + categoryName);
        };
        this.goToBarcodeScanner = function () {
            console.log("Navigating to Barcode Scanner...");
            _this.routerExtensions.navigate(["/home/productList/barcodeScanner"], {
                transition: {
                    name: "slideLeft",
                    duration: 300
                }
            });
        };
        this.goToGroceryListDetails = function () {
            console.log("Navigating to Grocery List Details...");
            _this.routerExtensions.navigate(["/home/groceryList/groceryListDetails"], {
                transition: {
                    name: "slideRight",
                    duration: 300
                }
            });
        };
        this.selectedCategoryIndex = 0;
        this.categoryList = [];
        this.productListByCategory = [];
    }
    AppProductListComponent.prototype.ngOnInit = function () {
        this.retrieveProductList();
    };
    AppProductListComponent = __decorate([
        core_1.Component({
            selector: "app-product-list",
            templateUrl: "components/product-list/views/app-product-list.component.html",
            styleUrls: ["components/product-list/styles/app-product-list.component.css"],
            providers: [app_categories_database_service_1.CategoriesDBService, app_product_list_database_service_1.ProductsDBService]
        }),
        __metadata("design:paramtypes", [router_extensions_1.RouterExtensions,
            app_categories_database_service_1.CategoriesDBService,
            app_product_list_database_service_1.ProductsDBService])
    ], AppProductListComponent);
    return AppProductListComponent;
}());
exports.AppProductListComponent = AppProductListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFHakYsb0hBQXVHO0FBQ3ZHLDBIQUF5RztBQVF6RztJQU9FLGlDQUNVLGdCQUFrQyxFQUNsQyxtQkFBd0MsRUFDeEMsaUJBQW9DO1FBSDlDLGlCQVFDO1FBUFMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFZOUMsd0dBQXdHO1FBQ2pHLDZCQUF3QixHQUFHLGNBQU0sT0FBQSxLQUFJLENBQUMscUJBQXFCLElBQUksS0FBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFyRyxDQUFxRyxDQUFDO1FBRXZJLG1CQUFjLEdBQUcsVUFBQyxLQUFhO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsSUFBSSxLQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JILGtFQUFrRTtnQkFDbEUsTUFBTSxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUM7WUFDdkQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDWixDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBRU0sZ0JBQVcsR0FBRyxVQUFDLEtBQWE7WUFDakMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLHFCQUFx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QUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVELDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBbkJVLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsK0RBQStEO1lBQzVFLFNBQVMsRUFBRSxDQUFDLCtEQUErRCxDQUFDO1lBQzVFLFNBQVMsRUFBRSxDQUFDLHFEQUFtQixFQUFFLHFEQUFpQixDQUFDO1NBQ3BELENBQUM7eUNBUzRCLG9DQUFnQjtZQUNiLHFEQUFtQjtZQUNyQixxREFBaUI7T0FWbkMsdUJBQXVCLENBb0puQztJQUFELDhCQUFDO0NBQUEsQUFwSkQsSUFvSkM7QUFwSlksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9uc1wiO1xyXG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXIvbGlzdC1waWNrZXJcIlxyXG5cclxuaW1wb3J0IHsgQ2F0ZWdvcmllc0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvY2F0ZWdvcmllcy9zZXJ2aWNlcy9hcHAtY2F0ZWdvcmllcy5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3RzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9wcm9kdWN0LWxpc3Qvc2VydmljZXMvYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJhcHAtcHJvZHVjdC1saXN0XCIsXHJcbiAgdGVtcGxhdGVVcmw6IFwiY29tcG9uZW50cy9wcm9kdWN0LWxpc3Qvdmlld3MvYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wiY29tcG9uZW50cy9wcm9kdWN0LWxpc3Qvc3R5bGVzL2FwcC1wcm9kdWN0LWxpc3QuY29tcG9uZW50LmNzc1wiXSxcclxuICBwcm92aWRlcnM6IFtDYXRlZ29yaWVzREJTZXJ2aWNlLCBQcm9kdWN0c0RCU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFByb2R1Y3RMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgY2F0ZWdvcnlMaXN0OiBBcnJheTxzdHJpbmc+O1xyXG4gIHB1YmxpYyBwcm9kdWN0TGlzdEJ5Q2F0ZWdvcnk6IEFycmF5PGFueT47XHJcbiAgcHVibGljIHNlbGVjdGVkQ2F0ZWdvcnlJbmRleDogbnVtYmVyO1xyXG4gIHB1YmxpYyBpc0ZpbHRlckJ5T3BlbmVkOiBib29sZWFuO1xyXG4gIHB1YmxpYyBpc0FkZFByb2R1Y3RPcGVuZWQ6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBjYXRlZ29yaWVzREJTZXJ2aWNlOiBDYXRlZ29yaWVzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwcm9kdWN0c0RCU2VydmljZTogUHJvZHVjdHNEQlNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUluZGV4ID0gMDtcclxuICAgIHRoaXMuY2F0ZWdvcnlMaXN0ID0gW107XHJcbiAgICB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeSA9IFtdO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnJldHJpZXZlUHJvZHVjdExpc3QoKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEdFVFRFUlMgQU5EIFNFVFRFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBnZXRQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgPSAoKSA9PiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeS5sZW5ndGggPiAwID8gdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgOiBbXTtcclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RMaXN0ID0gKGluZGV4OiBudW1iZXIpOiBBcnJheTxhbnk+ID0+IHtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0KSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XSkpO1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENhdGVnb3J5ID0gKGluZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0uY2F0ZWdvcnkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XS5jYXRlZ29yeTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBcIi1cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQcm9kdWN0TGlzdEhlaWdodCA9IChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0Lmxlbmd0aCAqIDc4O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0RmlsdGVyQnlUZXh0ID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuY2F0ZWdvcnlMaXN0ICYmIHRoaXMuY2F0ZWdvcnlMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGBGaWx0ZXIgcHJvZHVjdHMgYnk6ICR7dGhpcy5jYXRlZ29yeUxpc3RbdGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXhdfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIENIRUNLRVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgaXNQcm9kdWN0TGlzdEVtcHR5ID0gKGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIHJldHVybiAhKHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QgJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0Lmxlbmd0aCA+IDApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGlzUHJvZHVjdExpc3RCeUNhdGVnb3J5RW1wdHkgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gISh0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeS5sZW5ndGggPiAwKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gU0VSVklDRVMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyByZXRyaWV2ZVByb2R1Y3RMaXN0QnlDYXRlZ29yeSA9IChjYXRlZ29yeTogc3RyaW5nKSA9PiB7XHJcbiAgICB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMucHJvZHVjdHNEQlNlcnZpY2UuZ2V0UHJvZHVjdHMoY2F0ZWdvcnkpXHJcbiAgICAgIC50aGVuKChwcm9kdWN0TGlzdDogQXJyYXk8YW55PikgPT4ge1xyXG5cclxuICAgICAgICBpZiAocHJvZHVjdExpc3QgJiYgcHJvZHVjdExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkucHVzaCh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgICAgICAgICAgcHJvZHVjdExpc3Q6IHByb2R1Y3RMaXN0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV0cmlldmVQcm9kdWN0TGlzdCA9ICgpID0+IHtcclxuICAgIHRoaXMuY2F0ZWdvcmllc0RCU2VydmljZS5nZXRDYXRlZ29yaWVzKClcclxuICAgICAgLnRoZW4oKGNhdGVnb3JpZXM6IEFycmF5PHN0cmluZz4pID0+IHtcclxuICAgICAgICB0aGlzLmNhdGVnb3J5TGlzdCA9IGNhdGVnb3JpZXM7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3QudW5zaGlmdChcIkFsbFwiKTtcclxuXHJcbiAgICAgICAgY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZVByb2R1Y3RMaXN0QnlDYXRlZ29yeShjYXRlZ29yeSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBIQU5ETEVSUy9BQ1RJT05TIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBvbkNhdGVnb3J5U2VsZWN0ZWQgPSAoZXZlbnQ/OiBhbnkpID0+IHtcclxuICAgIGlmIChldmVudCAmJiBldmVudC5vYmplY3QpIHtcclxuICAgICAgY29uc3QgcGlja2VyOiBhbnkgPSA8TGlzdFBpY2tlcj5ldmVudC5vYmplY3Q7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUluZGV4ID0gcGlja2VyLnNlbGVjdGVkSW5kZXg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5jYXRlZ29yeUxpc3QgJiYgdGhpcy5jYXRlZ29yeUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgLy8gU2hvdyBhbGwgcHJvZHVjdHNcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVQcm9kdWN0TGlzdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBGaWx0ZXIgYnkgYSBzcGVjaWZpYyBjYXRlZ29yeVxyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDYXRlZ29yeTogc3RyaW5nID0gdGhpcy5jYXRlZ29yeUxpc3RbdGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXhdO1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZVByb2R1Y3RMaXN0QnlDYXRlZ29yeShzZWxlY3RlZENhdGVnb3J5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXIgbGlzdCBieTpcIiwgdGhpcy5jYXRlZ29yeUxpc3RbdGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXhdKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzRmlsdGVyQnlPcGVuZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblRhcFByb2R1Y3QgPSAoZXZlbnQ6IGFueSwgY2F0ZWdvcnlJbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBwcm9kdWN0SW5kZXg6IG51bWJlciA9IGV2ZW50LmluZGV4O1xyXG4gICAgY29uc3QgcHJvZHVjdDogYW55ID0gdGhpcy5nZXRQcm9kdWN0TGlzdChjYXRlZ29yeUluZGV4KVtwcm9kdWN0SW5kZXhdO1xyXG4gICAgY29uc3QgY2F0ZWdvcnlOYW1lOiBzdHJpbmcgPSB0aGlzLmdldENhdGVnb3J5KGNhdGVnb3J5SW5kZXgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBUQVBQRUQgUFJPRFVDVDogJHtwcm9kdWN0LnByb2R1Y3ROYW1lfSwgQ0FURUdPUlk6ICR7Y2F0ZWdvcnlOYW1lfWApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvVG9CYXJjb2RlU2Nhbm5lciA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZyB0byBCYXJjb2RlIFNjYW5uZXIuLi5cIik7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvcHJvZHVjdExpc3QvYmFyY29kZVNjYW5uZXJcIl0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVMZWZ0XCIsXHJcbiAgICAgICAgZHVyYXRpb246IDMwMFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnb1RvR3JvY2VyeUxpc3REZXRhaWxzID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nIHRvIEdyb2NlcnkgTGlzdCBEZXRhaWxzLi4uXCIpO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL2dyb2NlcnlMaXN0L2dyb2NlcnlMaXN0RGV0YWlsc1wiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZVJpZ2h0XCIsXHJcbiAgICAgICAgZHVyYXRpb246IDMwMFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0iXX0=