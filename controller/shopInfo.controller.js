const shopInfo = require("../model/ShopInfo");
const { koaError, validationPhoneNumber, validationEmail } = require("./error");

const getShopInfo = async (ctx) => {
  try {
    console.log(koaError);
    const shop = await shopInfo.findAll();
    if (shop.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(shop, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const getShopInfoById = async (ctx) => {
  try {
    const id = ctx.params.id;
    const shop = await shopInfo.findByPk(id);
    if (shop.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(shop, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const addShopInfo = async (ctx) => {
  try {
    const {
      shop_name,
      owner_name,
      address,
      email_address,
      contact_no,
      website,
      update_by,
    } = ctx.request.body;

    if (
      !shop_name ||
      !owner_name ||
      !address ||
      !email_address ||
      !contact_no ||
      !website ||
      !update_by
    ) {
      return ctx.error(404, "Ma'lumotlarni to'liq kiriting");
    }
    const check = await shopInfo.findOne({ where: { shop_name } });
    if (check) {
      return ctx.error(500, "Bu nom band qilingan");
    }

    if (!validationPhoneNumber(contact_no)) {
      return ctx.error(404, "Raqam noto'g'ri");
    }

    if (!validationEmail(email_address)) {
      return ctx.error(404, "Email noto'g'ri");
    }

    const shop = await shopInfo.create({
      shop_name,
      owner_name,
      address,
      email_address,
      contact_no,
      website,
      update_by,
    });
    ctx.status = 200;
    ctx.body = JSON.stringify(shop, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const updateShopInfo = async (ctx) => {
  try {
    const shop = await shopInfo.findByPk(ctx.params.id);
    if (!shop) return ctx.error(404, "Ma'lumotlar topilmadi");

    const {
      shop_name,
      owner_name,
      address,
      email_address,
      contact_no,
      website,
      update_by,
    } = ctx.body;

    if (
      !shop_name ||
      !owner_name ||
      !address ||
      !email_address ||
      !contact_no ||
      !website ||
      !update_by
    ) {
      return (ctx.body = { message: "Ma'lumotlarni to'liq kiriting!" });
    }

    const check = await shopInfo.findOne({ where: { shop_name } });
    if (!check) {
      return (ctx.body = koaError(500, "Bu nom band qilingan"));
    }

    if (!validationPhoneNumber(contact_no)) {
      return ctx.error(404, "Raqam noto'g'ri");
    }

    if (!validationEmail(email_address)) {
      return ctx.error(404, "Email noto'g'ri");
    }

    const newShop = await shopInfo.update(
      {
        shop_name,
        owner_name,
        address,
        email_address,
        contact_no,
        website,
        update_by,
      },
      {
        where: {
          id: ctx.params.id,
        },
      }
    );
    ctx.status = 200;
    ctx.body = JSON.stringify(newShop, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const deleteShopInfo = async (ctx) => {
  try {
    const id = ctx.params.id;
    const shop = await shopInfo.findByPk(id);
    if (!shop) return ctx.error(404, "Ma'lumotlar topilmadi");

    await shopInfo.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.status = 200;
    ctx.body = {
      message: `Shop ${ctx.params.id}-id ma'lumotlari o'chirildi`,
    };
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

module.exports = {
  getShopInfo,
  getShopInfoById,
  addShopInfo,
  updateShopInfo,
  deleteShopInfo,
};
