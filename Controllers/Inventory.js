const User = require("../Model/User");
const Inventory = require("../Model/Inventory");
const mongoose = require("mongoose");

exports.createInventory = async (req, res) => {
  const { email } = req.body;
  // console.log("email", email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ succes: false, message: "user not found" });
    }
    // if (req.body.inventoryType === "in" && user.role !== "donor") {
    //   return res
    //     .status(400)
    //     .json({ succes: false, message: "Not a donor accout" });
    // }

    if (req.body.inventoryType === "out") {
      const bloodgroup = req.body.bloodGroup;
      const quantity = req.body.quantity;
      const organization = new mongoose.Types.ObjectId(req.body.userId);
      // console.log(bloodgroup, quantity, organization);

      const totalInRequestedBlood = await Inventory.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: bloodgroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log(totalInRequestedBlood);
      const totalIn = totalInRequestedBlood[0]?.total || 0;
      // console.log("out total", totalIn);

      //calculating total of OUt blood
      const totalOutofReqBloodGroup = await Inventory.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: bloodgroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      console.log(totalOutofReqBloodGroup);
      const totalOut = totalOutofReqBloodGroup[0]?.total || 0;
      console.log("first, ", totalOut);

      //in & out calculation
      const availQuantityOfBloodGroup = totalIn - totalOut;

      // console.log(availQuantityOfBloodGroup);

      if (availQuantityOfBloodGroup < quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${availQuantityOfBloodGroup} is available of ${bloodgroup.toUpperCase()}`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donor = user?._id;
    }

    const newInventory = await Inventory.create(req.body);
    // console.log(newInventory);
    await newInventory.save();
    return res.status(201).json({
      success: true,
      message: "new blood record added",
      newInventory,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "unable to create inventory",
      error: error.message,
    });
  }
};

exports.recentInventoryRecords = async (req, res) => {
  try {
    const records = await Inventory.find({ organization: req.body.userId })
      .limit(3)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "recent inventory data",
      records,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unable to find recent inventory data",
      error: error.message,
    });
  }
};
exports.fetchAllRecordsForHosp = async (req, res) => {
  // console.log(req.user, "in records fetch");
  try {
    const doc = await Inventory.find(req.body.filters)
      .populate("donor")
      .populate("hospital")
      .populate("organization")
      .sort({ createdAt: -1 });
    if (!doc) {
      return res.status(400).json({
        succes: false,
        message: "unable to find Hospital Consumer record",
      });
    }

    res.status(200).json({
      succes: true,
      message: "Records Successfully found",
      doc,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "unable having consumer  records",
      error: error.message,
    });
  }
};
exports.fetchAllRecords = async (req, res) => {
  // console.log(req.user, "in records fetch");
  try {
    const doc = await Inventory.find({ organization: req.body.userId })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    if (!doc) {
      return res
        .status(400)
        .json({ succes: false, message: "unable to find record" });
    }

    res.status(200).json({
      succes: true,
      message: "Records Successfully found",
      doc,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: "unable having final error",
      error: error.message,
    });
  }
};

exports.fetchAlldonors = async (req, res) => {
  try {
    const organization = req.body.userId;
    const donorId = await Inventory.distinct("donor", { organization });
    // console.log(donorId);
    if (!donorId) {
      res.status(400).json({
        succes: false,
        message: " not a sinlge donor found",
        error: error.message,
      });
    }
    const donors = await User.find({ _id: { $in: donorId } });
    return res.status(200).json({
      success: true,
      message: "donor found successfuly",
      donors,
    });
  } catch (error) {
    res.status(400).json({
      succes: false,
      message: " error fetching donors data",
      error: error.message,
    });
  }
};

exports.fetchAllorganizations = async (req, res) => {
  try {
    const donorId = req.body.userId;
    // console.log("donor", donorId);
    // ********************************
    // "look from adding id of user org data is not being frtch"
    // ********************************************

    const OrgId = await Inventory.distinct("organization");
    // console.log("org", OrgId);
    if (!OrgId) {
      return res.status(400).json({
        success: false,
        message: "No single hospital is found",
      });
    }
    const OrgData = await User.find({ _id: { $in: OrgId } });
    res.status(200).json({
      message: "Organization Data found",
      success: true,
      OrgData,
    });
  } catch (error) {
    res.status(400).json({
      message: "NO Organization Data fount",
      error: erroe.message,
      success: false,
    });
  }
};
exports.fetchAllhospitals = async (req, res) => {
  try {
    const organization = req.body.userId;
    const hospitals = await Inventory.distinct("hospital", { organization });
    if (!hospitals) {
      return res.status(400).json({
        success: false,
        message: "No single hospital is found",
      });
    }
    const hospitalData = await User.find({ _id: { $in: hospitals } });
    res.status(200).json({
      message: "Hospital Data found",
      success: true,
      hospitalData,
    });
  } catch (error) {
    res.status(400).json({
      message: "NO Hospital Data fount",
      error: erroe.message,
      success: false,
    });
  }
};

exports.fetchOrgForHosp = async (req, res) => {
  try {
    const hospId = req.body.userId;

    // ********************************
    // "look from adding id of user org data is not being frtch"
    // ********************************************

    const OrgId = await Inventory.distinct("organization");
    // console.log("org", OrgId);
    if (!OrgId) {
      return res.status(400).json({
        success: false,
        message: "No single org is found",
      });
    }
    const OrgData = await User.find({ _id: { $in: OrgId } });
    res.status(200).json({
      message: "Organization Data found",
      success: true,
      OrgData,
    });
  } catch (error) {
    res.status(400).json({
      message: "NO Organization Data fount",
      error: erroe.message,
      success: false,
    });
  }
};
