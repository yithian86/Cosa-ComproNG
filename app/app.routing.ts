import { AppGroceryListDetailsComponent } from "~/components/grocery-list-details/components/app-grocery-list-details.component"
import { AppMyGroceryListsComponent } from "~/components/my-grocery-lists/components/app-my-grocery-lists.component";
import { AppProductListComponent } from "~/components/product-list/components/app-product-list.component"
import { AppBarcodeScannerComponent } from "~/components/product-list/components/app-barcode-scanner.component";

export const routes = [
  { path: "", redirectTo: "/home/groceryListDetails", pathMatch: "full" },
  {
    path: "home", children: [
      { path: "groceryListDetails", component: AppGroceryListDetailsComponent },
      { path: "myGroceryLists", component: AppMyGroceryListsComponent },
      {
        path: "productList", children: [
          { path: "list", component: AppProductListComponent },
          { path: "barcode-scanner", component: AppBarcodeScannerComponent }
        ]
      }
    ]
  }
];

export const navigatableComponents = [
  AppGroceryListDetailsComponent,
  AppMyGroceryListsComponent,
  AppProductListComponent,
  AppBarcodeScannerComponent
];