const bikeInfo = require("../model/BikeInfo");
const { koaError } = require("./error");
const bikeCategory = require("../model/BikeCategory");
const shopInfo = require("../model/ShopInfo");
const User = require("../model/User");

const getbikeInfo = async (ctx) => {
  try {
    const bike = await bikeInfo.findAll();
    if (bike.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(bike, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const getbikeInfoById = async (ctx) => {
  try {
    const bike = await bikeInfo.findByPk(ctx.params.id);
    if (!bike) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(bike, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const addbikeInfo = async (ctx) => {
  try {
    const {
      bike_category_id,
      shop_id,
      bike_name,
      specs,
      rent_price,
      availability,
      user_id,
    } = ctx.request.body;

    if (
      !bike_category_id &&
      !shop_id &&
      !bike_name &&
      !specs &&
      !rent_price &&
      !availability &&
      !user_id
    ) {
      return (ctx.body = { message: "Ma'lumotlarni to'liq kiriting!" });
    }
    const category = await bikeCategory.findOne({
      where: { id: bike_category_id },
    });
    if (!category) {
      return ctx.error(404, "CategoryId Ma'lumotlar topilmadi");
    }
    const shop = await shopInfo.findOne({ where: { id: shop_id } });
    if (!shop) {
      return ctx.error(404, "ShopId Ma'lumotlar topilmadi");
    }
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return ctx.error(404, "UserId Ma'lumotlar topilmadi");
    }
    const bike = await bikeInfo.create({
      bike_category_id,
      shop_id,
      bike_name,
      specs,
      rent_price,
      availability,
      user_id,
    });
    ctx.status = 201;
    ctx.body = JSON.stringify(bike, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const updatebikeInfo = async (ctx) => {
  try {
    const bike = await bikeInfo.findByPk(ctx.params.id);
    if (!bike)
      return ctx.error(
        404,
        `${ctx.params.id}-idga tegishli ma'lumotlar topilmadi`
      );

    const {
      bike_category_id,
      shop_id,
      bike_name,
      specs,
      rent_price,
      availability,
      user_id,
    } = ctx.body;

    if (
      !bike_category_id &&
      !shop_id &&
      !bike_name &&
      !specs &&
      !rent_price &&
      !availability &&
      !user_id
    ) {
      return ctx.error(404, "Ma'lumotlarni to'liq kiriting'");
    }

    const category = await bikeCategory.findOne({
      where: { id: bike_category_id },
    });
    if (!category) {
      return ctx.error(404, " CategoryId Ma'lumotlar topilmadi");
    }
    const shop = await shopInfo.findOne({ where: { id: shop_id } });
    if (!shop) {
      return ctx.error(404, "ShopId Ma'lumotlar topilmadi");
    }
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return ctx.error(404, "Userid Ma'lumotlar topilmadi");
    }

    const newBike = await bikeInfo.update(
      {
        bike_category_id,
        shop_id,
        bike_name,
        specs,
        rent_price,
        availability,
        user_id,
      },
      {
        where: {
          id: ctx.params.id,
        },
      }
    );
    ctx.status = 200;
    ctx.body = JSON.stringify(newBike, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const deletebikeInfo = async (ctx) => {
  try {
    const bike = await bikeInfo.findByPk(ctx.params.id);
    if (!bike) return ctx.error(404, "Ma'lumotlar topilmadi");

    await bikeInfo.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.status = 200;
    ctx.body = {
      message: `BikeInfodan ${ctx.params.id}-id ma'lumotlari o'chirildi`,
    };
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

module.exports = {
  getbikeInfo,
  getbikeInfoById,
  addbikeInfo,
  updatebikeInfo,
  deletebikeInfo,
};
