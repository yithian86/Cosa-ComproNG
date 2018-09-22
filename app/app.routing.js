"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_grocery_list_details_component_1 = require("~/components/grocery-list-details/components/app-grocery-list-details.component");
var app_my_grocery_lists_component_1 = require("~/components/my-grocery-lists/components/app-my-grocery-lists.component");
var app_product_list_component_1 = require("~/components/product-list/components/app-product-list.component");
var app_barcode_scanner_component_1 = require("~/components/product-list/components/app-barcode-scanner.component");
exports.routes = [
    { path: "", redirectTo: "/home/groceryListDetails", pathMatch: "full" },
    {
        path: "home", children: [
            { path: "groceryListDetails", component: app_grocery_list_details_component_1.AppGroceryListDetailsComponent },
            { path: "myGroceryLists", component: app_my_grocery_lists_component_1.AppMyGroceryListsComponent },
            {
                path: "productList", children: [
                    { path: "list/:mode/:listId", component: app_product_list_component_1.AppProductListComponent },
                    { path: "barcode-scanner", component: app_barcode_scanner_component_1.AppBarcodeScannerComponent }
                ]
            }
        ]
    }
];
exports.navigatableComponents = [
    app_grocery_list_details_component_1.AppGroceryListDetailsComponent,
    app_my_grocery_lists_component_1.AppMyGroceryListsComponent,
    app_product_list_component_1.AppProductListComponent,
    app_barcode_scanner_component_1.AppBarcodeScannerComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNJQUFnSTtBQUNoSSwwSEFBcUg7QUFDckgsOEdBQXlHO0FBQ3pHLG9IQUFnSDtBQUVuRyxRQUFBLE1BQU0sR0FBRztJQUNwQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLDBCQUEwQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDdkU7UUFDRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtZQUN0QixFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsbUVBQThCLEVBQUU7WUFDekUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLDJEQUEwQixFQUFFO1lBQ2pFO2dCQUNFLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFO29CQUM3QixFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsb0RBQXVCLEVBQUU7b0JBQ2xFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSwwREFBMEIsRUFBRTtpQkFDbkU7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDO0FBRVcsUUFBQSxxQkFBcUIsR0FBRztJQUNuQyxtRUFBOEI7SUFDOUIsMkRBQTBCO0lBQzFCLG9EQUF1QjtJQUN2QiwwREFBMEI7Q0FDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcEdyb2NlcnlMaXN0RGV0YWlsc0NvbXBvbmVudCB9IGZyb20gXCJ+L2NvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvY29tcG9uZW50cy9hcHAtZ3JvY2VyeS1saXN0LWRldGFpbHMuY29tcG9uZW50XCJcclxuaW1wb3J0IHsgQXBwTXlHcm9jZXJ5TGlzdHNDb21wb25lbnQgfSBmcm9tIFwifi9jb21wb25lbnRzL215LWdyb2NlcnktbGlzdHMvY29tcG9uZW50cy9hcHAtbXktZ3JvY2VyeS1saXN0cy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQXBwUHJvZHVjdExpc3RDb21wb25lbnQgfSBmcm9tIFwifi9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9jb21wb25lbnRzL2FwcC1wcm9kdWN0LWxpc3QuY29tcG9uZW50XCJcclxuaW1wb3J0IHsgQXBwQmFyY29kZVNjYW5uZXJDb21wb25lbnQgfSBmcm9tIFwifi9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9jb21wb25lbnRzL2FwcC1iYXJjb2RlLXNjYW5uZXIuY29tcG9uZW50XCI7XHJcblxyXG5leHBvcnQgY29uc3Qgcm91dGVzID0gW1xyXG4gIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCIvaG9tZS9ncm9jZXJ5TGlzdERldGFpbHNcIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9LFxyXG4gIHtcclxuICAgIHBhdGg6IFwiaG9tZVwiLCBjaGlsZHJlbjogW1xyXG4gICAgICB7IHBhdGg6IFwiZ3JvY2VyeUxpc3REZXRhaWxzXCIsIGNvbXBvbmVudDogQXBwR3JvY2VyeUxpc3REZXRhaWxzQ29tcG9uZW50IH0sXHJcbiAgICAgIHsgcGF0aDogXCJteUdyb2NlcnlMaXN0c1wiLCBjb21wb25lbnQ6IEFwcE15R3JvY2VyeUxpc3RzQ29tcG9uZW50IH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwYXRoOiBcInByb2R1Y3RMaXN0XCIsIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7IHBhdGg6IFwibGlzdC86bW9kZS86bGlzdElkXCIsIGNvbXBvbmVudDogQXBwUHJvZHVjdExpc3RDb21wb25lbnQgfSxcclxuICAgICAgICAgIHsgcGF0aDogXCJiYXJjb2RlLXNjYW5uZXJcIiwgY29tcG9uZW50OiBBcHBCYXJjb2RlU2Nhbm5lckNvbXBvbmVudCB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfVxyXG5dO1xyXG5cclxuZXhwb3J0IGNvbnN0IG5hdmlnYXRhYmxlQ29tcG9uZW50cyA9IFtcclxuICBBcHBHcm9jZXJ5TGlzdERldGFpbHNDb21wb25lbnQsXHJcbiAgQXBwTXlHcm9jZXJ5TGlzdHNDb21wb25lbnQsXHJcbiAgQXBwUHJvZHVjdExpc3RDb21wb25lbnQsXHJcbiAgQXBwQmFyY29kZVNjYW5uZXJDb21wb25lbnRcclxuXTsiXX0=