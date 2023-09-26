const express = require("express");
const { AdminAuth } = require("../Middlewares/AdminAuth");
const {
  fetchHospitalAcc,
  fetchDonorAcc,
  fetchOrganizationAcc,
  DeleteHospAcc,
  DeleteDonorAcc,
} = require("../Controllers/Admin");
const Authenticated = require("../Middlewares/Authenticated");
const router = express.Router();

router
  .get("/get-hospital", Authenticated, AdminAuth, fetchHospitalAcc)
  .delete(`/get-hospital/:id`, Authenticated, AdminAuth, DeleteHospAcc);
router
  .get("/get-donor", Authenticated, AdminAuth, fetchDonorAcc)
  .delete("/get-donor/:id", Authenticated, AdminAuth, DeleteDonorAcc);
router.get("/get-organization", Authenticated, AdminAuth, fetchOrganizationAcc);
router.delete("/get-organization:/id", Authenticated, AdminAuth, DeleteHospAcc);

module.exports = router;
