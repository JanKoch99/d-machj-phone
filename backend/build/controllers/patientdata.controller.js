"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientdataService_1 = require("../service/patientdataService");
// getting a single post
const getPatientData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield patientdataService_1.PatientdataService.getPatientData(Number(req.params.id))
        .then(posts => res.json(posts))
        .catch(err => res.json(err));
});
const createPatientData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield patientdataService_1.PatientdataService.createPatientData(req.body)
        .then(posts => res.json(posts))
        .catch(err => res.json(err));
});
exports.default = { getPatientData, createPatientData };
