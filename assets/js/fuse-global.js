// Fuse levert sinds versie 7.1 geen browserbundel meer, alleen ESM en CommonJS.
// js.Build (esbuild) maakt hier een gewoon script van dat Fuse op window zet.
import Fuse from '../vendor/fuse/fuse.min.mjs';

window.Fuse = Fuse;
