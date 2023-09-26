const User = require("../Model/User");

exports.fetchHospitalAcc = async (req, res) => {
  try {
    const hospitalAcc = await User.find({ role: "hospital" });
    if (!hospitalAcc) {
      res.status(400).json({
        success: false,
        message: "unabel to found Hopital Accounts",
      });
    }
    res.status(200).json({
      success: true,
      message: " Hopital Accounts found",
      hospitalAcc,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unabel to fetch Hopital Accounts",
      error,
    });
  }
};
exports.fetchDonorAcc = async (req, res) => {
  try {
    const DonorAcc = await User.find({ role: "donor" });
    if (!DonorAcc) {
      res.status(400).json({
        success: false,
        message: "unabel to found Donor Accounts",
      });
    }
    res.status(200).json({
      success: true,
      message: " Hopital Donor found",
      DonorAcc,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unabel to fetch Donor Accounts",
      error,
    });
  }
};
exports.fetchOrganizationAcc = async (req, res) => {
  try {
    const OrganizationAcc = await User.find({ role: "organization" });
    if (!OrganizationAcc) {
      res.status(400).json({
        success: false,
        message: "unabel to found Organization Accounts",
      });
    }
    res.status(200).json({
      success: true,
      message: " Hopital Organization found",
      OrganizationAcc,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unabel to fetch Organization Accounts",
      error,
    });
  }
};

exports.DeleteHospAcc = async (req, res) => {
  const _id = req.params.id;
  try {
    const dellUser = await User.findByIdAndDelete(_id);

    res.status(200).json({
      success: true,
      message: "user delted",
      dellUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unabel to delete Accounts",
      error,
    });
  }
};
exports.DeleteOrgAcc = async (req, res) => {
  const _id = req.params.id;
  try {
    const dellUser = await User.findByIdAndDelete(_id);

    res.status(200).json({
      success: true,
      message: "user delted",
      dellUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unabel to delete Accounts",
      error,
    });
  }
};
exports.DeleteDonorAcc = async (req, res) => {
  const _id = req.params.id;
  try {
    const dellUser = await User.findByIdAndDelete(_id);

    res.status(200).json({
      success: true,
      message: "user delted",
      dellUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unabel to delete Accounts",
      error,
    });
  }
};
