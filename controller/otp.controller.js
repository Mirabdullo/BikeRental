const OTP = require("../model/OTP");
const { encode, decode } = require("../services/crypt");
const { v4: uuidv4 } = require("uuid");
const ApiError = require("../error/ApiError");
const otpGenerator = require("otp-generator");
const Client = require("../model/Client");
const bcrypt = require("bcryptjs");
const Token = require("../model/Token");
const jwt = require("../services/JwtService");
const config = require('config');
const DeviceDetector = require('node-device-detector')

const detector = new DeviceDetector({
  clientIndex: true,
  deviceIndexes: true,
  deviceAliasCode: true
})



function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 600000);
}

const dates = {
  convert: function (d) {
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};
// console.log(dates);

const newOTP = async (ctx) => {
  try {
    console.log(ctx.body);
    const { contact_number } = ctx.request.body;
    //Gererate OTP
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 3);


    const id = uuidv4();
    const newOtp = await OTP.create({ id, otp, expiration_time });

    const details = {
      timestamp: now,
      check: contact_number,
      success: true,
      message: "OTP send to user",
      otp_id: newOtp.id,
    };
    console.log(details);
    const encoded = await encode(JSON.stringify(details));

    return ctx.ok(200, { Status: " Success", Details: encoded });
  } catch (error) {
    console.log(error);
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda xatolik!",
    });
  }
};

const verifyOTP = async (ctx) => {
  try {
    const userAgent = ctx.request.headers["user-agent"]
    const deviceAgent = detector.detect(userAgent)

    console.log(deviceAgent);

    const { verification_key, otp, check } = ctx.request.body;
    let currentdate = new Date();
    let decoded;
    try {
      decoded = await decode(verification_key);
    } catch (err) {
      const response = { Status: "Failure", Details: "Bad Request" };
      return (ctx.body = response);
    }

    let obj = JSON.parse(decoded);
    const check_obj = obj.check;

    if (check_obj != check) {
      const response = {
        Status: "Failure",
        Details: "OTP was not sent to this particular  phone number",
      };
      return (ctx.body = response);
    }
    let params = {
      id: obj.otp_id,
    };

    const otpResult = await OTP.findOne({ where: { id: params.id } });
    console.log(otpResult.otp);
    const result = otpResult;
    if (result != null) {
      //Check if OTP is already used or not
      if (result.verified != true) {
        //Check if OTP is expired or not
        if (dates.compare(result.expiration_time, currentdate) == 1) {
          //Check if OTP is equal to the OTP in the DB
          if (otp == result.otp) {
            let params_verified = {
              id: result.id,
              verified: true,
            };
            await OTP.update(
              { verified: params_verified.verified },
              { where: { id: params_verified.id } }
            );
            const clientResult = await Client.findOne({where: {
              contact_number: check,
            }});
            if (!clientResult) {
              const newClient = await Client.create({
                contact_number: check,
                otp_id: result.id,
                status: true,
              });
              const payload = {
                id: newClient.id,
                status: newClient.status,
              };
              const tokens = jwt.generateTokens(payload);

              const response = {
                id: newClient.id,
                Status: "Success",
                Details: "new",
                Check: check,
                accessToken: tokens.accessToken
              };


              const agent = {
                user_id: newClient.id,
                user_os: JSON.stringify(deviceAgent.os),
                user_device: JSON.stringify(deviceAgent.device),
                token: tokens.refreshToken,
                table_name: "Client"
              }
              console.log(agent);


              const newToken = await Token.create(agent)
              ctx.cookies.set("refreshToken", tokens.refreshToken, {
                macAge: config.get("refresh_ms"),
                httpOnly: true,
              });


              return ctx.ok(200, response);




            } else {

              const client = await Client.update(
                { otp_id: result.id },
                { where: { contact_number: check } }
              );

              const payload = {
                id: client.id,
                status: client.status,
              };
              const tokens = jwt.generateTokens(payload);

              
              const agent = {
                user_id: client.id,
                user_os: JSON.stringify(deviceAgent.os),
                user_device: JSON.stringify(deviceAgent.device),
                token: tokens.refreshToken,
                table_name: "Client"
              }
              console.log(agent);
              const newToken = await Token.create(agent);
              ctx.cookies.set("refreshToken", tokens.refreshToken, {
                macAge: config.get("refresh_ms"),
                httpOnly: true,
              });
              const response = {
                Status: "Success",
                Details: "old",
                Check: check,
                Username: client.client_name,
                accessToken: tokens.accessToken
              };


              return ctx.ok(200, response);
            }
          } else {
            const response = { Status: "Failure", Details: "OTP NOT Matched" };
            return ctx.ok(400, response);
          }
        } else {
          const response = { Status: "Failure", Details: "OTP Expired" };
          return ctx.ok(400, response);
        }
      } else {
        const response = { Status: "Failure", Details: "OTP Already Used" };
        return ctx.ok(400, response);
      }
    } else {
      const response = { Status: "Failure", Details: "Bad Request" };
      return ctx.ok(400, response);
    }
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }

  //res.ok(result);
};

async function deleteOTP(ctx) {
  try {
    const { verification_key, check } = ctx.body;

    let decoded;

    try {
      decoded = await decode(verification_key);
    } catch (err) {
      const response = { Status: "Failure", Details: "Bad Request" };
      return ctx.ok(400, response);
    }
    let obj = JSON.parse(decoded);
    const check_obj = obj.check;

    if (check_obj != check) {
      const response = {
        Status: "Failure",
        Details: "OTP was not sent to this particular  phone number",
      };
      return ctx.ok(400, response);
    }
    let params = {
      id: obj.otp_id,
    };

    const deletedOTP = await OTP.destroy({ id: params.id });
    if (deletedOTP == null) {
      return ctx.error(400, { friendlyMsg: "Invalid OTP" });
    }
    return ctx.ok(200, params);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
}

const getOTPByID = async (ctx) => {
  try {
    let id = ctx.params.id;
    const otpResult = await OTP.findByPk({ id });
    const result = otpResult;
    if (otpResult == null) {
      return ctx.error(400, { friendlyMsg: "Invalid OTP" });
    }

    return ctx.ok(200, result);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};

module.exports = {
  newOTP,
  getOTPByID,
  verifyOTP,
  deleteOTP,
};
