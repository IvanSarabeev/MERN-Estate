"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordRegex = exports.usernameRegex = void 0;
exports.usernameRegex = /^[a-zA-Z0-9_]+$/;
exports.passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
