const Management = require("../model/AdsManagement");
const { koaError } = require("./error");
const shopInfo = require("../model/ShopInfo");
const User = require("../model/User");

const getManagement = async (ctx) => {
  try {
    const management = await Management.findAll();
    if (management.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(management, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const getManagementById = async (ctx) => {
  try {
    const id = ctx.params.id;
    const management = await Management.findByPk(id);
    if (!management) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(management, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const addManagement = async (ctx) => {
  try {
    const {
      ad_name,
      shop_id,
      banner_img,
      description,
      start_date,
      end_date,
      ad_location,
      amount,
      user_id,
    } = ctx.request.body;

    if (
      !ad_name ||
      !shop_id ||
      !banner_img ||
      !description ||
      !start_date ||
      !end_date ||
      !amount ||
      !user_id
    ) {
      return (ctx.body = { message: "Ma'lumotlarni to'liq kiriting!" });
    }
    console.log(1);
    const shop = await shopInfo.findOne({ where: { id: shop_id } });
    if (!shop) {
      return ctx.error(404, "ShopId Ma'lumotlar topilmadi");
    }
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return ctx.error(404, "UserId Ma'lumotlar topilmadi");
    }
    const management = await Management.create({
      ad_name,
      shop_id,
      banner_img,
      description,
      start_date,
      end_date,
      ad_location,
      amount,
      user_id,
    });
    ctx.status = 201;
    ctx.body = JSON.stringify(management, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const updateManagement = async (ctx) => {
  try {
    const management = await Management.findByPk(ctx.params.id);
    if (!management)
      return (ctx.body = koaError(
        404,
        `${ctx.params.id}-idga tegishli ma'lumotlar topilmadi`
      ));

    const {
      ad_name,
      shop_id,
      banner_img,
      description,
      start_date,
      end_date,
      amount,
      ad_location,
      user_id,
    } = ctx.body;

    if (
      !ad_name ||
      !shop_id ||
      !banner_img ||
      !description ||
      !start_date ||
      !end_date ||
      !amount ||
      !user_id
    ) {
      return ctx.error(404, "Ma'lumotlarni to'liq kiriting'");
    }

    const shop = await shopInfo.findOne({ where: { id: shop_id } });
    if (!shop) {
      return ctx.error(404, "ShopId Ma'lumotlar topilmadi");
    }
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return ctx.error(404, "Userid Ma'lumotlar topilmadi");
    }

    const newmanagement = await Management.update(
      {
        ad_name,
        shop_id,
        banner_img,
        description,
        start_date,
        end_date,
        ad_location,
        amount,
        user_id,
      },
      {
        where: {
          id: ctx.params.id,
        },
      }
    );
    ctx.status = 200;
    ctx.body = JSON.stringify(newmanagement, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const deleteManagement = async (ctx) => {
  try {
    const management = await Management.findByPk(ctx.params.id);
    if (!management) return ctx.error(404, "Ma'lumotlar topilmadi");

    await Management.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.status = 200;
    ctx.body = {
      message: `Managementdan ${ctx.params.id}-id ma'lumotlari o'chirildi`,
    };
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

module.exports = {
  getManagement,
  getManagementById,
  addManagement,
  updateManagement,
  deleteManagement,
};
