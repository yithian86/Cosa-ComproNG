import { AppGroceryListDetailsComponent } from "~/components/grocery-list-details/components/app-grocery-list-details.component"
import { AppGroceryListFormComponent } from "~/components/grocery-list-details/components/app-grocery-list-form.component"
import { AppMyGroceryListsComponent } from "~/components/my-grocery-lists/components/app-my-grocery-lists.component";

export const routes = [
  { path: "", redirectTo: "/home/groceryList/groceryListDetails", pathMatch: "full" },
  {
    path: "home", children: [
      {
        path: "groceryList", children: [
          { path: "groceryListDetails", component: AppGroceryListDetailsComponent },
          { path: "groceryListForm", component: AppGroceryListFormComponent }
        ]
      },
      {
        path: "myGroceryLists", component: AppMyGroceryListsComponent
      }
    ]
  }
];

export const navigatableComponents = [
  AppGroceryListDetailsComponent,
  AppGroceryListFormComponent,
  AppMyGroceryListsComponent
];