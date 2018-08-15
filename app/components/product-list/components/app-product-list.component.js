"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var dialogs_1 = require("ui/dialogs");
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
        ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
        this.onTapProduct = function (event, categoryIndex) {
            var productIndex = event.index;
            var product = _this.getProductList(categoryIndex)[productIndex];
            var categoryName = _this.getCategory(categoryIndex);
            console.log("TAPPED PRODUCT: " + product.productName + ", CATEGORY: " + categoryName);
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
        this.selectedCategory = "All";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFDakYsc0NBQW9DO0FBRXBDLG9IQUF1RztBQUN2RywwSEFBeUc7QUFTekc7SUFLRSxpQ0FDVSxnQkFBa0MsRUFDbEMsbUJBQXdDLEVBQ3hDLGlCQUFvQztRQUg5QyxpQkFRQztRQVBTLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBWTlDLHdHQUF3RztRQUNqRyw4QkFBeUIsR0FBRyxjQUFnQyxPQUFBLEtBQUksQ0FBQyxzQkFBc0IsSUFBSSxLQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQXhHLENBQXdHLENBQUM7UUFFckssbUJBQWMsR0FBRyxVQUFDLEtBQWE7WUFDcEMsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLHNCQUFzQixJQUFJLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDeEgsbUVBQW1FO2dCQUNuRSxNQUFNLENBQUMsS0FBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQztZQUN4RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNaLENBQUM7UUFDSCxDQUFDLENBQUE7UUFFTSxnQkFBVyxHQUFHLFVBQUMsS0FBYTtZQUNqQyxFQUFFLENBQUMsQ0FBQyxL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QWpCVSx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLCtEQUErRDtZQUM1RSxTQUFTLEVBQUUsQ0FBQywrREFBK0QsQ0FBQztZQUM1RSxTQUFTLEVBQUUsQ0FBQyxxREFBbUIsRUFBRSxxREFBaUIsQ0FBQztTQUNwRCxDQUFDO3lDQU80QixvQ0FBZ0I7WUFDYixxREFBbUI7WUFDckIscURBQWlCO09BUm5DLHVCQUF1QixDQXFKbkM7SUFBRCw4QkFBQztDQUFBLEFBckpELElBcUpDO0FBckpZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbmltcG9ydCB7IENhdGVnb3JpZXNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL2NhdGVnb3JpZXMvc2VydmljZXMvYXBwLWNhdGVnb3JpZXMuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0c0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvcHJvZHVjdC1saXN0L3NlcnZpY2VzL2FwcC1wcm9kdWN0LWxpc3QuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJQ2F0ZWdvcnlQcm9kdWN0cywgSVByb2R1Y3QgfSBmcm9tIFwifi9jb21wb25lbnRzL3R5cGluZ3MvcHJvZHVjdFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXByb2R1Y3QtbGlzdFwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3ZpZXdzL2FwcC1wcm9kdWN0LWxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3N0eWxlcy9hcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbQ2F0ZWdvcmllc0RCU2VydmljZSwgUHJvZHVjdHNEQlNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBQcm9kdWN0TGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHVibGljIGNhdGVnb3J5TGlzdDogQXJyYXk8c3RyaW5nPjtcclxuICBwdWJsaWMgcHJvZHVjdHNMaXN0QnlDYXRlZ29yeTogQXJyYXk8SUNhdGVnb3J5UHJvZHVjdHM+O1xyXG4gIHB1YmxpYyBzZWxlY3RlZENhdGVnb3J5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBjYXRlZ29yaWVzREJTZXJ2aWNlOiBDYXRlZ29yaWVzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBwcm9kdWN0c0RCU2VydmljZTogUHJvZHVjdHNEQlNlcnZpY2VcclxuICApIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IFwiQWxsXCI7XHJcbiAgICB0aGlzLmNhdGVnb3J5TGlzdCA9IFtdO1xyXG4gICAgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ID0gW107XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMucmV0cmlldmVQcm9kdWN0TGlzdCgpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gR0VUVEVSUyBBTkQgU0VUVEVSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGdldHByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgPSAoKTogQXJyYXk8SUNhdGVnb3J5UHJvZHVjdHM+ID0+IHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkubGVuZ3RoID4gMCA/IHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA6IFtdO1xyXG5cclxuICBwdWJsaWMgZ2V0UHJvZHVjdExpc3QgPSAoaW5kZXg6IG51bWJlcik6IEFycmF5PElQcm9kdWN0PiA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdCkge1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdKSk7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENhdGVnb3J5ID0gKGluZGV4OiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0uY2F0ZWdvcnkpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0uY2F0ZWdvcnk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UHJvZHVjdExpc3RIZWlnaHQgPSAoaW5kZXg6IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgICBpZiAodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0gJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdC5sZW5ndGggKiA3ODtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEZpbHRlckJ5VGV4dCA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKHRoaXMuY2F0ZWdvcnlMaXN0ICYmIHRoaXMuY2F0ZWdvcnlMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgcmV0dXJuIGBGaWx0ZXIgcHJvZHVjdHMgYnk6ICR7dGhpcy5zZWxlY3RlZENhdGVnb3J5fWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gXCItXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIENIRUNLRVJTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgaXNQcm9kdWN0TGlzdEVtcHR5ID0gKGluZGV4OiBudW1iZXIpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiAhKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdC5sZW5ndGggPiAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc1Byb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlFbXB0eSA9ICgpOiBib29sZWFuID0+IHtcclxuICAgIHJldHVybiAhKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkubGVuZ3RoID4gMCk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFNFUlZJQ0VTIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgcmV0cmlldmVwcm9kdWN0c0xpc3RCeUNhdGVnb3J5ID0gKGNhdGVnb3J5OiBzdHJpbmcpID0+IHtcclxuICAgIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA9IFtdO1xyXG5cclxuICAgIHRoaXMucHJvZHVjdHNEQlNlcnZpY2UuZ2V0UHJvZHVjdHMoY2F0ZWdvcnkpXHJcbiAgICAgIC50aGVuKChwcm9kdWN0TGlzdDogQXJyYXk8SVByb2R1Y3Q+KSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwcm9kdWN0TGlzdCAmJiBwcm9kdWN0TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkucHVzaCh7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgICAgICAgICAgcHJvZHVjdExpc3Q6IHByb2R1Y3RMaXN0XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmV0cmlldmVQcm9kdWN0TGlzdCA9ICgpID0+IHtcclxuICAgIHRoaXMuY2F0ZWdvcmllc0RCU2VydmljZS5nZXRDYXRlZ29yaWVzKClcclxuICAgICAgLnRoZW4oKGNhdGVnb3JpZXM6IEFycmF5PHN0cmluZz4pID0+IHtcclxuICAgICAgICB0aGlzLmNhdGVnb3J5TGlzdCA9IGNhdGVnb3JpZXM7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3QudW5zaGlmdChcIkFsbFwiKTtcclxuXHJcbiAgICAgICAgY2F0ZWdvcmllcy5mb3JFYWNoKChjYXRlZ29yeSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZXByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkoY2F0ZWdvcnkpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gSEFORExFUlMvQUNUSU9OUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICBwdWJsaWMgb25UYXBQcm9kdWN0ID0gKGV2ZW50OiBhbnksIGNhdGVnb3J5SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgY29uc3QgcHJvZHVjdEluZGV4OiBudW1iZXIgPSBldmVudC5pbmRleDtcclxuICAgIGNvbnN0IHByb2R1Y3Q6IElQcm9kdWN0ID0gdGhpcy5nZXRQcm9kdWN0TGlzdChjYXRlZ29yeUluZGV4KVtwcm9kdWN0SW5kZXhdO1xyXG4gICAgY29uc3QgY2F0ZWdvcnlOYW1lOiBzdHJpbmcgPSB0aGlzLmdldENhdGVnb3J5KGNhdGVnb3J5SW5kZXgpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBUQVBQRUQgUFJPRFVDVDogJHtwcm9kdWN0LnByb2R1Y3ROYW1lfSwgQ0FURUdPUlk6ICR7Y2F0ZWdvcnlOYW1lfWApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dDYXRlZ29yeURpYWxvZyA9ICgpID0+IHtcclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICB0aXRsZTogXCJDaG9vc2UgcHJvZHVjdCBjYXRlZ29yeTpcIixcclxuICAgICAgbWVzc2FnZTogXCJcIixcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcclxuICAgICAgYWN0aW9uczogdGhpcy5jYXRlZ29yeUxpc3RcclxuICAgIH07XHJcblxyXG4gICAgYWN0aW9uKG9wdGlvbnMpLnRoZW4oKHNlbGVjdGVkQ2F0ZWdvcnkpID0+IHtcclxuICAgICAgaWYgKHNlbGVjdGVkQ2F0ZWdvcnkgJiYgc2VsZWN0ZWRDYXRlZ29yeSAhPT0gXCJDYW5jZWxcIikge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDYXRlZ29yeSA9IHNlbGVjdGVkQ2F0ZWdvcnk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQ2F0ZWdvcnkgPT09IFwiQWxsXCIpIHtcclxuICAgICAgICAgIC8vIFNob3cgYWxsIHByb2R1Y3RzXHJcbiAgICAgICAgICB0aGlzLnJldHJpZXZlUHJvZHVjdExpc3QoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gRmlsdGVyIGJ5IGEgc3BlY2lmaWMgY2F0ZWdvcnlcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVwcm9kdWN0c0xpc3RCeUNhdGVnb3J5KHNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZpbHRlciBsaXN0IGJ5OlwiLCBzZWxlY3RlZENhdGVnb3J5KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ29Ub0JhcmNvZGVTY2FubmVyID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nIHRvIEJhcmNvZGUgU2Nhbm5lci4uLlwiKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9wcm9kdWN0TGlzdC9iYXJjb2RlU2Nhbm5lclwiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZUxlZnRcIixcclxuICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvVG9Hcm9jZXJ5TGlzdERldGFpbHMgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gR3JvY2VyeSBMaXN0IERldGFpbHMuLi5cIik7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvZ3JvY2VyeUxpc3QvZ3JvY2VyeUxpc3REZXRhaWxzXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlUmlnaHRcIixcclxuICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSJdfQ==