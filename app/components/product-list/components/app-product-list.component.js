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
                return "Filter products by: " + _this.categoryList[_this.selectedCategoryIndex];
            }
            else {
                return "-";
            }
        };
        ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
        this.isProductListEmpty = function (index) {
            return !(_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].productList && _this.productsListByCategory[index].productList.length > 0);
        };
        this.isproductsListByCategoryEmpty = function () {
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
                        _this.retrieveproductsListByCategory(selectedCategory);
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
        this.productsListByCategory = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFHakYsb0hBQXVHO0FBQ3ZHLDBIQUF5RztBQVN6RztJQU9FLGlDQUNVLGdCQUFrQyxFQUNsQyxtQkFBd0MsRUFDeEMsaUJBQW9DO1FBSDlDLGlCQVFDO1FBUFMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBQ3hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFZOUMsd0dBQXdHO1FBQ2pHLDhCQUF5QixHQUFHLGNBQWdDLE9BQUEsS0FBSSxDQUFDLHNCQUFzQixJQUFJLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBeEcsQ0FBd0csQ0FBQztRQUVySyxtQkFBYyxHQUFHLFVBQUMsS0FBYTtZQUNwQyxFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsc0JBQXNCLElBQUksS0FBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN4SCxtRUFBbUU7Z0JBQ25FLE1BQU0sQ0FBQyxLQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3hELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ1osQ0FBQztRQUNILENBQUMsQ0FBQTtRQUVNLGdCQUFXLEdBQUcsVUFBQyxLQUFhO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxzQkFB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Q0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQW5CVSx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLCtEQUErRDtZQUM1RSxTQUFTLEVBQUUsQ0FBQywrREFBK0QsQ0FBQztZQUM1RSxTQUFTLEVBQUUsQ0FBQyxxREFBbUIsRUFBRSxxREFBaUIsQ0FBQztTQUNwRCxDQUFDO3lDQVM0QixvQ0FBZ0I7WUFDYixxREFBbUI7WUFDckIscURBQWlCO09BVm5DLHVCQUF1QixDQW9KbkM7SUFBRCw4QkFBQztDQUFBLEFBcEpELElBb0pDO0FBcEpZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyL2xpc3QtcGlja2VyXCJcclxuXHJcbmltcG9ydCB7IENhdGVnb3JpZXNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL2NhdGVnb3JpZXMvc2VydmljZXMvYXBwLWNhdGVnb3JpZXMuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0c0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvcHJvZHVjdC1saXN0L3NlcnZpY2VzL2FwcC1wcm9kdWN0LWxpc3QuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJQ2F0ZWdvcnlQcm9kdWN0cywgSVByb2R1Y3QgfSBmcm9tIFwifi9jb21wb25lbnRzL3R5cGluZ3MvcHJvZHVjdFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXByb2R1Y3QtbGlzdFwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3ZpZXdzL2FwcC1wcm9kdWN0LWxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3N0eWxlcy9hcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbQ2F0ZWdvcmllc0RCU2VydmljZSwgUHJvZHVjdHNEQlNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBQcm9kdWN0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGNhdGVnb3J5TGlzdDogQXJyYXk8c3RyaW5nPjtcclxuICBwdWJsaWMgcHJvZHVjdHNMaXN0QnlDYXRlZ29yeTogQXJyYXk8SUNhdGVnb3J5UHJvZHVjdHM+O1xyXG4gIHB1YmxpYyBzZWxlY3RlZENhdGVnb3J5SW5kZXg6IG51bWJlcjtcclxuICBwdWJsaWMgaXNGaWx0ZXJCeU9wZW5lZDogYm9vbGVhbjtcclxuICBwdWJsaWMgaXNBZGRQcm9kdWN0T3BlbmVkOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHByaXZhdGUgY2F0ZWdvcmllc0RCU2VydmljZTogQ2F0ZWdvcmllc0RCU2VydmljZSxcclxuICAgIHByaXZhdGUgcHJvZHVjdHNEQlNlcnZpY2U6IFByb2R1Y3RzREJTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJbmRleCA9IDA7XHJcbiAgICB0aGlzLmNhdGVnb3J5TGlzdCA9IFtdO1xyXG4gICAgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ID0gW107XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucmV0cmlldmVQcm9kdWN0TGlzdCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gR0VUVEVSUyBBTkQgU0VUVEVSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGdldHByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgPSAoKTogQXJyYXk8SUNhdGVnb3J5UHJvZHVjdHM+ID0+IHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkubGVuZ3RoID4gMCA/IHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA6IFtdO1xyXG5cclxuICBwdWJsaWMgZ2V0UHJvZHVjdExpc3QgPSAoaW5kZXg6IG51bWJlcik6IEFycmF5PElQcm9kdWN0PiA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdCkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdKSk7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENhdGVnb3J5ID0gKGluZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0uY2F0ZWdvcnkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0uY2F0ZWdvcnk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UHJvZHVjdExpc3RIZWlnaHQgPSAoaW5kZXg6IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdC5sZW5ndGggKiA3ODtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEZpbHRlckJ5VGV4dCA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHRoaXMuY2F0ZWdvcnlMaXN0ICYmIHRoaXMuY2F0ZWdvcnlMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGBGaWx0ZXIgcHJvZHVjdHMgYnk6ICR7dGhpcy5jYXRlZ29yeUxpc3RbdGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXhdfWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIENIRUNLRVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgaXNQcm9kdWN0TGlzdEVtcHR5ID0gKGluZGV4OiBudW1iZXIpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiAhKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdC5sZW5ndGggPiAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc3Byb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlFbXB0eSA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiAhKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkubGVuZ3RoID4gMCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFNFUlZJQ0VTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgcmV0cmlldmVwcm9kdWN0c0xpc3RCeUNhdGVnb3J5ID0gKGNhdGVnb3J5OiBzdHJpbmcpID0+IHtcclxuICAgIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMucHJvZHVjdHNEQlNlcnZpY2UuZ2V0UHJvZHVjdHMoY2F0ZWdvcnkpXHJcbiAgICAgIC50aGVuKChwcm9kdWN0TGlzdDogQXJyYXk8SVByb2R1Y3Q+KSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwcm9kdWN0TGlzdCAmJiBwcm9kdWN0TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkucHVzaCh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgICAgICAgICAgcHJvZHVjdExpc3Q6IHByb2R1Y3RMaXN0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV0cmlldmVQcm9kdWN0TGlzdCA9ICgpID0+IHtcclxuICAgIHRoaXMuY2F0ZWdvcmllc0RCU2VydmljZS5nZXRDYXRlZ29yaWVzKClcclxuICAgICAgLnRoZW4oKGNhdGVnb3JpZXM6IEFycmF5PHN0cmluZz4pID0+IHtcclxuICAgICAgICB0aGlzLmNhdGVnb3J5TGlzdCA9IGNhdGVnb3JpZXM7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3QudW5zaGlmdChcIkFsbFwiKTtcclxuXHJcbiAgICAgICAgY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZXByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkoY2F0ZWdvcnkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gSEFORExFUlMvQUNUSU9OUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgb25DYXRlZ29yeVNlbGVjdGVkID0gKGV2ZW50PzogYW55KSA9PiB7XHJcbiAgICBpZiAoZXZlbnQgJiYgZXZlbnQub2JqZWN0KSB7XHJcbiAgICAgIGNvbnN0IHBpY2tlcjogYW55ID0gPExpc3RQaWNrZXI+ZXZlbnQub2JqZWN0O1xyXG4gICAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJbmRleCA9IHBpY2tlci5zZWxlY3RlZEluZGV4O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMuY2F0ZWdvcnlMaXN0ICYmIHRoaXMuY2F0ZWdvcnlMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICBpZiAodGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXggPT09IDApIHtcclxuICAgICAgICAgIC8vIFNob3cgYWxsIHByb2R1Y3RzXHJcbiAgICAgICAgICB0aGlzLnJldHJpZXZlUHJvZHVjdExpc3QoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gRmlsdGVyIGJ5IGEgc3BlY2lmaWMgY2F0ZWdvcnlcclxuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQ2F0ZWdvcnk6IHN0cmluZyA9IHRoaXMuY2F0ZWdvcnlMaXN0W3RoaXMuc2VsZWN0ZWRDYXRlZ29yeUluZGV4XTtcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVwcm9kdWN0c0xpc3RCeUNhdGVnb3J5KHNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZpbHRlciBsaXN0IGJ5OlwiLCB0aGlzLmNhdGVnb3J5TGlzdFt0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJbmRleF0pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaXNGaWx0ZXJCeU9wZW5lZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uVGFwUHJvZHVjdCA9IChldmVudDogYW55LCBjYXRlZ29yeUluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IHByb2R1Y3RJbmRleDogbnVtYmVyID0gZXZlbnQuaW5kZXg7XHJcbiAgICBjb25zdCBwcm9kdWN0OiBJUHJvZHVjdCA9IHRoaXMuZ2V0UHJvZHVjdExpc3QoY2F0ZWdvcnlJbmRleClbcHJvZHVjdEluZGV4XTtcclxuICAgIGNvbnN0IGNhdGVnb3J5TmFtZTogc3RyaW5nID0gdGhpcy5nZXRDYXRlZ29yeShjYXRlZ29yeUluZGV4KTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgVEFQUEVEIFBST0RVQ1Q6ICR7cHJvZHVjdC5wcm9kdWN0TmFtZX0sIENBVEVHT1JZOiAke2NhdGVnb3J5TmFtZX1gKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnb1RvQmFyY29kZVNjYW5uZXIgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gQmFyY29kZSBTY2FubmVyLi4uXCIpO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3Byb2R1Y3RMaXN0L2JhcmNvZGVTY2FubmVyXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlTGVmdFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ29Ub0dyb2NlcnlMaXN0RGV0YWlscyA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZyB0byBHcm9jZXJ5IExpc3QgRGV0YWlscy4uLlwiKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9ncm9jZXJ5TGlzdC9ncm9jZXJ5TGlzdERldGFpbHNcIl0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVSaWdodFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19