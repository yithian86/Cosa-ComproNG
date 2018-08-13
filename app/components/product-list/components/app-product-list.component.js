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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFHakYsb0hBQXVHO0FBQ3ZHLDBIQUF5RztBQVN6RztJQU9FLGlDQUNVLGdCQUFrQyxFQUNsQyxtQkFBd0MsRUFDeEMsaUJBQW9DO1FBSDlDLGlCQVFDO1FBUFMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFZOUMsd0dBQXdHO1FBQ2pHLDZCQUF3QixHQUFHLGNBQTJCLE9BQUEsS0FBSSxDQUFDLHFCQUFxQixJQUFJLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBckcsQ0FBcUcsQ0FBQztRQUU1SixtQkFBYyxHQUFHLFVBQUMsS0FBYTtZQUNwQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMscUJBQXFCLElBQUksS0FBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNySCxrRUFBa0U7Z0JBQ2xFLE1BQU0sQ0FBQyxLQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3ZELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ1osQ0FBQztRQUNILENBQUMsQ0FBQTtRQUVNLGdCQUFXLEdBQUcsVUFBQyxLQUFhO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxxQkFB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Q0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQW5CVSx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLCtEQUErRDtZQUM1RSxTQUFTLEVBQUUsQ0FBQywrREFBK0QsQ0FBQztZQUM1RSxTQUFTLEVBQUUsQ0FBQyxxREFBbUIsRUFBRSxxREFBaUIsQ0FBQztTQUNwRCxDQUFDO3lDQVM0QixvQ0FBZ0I7WUFDYixxREFBbUI7WUFDckIscURBQWlCO09BVm5DLHVCQUF1QixDQW9KbkM7SUFBRCw4QkFBQztDQUFBLEFBcEpELElBb0pDO0FBcEpZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyL2xpc3QtcGlja2VyXCJcclxuXHJcbmltcG9ydCB7IENhdGVnb3JpZXNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL2NhdGVnb3JpZXMvc2VydmljZXMvYXBwLWNhdGVnb3JpZXMuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0c0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvcHJvZHVjdC1saXN0L3NlcnZpY2VzL2FwcC1wcm9kdWN0LWxpc3QuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJUHJvZHVjdExpc3QsIElQcm9kdWN0IH0gZnJvbSBcIn4vY29tcG9uZW50cy90eXBpbmdzL3Byb2R1Y3RcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1wcm9kdWN0LWxpc3RcIixcclxuICB0ZW1wbGF0ZVVybDogXCJjb21wb25lbnRzL3Byb2R1Y3QtbGlzdC92aWV3cy9hcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJjb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9zdHlsZXMvYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuY3NzXCJdLFxyXG4gIHByb3ZpZGVyczogW0NhdGVnb3JpZXNEQlNlcnZpY2UsIFByb2R1Y3RzREJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwUHJvZHVjdExpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBjYXRlZ29yeUxpc3Q6IEFycmF5PHN0cmluZz47XHJcbiAgcHVibGljIHByb2R1Y3RMaXN0QnlDYXRlZ29yeTogQXJyYXk8SVByb2R1Y3RMaXN0PjtcclxuICBwdWJsaWMgc2VsZWN0ZWRDYXRlZ29yeUluZGV4OiBudW1iZXI7XHJcbiAgcHVibGljIGlzRmlsdGVyQnlPcGVuZWQ6IGJvb2xlYW47XHJcbiAgcHVibGljIGlzQWRkUHJvZHVjdE9wZW5lZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIGNhdGVnb3JpZXNEQlNlcnZpY2U6IENhdGVnb3JpZXNEQlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHByb2R1Y3RzREJTZXJ2aWNlOiBQcm9kdWN0c0RCU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXggPSAwO1xyXG4gICAgdGhpcy5jYXRlZ29yeUxpc3QgPSBbXTtcclxuICAgIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5ID0gW107XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucmV0cmlldmVQcm9kdWN0TGlzdCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gR0VUVEVSUyBBTkQgU0VUVEVSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGdldFByb2R1Y3RMaXN0QnlDYXRlZ29yeSA9ICgpOiBBcnJheTxJUHJvZHVjdExpc3Q+ID0+IHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5Lmxlbmd0aCA+IDAgPyB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeSA6IFtdO1xyXG5cclxuICBwdWJsaWMgZ2V0UHJvZHVjdExpc3QgPSAoaW5kZXg6IG51bWJlcik6IEFycmF5PElQcm9kdWN0PiA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdCkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0pKTtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDYXRlZ29yeSA9IChpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLmNhdGVnb3J5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0uY2F0ZWdvcnk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UHJvZHVjdExpc3RIZWlnaHQgPSAoaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdC5sZW5ndGggKiA3ODtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEZpbHRlckJ5VGV4dCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLmNhdGVnb3J5TGlzdCAmJiB0aGlzLmNhdGVnb3J5TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBgRmlsdGVyIHByb2R1Y3RzIGJ5OiAke3RoaXMuY2F0ZWdvcnlMaXN0W3RoaXMuc2VsZWN0ZWRDYXRlZ29yeUluZGV4XX1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBDSEVDS0VSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGlzUHJvZHVjdExpc3RFbXB0eSA9IChpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICByZXR1cm4gISh0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0ICYmIHRoaXMucHJvZHVjdExpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdC5sZW5ndGggPiAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc1Byb2R1Y3RMaXN0QnlDYXRlZ29yeUVtcHR5ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuICEodGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkubGVuZ3RoID4gMCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFNFUlZJQ0VTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgcmV0cmlldmVQcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgPSAoY2F0ZWdvcnk6IHN0cmluZykgPT4ge1xyXG4gICAgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkgPSBbXTtcclxuXHJcbiAgICB0aGlzLnByb2R1Y3RzREJTZXJ2aWNlLmdldFByb2R1Y3RzKGNhdGVnb3J5KVxyXG4gICAgICAudGhlbigocHJvZHVjdExpc3Q6IEFycmF5PElQcm9kdWN0PikgPT4ge1xyXG5cclxuICAgICAgICBpZiAocHJvZHVjdExpc3QgJiYgcHJvZHVjdExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9kdWN0TGlzdEJ5Q2F0ZWdvcnkucHVzaCh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgICAgICAgICAgcHJvZHVjdExpc3Q6IHByb2R1Y3RMaXN0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV0cmlldmVQcm9kdWN0TGlzdCA9ICgpID0+IHtcclxuICAgIHRoaXMuY2F0ZWdvcmllc0RCU2VydmljZS5nZXRDYXRlZ29yaWVzKClcclxuICAgICAgLnRoZW4oKGNhdGVnb3JpZXM6IEFycmF5PHN0cmluZz4pID0+IHtcclxuICAgICAgICB0aGlzLmNhdGVnb3J5TGlzdCA9IGNhdGVnb3JpZXM7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3QudW5zaGlmdChcIkFsbFwiKTtcclxuXHJcbiAgICAgICAgY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZVByb2R1Y3RMaXN0QnlDYXRlZ29yeShjYXRlZ29yeSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBIQU5ETEVSUy9BQ1RJT05TIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBvbkNhdGVnb3J5U2VsZWN0ZWQgPSAoZXZlbnQ/OiBhbnkpID0+IHtcclxuICAgIGlmIChldmVudCAmJiBldmVudC5vYmplY3QpIHtcclxuICAgICAgY29uc3QgcGlja2VyOiBhbnkgPSA8TGlzdFBpY2tlcj5ldmVudC5vYmplY3Q7XHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUluZGV4ID0gcGlja2VyLnNlbGVjdGVkSW5kZXg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5jYXRlZ29yeUxpc3QgJiYgdGhpcy5jYXRlZ29yeUxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgLy8gU2hvdyBhbGwgcHJvZHVjdHNcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVQcm9kdWN0TGlzdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBGaWx0ZXIgYnkgYSBzcGVjaWZpYyBjYXRlZ29yeVxyXG4gICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDYXRlZ29yeTogc3RyaW5nID0gdGhpcy5jYXRlZ29yeUxpc3RbdGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXhdO1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZVByb2R1Y3RMaXN0QnlDYXRlZ29yeShzZWxlY3RlZENhdGVnb3J5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXIgbGlzdCBieTpcIiwgdGhpcy5jYXRlZ29yeUxpc3RbdGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXhdKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzRmlsdGVyQnlPcGVuZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblRhcFByb2R1Y3QgPSAoZXZlbnQ6IGFueSwgY2F0ZWdvcnlJbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICBjb25zdCBwcm9kdWN0SW5kZXg6IG51bWJlciA9IGV2ZW50LmluZGV4O1xyXG4gICAgY29uc3QgcHJvZHVjdDogSVByb2R1Y3QgPSB0aGlzLmdldFByb2R1Y3RMaXN0KGNhdGVnb3J5SW5kZXgpW3Byb2R1Y3RJbmRleF07XHJcbiAgICBjb25zdCBjYXRlZ29yeU5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0Q2F0ZWdvcnkoY2F0ZWdvcnlJbmRleCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYFRBUFBFRCBQUk9EVUNUOiAke3Byb2R1Y3QucHJvZHVjdE5hbWV9LCBDQVRFR09SWTogJHtjYXRlZ29yeU5hbWV9YCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ29Ub0JhcmNvZGVTY2FubmVyID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nIHRvIEJhcmNvZGUgU2Nhbm5lci4uLlwiKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9wcm9kdWN0TGlzdC9iYXJjb2RlU2Nhbm5lclwiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZUxlZnRcIixcclxuICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvVG9Hcm9jZXJ5TGlzdERldGFpbHMgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gR3JvY2VyeSBMaXN0IERldGFpbHMuLi5cIik7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvZ3JvY2VyeUxpc3QvZ3JvY2VyeUxpc3REZXRhaWxzXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlUmlnaHRcIixcclxuICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSJdfQ==