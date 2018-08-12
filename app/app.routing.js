"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_grocery_list_details_component_1 = require("~/components/grocery-list-details/components/app-grocery-list-details.component");
var app_my_grocery_lists_component_1 = require("~/components/my-grocery-lists/components/app-my-grocery-lists.component");
var app_product_list_component_1 = require("~/components/product-list/components/app-product-list.component");
exports.routes = [
    { path: "", redirectTo: "/home/groceryList/groceryListDetails", pathMatch: "full" },
    {
        path: "home", children: [
            {
                path: "groceryList", children: [
                    { path: "groceryListDetails", component: app_grocery_list_details_component_1.AppGroceryListDetailsComponent }
                ]
            },
            { path: "myGroceryLists", component: app_my_grocery_lists_component_1.AppMyGroceryListsComponent },
            { path: "productList", component: app_product_list_component_1.AppProductListComponent }
        ]
    }
];
exports.navigatableComponents = [
    app_grocery_list_details_component_1.AppGroceryListDetailsComponent,
    app_my_grocery_lists_component_1.AppMyGroceryListsComponent,
    app_product_list_component_1.AppProductListComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNJQUFnSTtBQUNoSSwwSEFBcUg7QUFDckgsOEdBQXlHO0FBRTVGLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsc0NBQXNDLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNuRjtRQUNFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO1lBQ3RCO2dCQUNFLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFO29CQUM3QixFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsbUVBQThCLEVBQUU7aUJBQzFFO2FBQ0Y7WUFDRCxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsMkRBQTBCLEVBQUU7WUFDakUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxvREFBdUIsRUFBRTtTQUM1RDtLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEscUJBQXFCLEdBQUc7SUFDbkMsbUVBQThCO0lBQzlCLDJEQUEwQjtJQUMxQixvREFBdUI7Q0FDeEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcEdyb2NlcnlMaXN0RGV0YWlsc0NvbXBvbmVudCB9IGZyb20gXCJ+L2NvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvY29tcG9uZW50cy9hcHAtZ3JvY2VyeS1saXN0LWRldGFpbHMuY29tcG9uZW50XCJcclxuaW1wb3J0IHsgQXBwTXlHcm9jZXJ5TGlzdHNDb21wb25lbnQgfSBmcm9tIFwifi9jb21wb25lbnRzL215LWdyb2NlcnktbGlzdHMvY29tcG9uZW50cy9hcHAtbXktZ3JvY2VyeS1saXN0cy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQXBwUHJvZHVjdExpc3RDb21wb25lbnQgfSBmcm9tIFwifi9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9jb21wb25lbnRzL2FwcC1wcm9kdWN0LWxpc3QuY29tcG9uZW50XCJcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0ZXMgPSBbXHJcbiAgeyBwYXRoOiBcIlwiLCByZWRpcmVjdFRvOiBcIi9ob21lL2dyb2NlcnlMaXN0L2dyb2NlcnlMaXN0RGV0YWlsc1wiLCBwYXRoTWF0Y2g6IFwiZnVsbFwiIH0sXHJcbiAge1xyXG4gICAgcGF0aDogXCJob21lXCIsIGNoaWxkcmVuOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBwYXRoOiBcImdyb2NlcnlMaXN0XCIsIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7IHBhdGg6IFwiZ3JvY2VyeUxpc3REZXRhaWxzXCIsIGNvbXBvbmVudDogQXBwR3JvY2VyeUxpc3REZXRhaWxzQ29tcG9uZW50IH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHsgcGF0aDogXCJteUdyb2NlcnlMaXN0c1wiLCBjb21wb25lbnQ6IEFwcE15R3JvY2VyeUxpc3RzQ29tcG9uZW50IH0sXHJcbiAgICAgIHsgcGF0aDogXCJwcm9kdWN0TGlzdFwiLCBjb21wb25lbnQ6IEFwcFByb2R1Y3RMaXN0Q29tcG9uZW50IH1cclxuICAgIF1cclxuICB9XHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgbmF2aWdhdGFibGVDb21wb25lbnRzID0gW1xyXG4gIEFwcEdyb2NlcnlMaXN0RGV0YWlsc0NvbXBvbmVudCxcclxuICBBcHBNeUdyb2NlcnlMaXN0c0NvbXBvbmVudCxcclxuICBBcHBQcm9kdWN0TGlzdENvbXBvbmVudFxyXG5dOyJdfQ==