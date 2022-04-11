const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.FROM_NUMBER;
const client = require('twilio')(accountSid, authToken);

const convertTo62 = (number) => {
  let validNumber = number;

  if (typeof number !== 'string') validNumber = `${number}`;

  if (!validNumber.startsWith('+62')) validNumber = `+62${number.slice(1)}`;

  return validNumber;
};

/**
 * @description Sent message from ${fromNumber} to ${toNumber}
 * @param {string} phoneNumber
 * @param {string} url
 */
exports.sentMessage = async (phoneNumber, url) => {
  try {
    const response = await client.messages.create({
      body: `Selamat siang, kami dari pihak sekolah ingin menyampaikan bahwa anak bapak/ibu telah mendapatkan surat peringatan yang dapat diunduh disini melalui link berikut ${url}.`,
      to: convertTo62(phoneNumber), // Text this number
      from: fromNumber, // From a valid Twilio number
    });

    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};
