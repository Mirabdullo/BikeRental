const User = require("../model/User");
const { koaError, validationPhoneNumber, validationEmail } = require("./error");
const UserGroup = require("../model/UserGroup");
const bcrypt = require("bcryptjs");
const DeviceDetector = require("node-device-detector");
const ApiError = require("../error/ApiError");
const jwt = require('../services/JwtService');
const config = require('config');
const Token = require("../model/Token");

const detector = new DeviceDetector({
  clientIndex: true,
  deviceIndexes: true,
  deviceAliasCode: true,
});

const getUser = async (ctx) => {
  try {
    const user = await User.findAll();
    if (user.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(user, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};


const logoutUser = async (ctx) => {
  try {
    console.log(ctx.request.cookies);
    const refreshToken = ctx.cookies.get("refreshToken");
    let token;
    if (!refreshToken)
      return ctx.error(400, { friendlyMsg: "Token topilmadi" });

    token = await Token.findOne({where: {token: refreshToken}})

    if (!token) return ctx.error(400, { friendlyMsg: "token topilmadi" });

    await Token.destroy({where: {token: refreshToken}})
    ctx.cookies.set("refreshToken", null);
    
    ctx.ok(200, "Deleted");
  } catch (error) {
    console.log(error);
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};



const getUserById = async (ctx) => {
  try {
    console.log(1);
    const user = await User.findByPk(ctx.params.id);
    if (!user) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.ok(200,user);
  } catch (error) {
    console.log(error);
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "xatolik",
    });
  }
};

const addUser = async (ctx) => {
  try {
    const {
      username,
      password,
      avatar,
      fullname,
      contact,
      email,
      user_category_id,
      status,
    } = ctx.request.body;
    // console.log(ctx.request.body);
    if (
      !username &&
      !password &&
      !avatar &&
      !fullname &&
      !contact &&
      !email &&
      !user_category_id
    ) {
      return (ctx.body = (400, "Ma'lumotlarni to'liq kiriting!"));
    }

    
    const userGroup = await UserGroup.findByPk(user_category_id);
    if (!userGroup) {
      return ctx.error(404, {friendlyMsg: "CategoryId Ma'lumotlar topilmadi"});
    }
    if (!validationPhoneNumber(contact)) {
      return (ctx.error(404, "Raqam noto'g'ri"));
    }

    if (!validationEmail(email)) {
      return (ctx.error(404, "Email noto'g'ri"));
    }
    const newpassword = bcrypt.hashSync(password,7)

    const user = await User.create({
      username,
      password: newpassword,
      avatar,
      fullname,
      contact,
      email,
      user_category_id,
      status,
    });

    ctx.body = user
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const loginUser = async (ctx) => {
  try {
    console.log(1);
    const userAgent = ctx.request.headers["user-agent"];
    const result = detector.detect(userAgent);
    // console.log("result parse", result);
    const { login, password } = ctx.request.body;
    let user;
    if (!validationEmail(login))
      return ctx.error(400, { friendlyMsg: "Email noto'g'ri" });
    user = await User.findOne({ where: { email: login } });
    console.log(user);
    if (!user) return ctx.error(400, { friendlyMsg: "user topilmadi" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return ctx.error(400, { friendlyMsg: "Password invalid" });
    const payload = {
      id: user._id,
      status: user.status,
    };
    const agent = ctx.request.headers["user-agent"];

    const tokens = jwt.generateTokens(payload);
    console.log(tokens);
    const newUser = await User.update(
      { user_token: tokens.refreshToken, status: true },
      { where: { id: user.id } }
    );
    const obj = {
      user_id: newUser.id,
      user_os: JSON.stringify(result.os),
      user_device: JSON.stringify(result.device),
      token: tokens.refreshToken,
      table_name: "User",
    };
    await Token.create(obj)
    ctx.cookies.set("refreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });
    ctx.ok(200, tokens);
  } catch (error) {
    ApiError.internal(ctx, {
      message: error,
      friendlyMsg: "Serverda xatolik",
    });
  }
};



const updateUser = async (ctx) => {
  try {
    const user = await User.findByPk(ctx.params.id);
    if (!user)
      return (ctx.body = koaError(
        404,
        `${ctx.params.id}-idga tegishli ma'lumotlar topilmadi`
      ));

    const {
      user_name,
      password,
      avatar,
      fullname,
      contact,
      email,
      user_category_id,
      status,
    } = ctx.body;

    if (
      !user_name &&
      !password &&
      !avatar &&
      !fullname &&
      !contact &&
      !email &&
      !user_category_id
    ) {
      return ctx.error(404, "Ma'lumotlarni to'liq kiriting'");
    }

    const category = await userCategory.findOne({ where: { id: password } });
    if (!category) {
      return ctx.error(404, " CategoryId Ma'lumotlar topilmadi");
    }
    password = bcrypt.hashSync(password, 7);

    const newuser = await User.update(
      {
        user_name,
        password,
        avatar,
        fullname,
        contact,
        email,
        user_category_id,
        status,
      },
      {
        where: {
          id: ctx.params.id,
        },
      }
    );
    ctx.status = 200;
    ctx.body = JSON.stringify(newuser, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const deleteUser = async (ctx) => {
  try {
    const user = await User.findByPk(ctx.params.id);
    if (!user) return ctx.error(404, "Ma'lumotlar topilmadi");

    await User.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.status = 200;
    ctx.body = {
      message: `Userdan ${ctx.params.id}-id ma'lumotlari o'chirildi`,
    };
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

module.exports = {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
};
