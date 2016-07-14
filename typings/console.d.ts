/** 是否是开发模式 when `process.env.NODE_ENV` is `development` */
declare var __DEV__: boolean;

/** 是否是生产模式 when `process.env.NODE_ENV` is `production` */
declare var __PROD__: boolean;

/** 是否是开发模式 when `process.env.NODE_ENV` is `test` */
declare var __TEST__: boolean;

/** 是否是调试模式 when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)*/
declare var __DEBUG__: boolean;

/** [npm history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md) */
declare var __BASENAME__: string;
