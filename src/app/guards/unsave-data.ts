import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { HasUnsavedData } from '../interfaces/unsave-data';

@Injectable()
export class HasUnsavedDataGuard implements CanDeactivate<HasUnsavedData> {
    canDeactivate(component: HasUnsavedData): boolean {
        if (component.hasUnsavedData()) {
            return confirm('You have some unsaved form data. Are you sure, you want to leave this page?');
        }
        return true;
    }
}
