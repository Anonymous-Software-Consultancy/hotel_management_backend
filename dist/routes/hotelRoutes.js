"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hotelsController_1 = require("../controllers/hotelsController");
const router = (0, express_1.Router)();
router.post('/add-hotel', hotelsController_1.addHotel);
exports.default = router;
