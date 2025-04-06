const midtransClient = require("midtrans-client");

if (!process.env.MIDTRANS_SERVER_KEY || !process.env.MIDTRANS_CLIENT_KEY) {
  throw new Error(
    "MIDTRANS_SERVER_KEY and MIDTRANS_CLIENT_KEY must be defined in environment variables."
  );
}

exports.snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
