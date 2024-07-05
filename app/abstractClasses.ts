import type { Page } from '@playwright/test';
import { step } from '../misc/reporters/step';

export abstract class PageHolder {
    constructor(protected page: Page) {}
}

export class BaseComponent extends PageHolder {}

export abstract class BasePage extends PageHolder {
    public abstract path: string;

    /**
     * Opens the page in the browser and expectLoaded should pass
     */
    @step()
    async open(path?: string) {
        await this.page.goto(path ?? this.path);
    }
}
