const mongoose = require("mongoose");
const Inventory = require("../Model/Inventory");

exports.getbloodGroups = async (req, res) => {
  try {
    const bloodtype = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const organization = new mongoose.Types.ObjectId(req.body.userId);
    // console.log(organization);
    //getting single blod records
    await Promise.all(
      bloodtype.map(async (bd) => {
        //count toal IN blood
        const totalIn = await Inventory.aggregate([
          {
            $match: {
              bloodGroup: bd,
              inventoryType: "in",
              organization,
            },
          },

          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        //count total out
        const totalOut = await Inventory.aggregate([
          {
            $match: {
              bloodGroup: bd,
              inventoryType: "out",
              organization,
            },
          },

          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        // console.log(totalIn, totalOut);
        //calculate Blood
        const availabeBlood =
          (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        bloodGroupData.push({
          bloodGroup: bd,
          totalIn: totalIn[0]?.total || 0,
          totalOut: totalOut[0]?.total || 0,
          availabeBlood,
        });
      })
    );

    //push data

    res.status(200).json({
      success: true,
      messsage: "blood group data is fetched successfully",
      bloodGroupData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      messsage: "unable to fetch blood grup data ",
      error: error.messsage,
    });
  }
};
