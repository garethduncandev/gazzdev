#!/usr/bin/env node

import { GazzDev } from './gazzdev.js';
import { GAZZDEV_VERSION } from './version.js';

const version = GAZZDEV_VERSION;
console.log(`v${version}`);

const gazzDev = new GazzDev();
const message = gazzDev.readme();
console.log(message);
