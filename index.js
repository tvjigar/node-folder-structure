import app from './src/app.js';
import config from './src/config.js';

import bootstrap from './src/core/bootstrap.js';

import { LoggerService } from './src/core/logger/index.js';
import { MailerService } from './src/core/mailer/index.js';
import { DatabaseService } from './src/core/database/index.js';

let server = null;

bootstrap({
    modules: [
        MailerService,
        DatabaseService,
    ],
    startup: () => {
        server = app.listen(config.port, () => {
            LoggerService.logger.info(`[EXPRESS] Started server successfully and listening to port:  ${config.port}.`);
        });
    },
    cleanup: () => {
        if (server) {
            server.close(() => {
                LoggerService.logger.info('[EXPRESS] Server closed.');
            });
        }
    }
});
