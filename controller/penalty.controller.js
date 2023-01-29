const Penalty = require("../model/Penalty");
const { koaError } = require("./error");
const Rental = require("../model/Rental");
const User = require("../model/User");

const getPenalty = async (ctx) => {
  try {
    const penalty = await Penalty.findAll();
    if (penalty.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(penalty, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const getPenaltyById = async (ctx) => {
  try {
    const penalty = await Penalty.findByPk(ctx.params.id);
    if (!penalty) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(penalty, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const addPenalty = async (ctx) => {
  try {
    const {
      rental_id,
      penalty_amount,
      payment_status,
      remarks,
      paid_by,
      user_id,
    } = ctx.request.body;

    if (
      !rental_id ||
      !penalty_amount ||
      !payment_status ||
      !remarks ||
      !paid_by ||
      !user_id
    ) {
      return (ctx.body = { message: "Ma'lumotlarni to'liq kiriting!" });
    }

    const rental = await Rental.findOne({ where: { id: rental_id } });
    if (!rental) {
      return ctx.error(404, "ShopId Ma'lumotlar topilmadi");
    }
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return ctx.error(404, "UserId Ma'lumotlar topilmadi");
    }
    const penalty = await Penalty.create({
      rental_id,
      penalty_amount,
      payment_status,
      remarks,
      paid_by,
      user_id,
    });
    ctx.status = 201;
    ctx.body = JSON.stringify(penalty, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const updatePenalty = async (ctx) => {
  try {
    const penalty = await Penalty.findByPk(ctx.params.id);
    if (!penalty)
      return ctx.error(
        404,
        `${ctx.params.id}-idga tegishli ma'lumotlar topilmadi`
      );

    const {
      rental_id,
      penalty_amount,
      payment_status,
      remarks,
      paid_by,
      user_id,
    } = ctx.body;

    if (
      !rental_id ||
      !penalty_amount ||
      !payment_status ||
      !remarks ||
      !paid_by ||
      !user_id
    ) {
      return ctx.error(404, "Ma'lumotlarni to'liq kiriting'");
    }

    const rental = await Rental.findOne({ where: { id: rental_id } });
    if (!rental) {
      return ctx.error(404, "ShopId Ma'lumotlar topilmadi");
    }
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return ctx.error(404, "Userid Ma'lumotlar topilmadi");
    }

    const newpenalty = await Penalty.update(
      {
        rental_id,
        penalty_amount,
        payment_status,
        remarks,
        paid_by,
        user_id,
      },
      {
        where: {
          id: ctx.params.id,
        },
      }
    );
    ctx.status = 200;
    ctx.body = JSON.stringify(newpenalty, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const deletePenalty = async (ctx) => {
  try {
    const penalty = await Penalty.findByPk(ctx.params.id);
    if (!penalty) return ctx.error(404, "Ma'lumotlar topilmadi");

    await Penalty.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.status = 200;
    ctx.body = {
      message: `Penaltydan ${ctx.params.id}-id ma'lumotlari o'chirildi`,
    };
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

module.exports = {
  getPenalty,
  getPenaltyById,
  addPenalty,
  updatePenalty,
  deletePenalty,
};
