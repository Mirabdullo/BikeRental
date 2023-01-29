const Client = require("../model/Client");
const Token = require("../model/Token");
const OTP = require("../model/OTP")
const { koaError, validationEmail, validationPhoneNumber } = require("./error");

const getClient = async (ctx) => {
  try {
    const client = await Client.findAll();
    if (client.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(client, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};





const logoutClient = async (ctx) => {
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




const getClientById = async (ctx) => {
  try {
    const client = await Client.findByPk(ctx.params.id);
    if (!client) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(client, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const addClient = async (ctx) => {
  try {
    const {
      client_code,
      avatar,
      client_name,
      email_address,
      contact_number,
      complete_address,
      username,
      password,
      status,
    } = ctx.request.body;

    if (
      !client_code &&
      !avatar &&
      !client_name &&
      !email_address &&
      !contact_number &&
      !complete_address &&
      !username &&
      !password
    ) {
      return (ctx.body = (402, "Ma'lumotlarni to'liq kiriting!"));
    }

    if (!validationEmail(email_address)) {
      return (ctx.body = (400, "Email noto'g'ri"));
    }
    if (!validationPhoneNumber(contact_number)) {
      return (ctx.body = (400, "Raqam noto'g'ri"));
    }

    const client = await Client.create({
      client_code,
      avatar,
      client_name,
      email_address,
      contact_number,
      complete_address,
      username,
      password,
      status,
    });
    ctx.status = 201;
    ctx.body = JSON.stringify(client, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const updateClient = async (ctx) => {
  try {
    const client = await Client.findByPk(ctx.params.id);
    if (!client)
      return ctx.error(
        404,
        `${ctx.params.id}-idga tegishli ma'lumotlar topilmadi`
      );

    const {
      client_code,
      avatar,
      client_name,
      email_address,
      contact_number,
      complete_address,
      username,
      password,
      status,
    } = ctx.body;

    if (
      !client_code &&
      !avatar &&
      !client_name &&
      !email_address &&
      !contact_number &&
      !complete_address &&
      !username &&
      !password
    ) {
      return ctx.error(404, "Ma'lumotlarni to'liq kiriting'");
    }

    if (validationEmail(email_address)) {
      return (ctx.body = (400, "Email noto'g'ri"));
    }
    if (validationPhoneNumber(contact_number)) {
      return (ctx.body = (400, "Raqam noto'g'ri"));
    }

    const newClient = await Client.update(
      {
        client_code,
        avatar,
        client_name,
        email_address,
        contact_number,
        complete_address,
        username,
        password,
        status,
      },
      {
        where: {
          id: ctx.params.id,
        },
      }
    );
    ctx.status = 200;
    ctx.body = JSON.stringify(newClient, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const deleteClient = async (ctx) => {
  try {
    const client = await Client.findByPk(ctx.params.id);
    if (!client) return ctx.error(404, "Ma'lumotlar topilmadi");

    await Client.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.status = 200;
    ctx.body = {
      message: `Clientdan ${ctx.params.id}-id ma'lumotlari o'chirildi`,
    };
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

module.exports = {
  getClient,
  getClientById,
  addClient,
  updateClient,
  deleteClient,
};
