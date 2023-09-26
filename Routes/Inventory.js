const express = require("express");
const {
  createInventory,
  fetchAllRecords,
  fetchAlldonors,
  fetchAllhospitals,
  fetchAllorganizations,
  fetchOrgForHosp,
  fetchAllRecordsForHosp,
  recentInventoryRecords,
} = require("../Controllers/Inventory");
const Authenticated = require("../Middlewares/Authenticated");
const router = express.Router();

router.post("/create", Authenticated, createInventory);
router.get("/all-records", Authenticated, fetchAllRecords);
router.get("/recent-records", Authenticated, recentInventoryRecords);
router.post("/all-records-consumer", Authenticated, fetchAllRecordsForHosp);
router.get("/donors", Authenticated, fetchAlldonors);
router.get("/hospitals", Authenticated, fetchAllhospitals);
router.get("/organizations", Authenticated, fetchAllorganizations);
router.get("/org-for-hosp", Authenticated, fetchOrgForHosp);

module.exports = router;
