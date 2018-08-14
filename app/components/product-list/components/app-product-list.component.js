"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var dialogs = require("ui/dialogs");
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
        this.openAddProductDialog = function () {
            dialogs
                .action({
                message: "How would you like to add the product?",
                cancelButtonText: "Back",
                actions: ["Barcode scanner", "Manually"]
            })
                .then(function (result) {
                console.log("Dialog result: " + result);
                if (result == "Barcode scanner") {
                    console.log("Navigating to Barcode Scanner...");
                    _this.routerExtensions.navigate(["/home/productList/barcodeScanner"], {
                        transition: {
                            name: "slideLeft",
                            duration: 300
                        }
                    });
                }
                else if (result == "Manually") {
                    //Do action 2
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFFakYsb0NBQXNDO0FBRXRDLG9IQUF1RztBQUN2RywwSEFBeUc7QUFTekc7SUFNRSxpQ0FDVSxnQkFBa0MsRUFDbEMsbUJBQXdDLEVBQ3hDLGlCQUFvQztRQUg5QyxpQkFRQztRQVBTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBWTlDLHdHQUF3RztRQUNqRyw4QkFBeUIsR0FBRyxjQUFnQyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsSUFBSSxLQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQXhHLENBQXdHLENBQUM7UUFFckssbUJBQWMsR0FBRyxVQUFDLEtBQWE7WUFDcEMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLHNCQUFzQixJQUFJLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDeEgsbUVBQW1FO2dCQUNuRSxNQUFNLENBQUMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUN4RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNaLENBQUM7UUFDSCxDQUFDLENBQUE7UUFFTSxnQkFBVyxHQUFHLFVBQUMsS0FBYTtZQUNqQyxFQUFFLENBQUMsQ0FBQyxL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QUNGLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDaEMsYUFBYTtnQkFDZixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFFTSwyQkFBc0IsR0FBRztZQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7WUFDckQsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDLEVBQUU7Z0JBQ3ZFLFVBQVUsRUFBRTtvQkFDVixJQUFJLEVBQUUsWUFBWTtvQkFDbEIsUUFBUSxFQUFFLEdBQUc7aUJBQ2Q7YUFDRixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUE7UUFwSkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCwwQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0IsQ0FBQztJQWxCVSx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLCtEQUErRDtZQUM1RSxTQUFTLEVBQUUsQ0FBQywrREFBK0QsQ0FBQztZQUM1RSxTQUFTLEVBQUUsQ0FBQyxxREFBbUIsRUFBRSxxREFBaUIsQ0FBQztTQUNwRCxDQUFDO3lDQVE0QixvQ0FBZ0I7WUFDYixxREFBbUI7WUFDckIscURBQWlCO09BVG5DLHVCQUF1QixDQWdLbkM7SUFBRCw4QkFBQztDQUFBLEFBaEtELElBZ0tDO0FBaEtZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgTGlzdFBpY2tlciB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyL2xpc3QtcGlja2VyXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbmltcG9ydCB7IENhdGVnb3JpZXNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL2NhdGVnb3JpZXMvc2VydmljZXMvYXBwLWNhdGVnb3JpZXMuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0c0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvcHJvZHVjdC1saXN0L3NlcnZpY2VzL2FwcC1wcm9kdWN0LWxpc3QuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJQ2F0ZWdvcnlQcm9kdWN0cywgSVByb2R1Y3QgfSBmcm9tIFwifi9jb21wb25lbnRzL3R5cGluZ3MvcHJvZHVjdFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXByb2R1Y3QtbGlzdFwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3ZpZXdzL2FwcC1wcm9kdWN0LWxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3N0eWxlcy9hcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbQ2F0ZWdvcmllc0RCU2VydmljZSwgUHJvZHVjdHNEQlNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBQcm9kdWN0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGNhdGVnb3J5TGlzdDogQXJyYXk8c3RyaW5nPjtcclxuICBwdWJsaWMgcHJvZHVjdHNMaXN0QnlDYXRlZ29yeTogQXJyYXk8SUNhdGVnb3J5UHJvZHVjdHM+O1xyXG4gIHB1YmxpYyBzZWxlY3RlZENhdGVnb3J5SW5kZXg6IG51bWJlcjtcclxuICBwdWJsaWMgaXNGaWx0ZXJCeU9wZW5lZDogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIGNhdGVnb3JpZXNEQlNlcnZpY2U6IENhdGVnb3JpZXNEQlNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHByb2R1Y3RzREJTZXJ2aWNlOiBQcm9kdWN0c0RCU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXggPSAwO1xyXG4gICAgdGhpcy5jYXRlZ29yeUxpc3QgPSBbXTtcclxuICAgIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA9IFtdO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnJldHJpZXZlUHJvZHVjdExpc3QoKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEdFVFRFUlMgQU5EIFNFVFRFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBnZXRwcm9kdWN0c0xpc3RCeUNhdGVnb3J5ID0gKCk6IEFycmF5PElDYXRlZ29yeVByb2R1Y3RzPiA9PiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5Lmxlbmd0aCA+IDAgPyB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgOiBbXTtcclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RMaXN0ID0gKGluZGV4OiBudW1iZXIpOiBBcnJheTxJUHJvZHVjdD4gPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSkpO1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDYXRlZ29yeSA9IChpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLmNhdGVnb3J5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLmNhdGVnb3J5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RMaXN0SGVpZ2h0ID0gKGluZGV4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QubGVuZ3RoICogNzg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRGaWx0ZXJCeVRleHQgPSAoKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLmNhdGVnb3J5TGlzdCAmJiB0aGlzLmNhdGVnb3J5TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBgRmlsdGVyIHByb2R1Y3RzIGJ5OiAke3RoaXMuY2F0ZWdvcnlMaXN0W3RoaXMuc2VsZWN0ZWRDYXRlZ29yeUluZGV4XX1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBDSEVDS0VSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGlzUHJvZHVjdExpc3RFbXB0eSA9IChpbmRleDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gISh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QubGVuZ3RoID4gMCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNQcm9kdWN0c0xpc3RCeUNhdGVnb3J5RW1wdHkgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gISh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5Lmxlbmd0aCA+IDApO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBTRVJWSUNFUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIHJldHJpZXZlcHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA9IChjYXRlZ29yeTogc3RyaW5nKSA9PiB7XHJcbiAgICB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgPSBbXTtcclxuXHJcbiAgICB0aGlzLnByb2R1Y3RzREJTZXJ2aWNlLmdldFByb2R1Y3RzKGNhdGVnb3J5KVxyXG4gICAgICAudGhlbigocHJvZHVjdExpc3Q6IEFycmF5PElQcm9kdWN0PikgPT4ge1xyXG5cclxuICAgICAgICBpZiAocHJvZHVjdExpc3QgJiYgcHJvZHVjdExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5LnB1c2goe1xyXG4gICAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXHJcbiAgICAgICAgICAgIHByb2R1Y3RMaXN0OiBwcm9kdWN0TGlzdFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlUHJvZHVjdExpc3QgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmNhdGVnb3JpZXNEQlNlcnZpY2UuZ2V0Q2F0ZWdvcmllcygpXHJcbiAgICAgIC50aGVuKChjYXRlZ29yaWVzOiBBcnJheTxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3QgPSBjYXRlZ29yaWVzO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlMaXN0LnVuc2hpZnQoXCJBbGxcIik7XHJcblxyXG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVwcm9kdWN0c0xpc3RCeUNhdGVnb3J5KGNhdGVnb3J5KTtcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEhBTkRMRVJTL0FDVElPTlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIG9uQ2F0ZWdvcnlTZWxlY3RlZCA9IChldmVudD86IGFueSk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKGV2ZW50ICYmIGV2ZW50Lm9iamVjdCkge1xyXG4gICAgICBjb25zdCBwaWNrZXI6IGFueSA9IDxMaXN0UGlja2VyPmV2ZW50Lm9iamVjdDtcclxuICAgICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXggPSBwaWNrZXIuc2VsZWN0ZWRJbmRleDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmNhdGVnb3J5TGlzdCAmJiB0aGlzLmNhdGVnb3J5TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRDYXRlZ29yeUluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAvLyBTaG93IGFsbCBwcm9kdWN0c1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZVByb2R1Y3RMaXN0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIEZpbHRlciBieSBhIHNwZWNpZmljIGNhdGVnb3J5XHJcbiAgICAgICAgICBjb25zdCBzZWxlY3RlZENhdGVnb3J5OiBzdHJpbmcgPSB0aGlzLmNhdGVnb3J5TGlzdFt0aGlzLnNlbGVjdGVkQ2F0ZWdvcnlJbmRleF07XHJcbiAgICAgICAgICB0aGlzLnJldHJpZXZlcHJvZHVjdHNMaXN0QnlDYXRlZ29yeShzZWxlY3RlZENhdGVnb3J5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGaWx0ZXIgbGlzdCBieTpcIiwgdGhpcy5jYXRlZ29yeUxpc3RbdGhpcy5zZWxlY3RlZENhdGVnb3J5SW5kZXhdKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzRmlsdGVyQnlPcGVuZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvblRhcFByb2R1Y3QgPSAoZXZlbnQ6IGFueSwgY2F0ZWdvcnlJbmRleDogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgICBjb25zdCBwcm9kdWN0SW5kZXg6IG51bWJlciA9IGV2ZW50LmluZGV4O1xyXG4gICAgY29uc3QgcHJvZHVjdDogSVByb2R1Y3QgPSB0aGlzLmdldFByb2R1Y3RMaXN0KGNhdGVnb3J5SW5kZXgpW3Byb2R1Y3RJbmRleF07XHJcbiAgICBjb25zdCBjYXRlZ29yeU5hbWU6IHN0cmluZyA9IHRoaXMuZ2V0Q2F0ZWdvcnkoY2F0ZWdvcnlJbmRleCk7XHJcblxyXG4gICAgY29uc29sZS5sb2coYFRBUFBFRCBQUk9EVUNUOiAke3Byb2R1Y3QucHJvZHVjdE5hbWV9LCBDQVRFR09SWTogJHtjYXRlZ29yeU5hbWV9YCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgb3BlbkFkZFByb2R1Y3REaWFsb2cgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBkaWFsb2dzXHJcbiAgICAgIC5hY3Rpb24oe1xyXG4gICAgICAgIG1lc3NhZ2U6IFwiSG93IHdvdWxkIHlvdSBsaWtlIHRvIGFkZCB0aGUgcHJvZHVjdD9cIixcclxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkJhY2tcIixcclxuICAgICAgICBhY3Rpb25zOiBbXCJCYXJjb2RlIHNjYW5uZXJcIiwgXCJNYW51YWxseVwiXVxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT0gXCJCYXJjb2RlIHNjYW5uZXJcIikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nIHRvIEJhcmNvZGUgU2Nhbm5lci4uLlwiKTtcclxuICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9wcm9kdWN0TGlzdC9iYXJjb2RlU2Nhbm5lclwiXSwge1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZUxlZnRcIixcclxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09IFwiTWFudWFsbHlcIikge1xyXG4gICAgICAgICAgLy9EbyBhY3Rpb24gMlxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ29Ub0dyb2NlcnlMaXN0RGV0YWlscyA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiTmF2aWdhdGluZyB0byBHcm9jZXJ5IExpc3QgRGV0YWlscy4uLlwiKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9ncm9jZXJ5TGlzdC9ncm9jZXJ5TGlzdERldGFpbHNcIl0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVSaWdodFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19