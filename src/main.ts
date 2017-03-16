import 'core-js';
import 'reflect-metadata';
import 'zone';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from  './app/app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule).catch(error=>console.error(error));