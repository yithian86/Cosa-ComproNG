"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var AppBarcodeScannerComponent = /** @class */ (function () {
    function AppBarcodeScannerComponent(routerExtensions, barcodeScanner) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.barcodeScanner = barcodeScanner;
        this.getResultText = function () {
            return "Format: " + _this.format + ", Content: " + _this.code;
        };
        this.goToProductList = function () {
            console.log("Navigating to Product List...");
            _this.routerExtensions.navigate(["/home/productList/list"], {
                transition: {
                    name: "slideRight",
                    duration: 300
                }
            });
        };
        this.format = "-";
        this.code = "-";
    }
    AppBarcodeScannerComponent.prototype.ngOnInit = function () { };
    AppBarcodeScannerComponent.prototype.scanBarcode = function () {
        var _this = this;
        this.barcodeScanner.scan({
            formats: "CODE_39, CODE_93, CODE_128, EAN_8, EAN_13, UPC_E",
            showFlipCameraButton: true,
            preferFrontCamera: false,
            showTorchButton: true,
            beepOnScan: true,
            torchOn: false,
            resultDisplayDuration: 2000,
            orientation: "portrait",
            openSettingsIfPermissionWasPreviouslyDenied: true //ios only 
        }).then(function (result) {
            _this.format = result.format;
            _this.code = result.text;
        }, function (errorMessage) {
            console.log("Error when scanning " + errorMessage);
        });
    };
    AppBarcodeScannerComponent = __decorate([
        core_1.Component({
            selector: "app-barcode-scanner",
            templateUrl: "components/product-list/views/app-barcode-scanner.component.html",
            styleUrls: ["components/product-list/styles/app-barcode-scanner.component.css"],
            providers: [nativescript_barcodescanner_1.BarcodeScanner]
        }),
        __metadata("design:paramtypes", [router_extensions_1.RouterExtensions, nativescript_barcodescanner_1.BarcodeScanner])
    ], AppBarcodeScannerComponent);
    return AppBarcodeScannerComponent;
}());
exports.AppBarcodeScannerComponent = AppBarcodeScannerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtYmFyY29kZS1zY2FubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFDakYsMkVBQTZEO0FBUTdEO0lBSUUsb0NBQW9CLGdCQUFrQyxFQUFVLGNBQThCO1FBQTlGLGlCQUdDO1FBSG1CLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFPdkYsa0JBQWEsR0FBRztZQUNyQixNQUFNLENBQUMsYUFBVyxLQUFJLENBQUMsTUFBTSxtQkFBYyxLQUFJLENBQUMsSUFBTSxDQUFDO1FBQ3pELENBQUMsQ0FBQTtRQXFCTSxvQkFBZSxHQUFHO1lBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FBQztZQUM3QyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsd0JBQXdCLENBQUMsRUFBRTtnQkFDekQsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxZQUFZO29CQUNsQixRQUFRLEVBQUUsR0FBRztpQkFDZDthQUNGLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQXJDQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsNkNBQVEsR0FBUixjQUFZLENBQUM7SUFNTixnREFBVyxHQUFsQjtRQUFBLGlCQWlCQztRQWhCQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQztZQUN2QixPQUFPLEVBQUUsa0RBQWtEO1lBQzNELG9CQUFvQixFQUFFLElBQUk7WUFDMUIsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixlQUFlLEVBQUUsSUFBSTtZQUNyQixVQUFVLEVBQUUsSUFBSTtZQUNoQixPQUFPLEVBQUUsS0FBSztZQUNkLHFCQUFxQixFQUFFLElBQUk7WUFDM0IsV0FBVyxFQUFFLFVBQVU7WUFDdkIsMkNBQTJDLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDOUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU07WUFDYixLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDNUIsS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzFCLENBQUMsRUFBRSxVQUFDLFlBQVk7WUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLFlBQVksQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWhDVSwwQkFBMEI7UUFOdEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsV0FBVyxFQUFFLGtFQUFrRTtZQUMvRSxTQUFTLEVBQUUsQ0FBQyxrRUFBa0UsQ0FBQztZQUMvRSxTQUFTLEVBQUUsQ0FBQyw0Q0FBYyxDQUFDO1NBQzVCLENBQUM7eUNBS3NDLG9DQUFnQixFQUEwQiw0Q0FBYztPQUpuRiwwQkFBMEIsQ0E0Q3RDO0lBQUQsaUNBQUM7Q0FBQSxBQTVDRCxJQTRDQztBQTVDWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyL3JvdXRlci1leHRlbnNpb25zXCI7XHJcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1iYXJjb2RlLXNjYW5uZXJcIixcclxuICB0ZW1wbGF0ZVVybDogXCJjb21wb25lbnRzL3Byb2R1Y3QtbGlzdC92aWV3cy9hcHAtYmFyY29kZS1zY2FubmVyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJjb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9zdHlsZXMvYXBwLWJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuY3NzXCJdLFxyXG4gIHByb3ZpZGVyczogW0JhcmNvZGVTY2FubmVyXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwQmFyY29kZVNjYW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHByaXZhdGUgZm9ybWF0OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBjb2RlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIpIHtcclxuICAgIHRoaXMuZm9ybWF0ID0gXCItXCI7XHJcbiAgICB0aGlzLmNvZGUgPSBcIi1cIjtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge31cclxuXHJcbiAgcHVibGljIGdldFJlc3VsdFRleHQgPSAoKTogc3RyaW5nID0+IHtcclxuICAgIHJldHVybiBgRm9ybWF0OiAke3RoaXMuZm9ybWF0fSwgQ29udGVudDogJHt0aGlzLmNvZGV9YDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzY2FuQmFyY29kZSgpIHtcclxuICAgIHRoaXMuYmFyY29kZVNjYW5uZXIuc2Nhbih7XHJcbiAgICAgIGZvcm1hdHM6IFwiQ09ERV8zOSwgQ09ERV85MywgQ09ERV8xMjgsIEVBTl84LCBFQU5fMTMsIFVQQ19FXCIsIC8vIFFSX0NPREUgYWxzbyBhbGxvd2VkXHJcbiAgICAgIHNob3dGbGlwQ2FtZXJhQnV0dG9uOiB0cnVlLFxyXG4gICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsXHJcbiAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgYmVlcE9uU2NhbjogdHJ1ZSxcclxuICAgICAgdG9yY2hPbjogZmFsc2UsXHJcbiAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogMjAwMCxcclxuICAgICAgb3JpZW50YXRpb246IFwicG9ydHJhaXRcIixcclxuICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZSAvL2lvcyBvbmx5IFxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIHRoaXMuZm9ybWF0ID0gcmVzdWx0LmZvcm1hdDtcclxuICAgICAgdGhpcy5jb2RlID0gcmVzdWx0LnRleHQ7XHJcbiAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBzY2FubmluZyBcIiArIGVycm9yTWVzc2FnZSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnb1RvUHJvZHVjdExpc3QgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gUHJvZHVjdCBMaXN0Li4uXCIpO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3Byb2R1Y3RMaXN0L2xpc3RcIl0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVSaWdodFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufSJdfQ==