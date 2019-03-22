import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatDialogModule,
    ],
    exports: [
        CommonModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatDialogModule,
    ],
    declarations: []
})
export class MaterialModule { }
