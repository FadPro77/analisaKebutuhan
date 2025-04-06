const { successResponse } = require("../utils/response");
const paymentService = require("../services/payment");

exports.getPayment = async (req, res, next) => {
  const data = await paymentService.getPayment(req.query?.pesanan_id);

  successResponse(res, data);
};

exports.getPaymentById = async (req, res, next) => {
  const data = await paymentService.getPaymentById(req.params.id);
  successResponse(res, data);
};

exports.createPaymentManual = async (req, res, next) => {
  const data = await paymentService.createPaymentManual(req.body);
  successResponse(res, {
    message: "Payment Manual Created successfully!",
    data,
  });
};

exports.createPaymentMidtrans = async (req, res, next) => {
  try {
    const user = req.user;
    const { pesanan_id, jumlah } = req.body;

    const result = await paymentService.createMidtransPayment({
      pesanan_id,
      jumlah,
      user,
    });

    successResponse(res, {
      message: "Midtrans Snap Payment Created Successfully",
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

exports.handleMidtransNotification = async (req, res, next) => {
  try {
    console.log("Incoming Midtrans Notification:", req.body);

    await paymentService.createMidtransNotification(req.body);

    res.status(200).json({ message: "Notification received successfully" });
  } catch (error) {
    console.error("Midtrans Notification Handling Failed:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
