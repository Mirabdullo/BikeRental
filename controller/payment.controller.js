const Payment = require("../model/Payment");
const { koaError } = require("./error");
const Rental = require("../model/Rental");
const User = require("../model/User");

const getPayment = async (ctx) => {
  try {
    const payment = await Payment.findAll();
    if (payment.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.ok(200, payment);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const getPaymentById = async (ctx) => {
  try {
    const id = ctx.params.id;
    const payment = await Payment.findByPk(id);
    if (!payment) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(payment, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const addPayment = async (ctx) => {
  try {
    const { rental_id, payment_type, paid_by, payment_date, remarks, user_id } =
      ctx.request.body;

    if (
      !rental_id ||
      !payment_type ||
      !paid_by ||
      !payment_date ||
      !remarks ||
      !user_id
    ) {
      return (ctx.body = { message: "Ma'lumotlarni to'liq kiriting!" });
    }

    const rental = await Rental.findOne({ where: { id: rental_id } });
    if (!rental) {
      return ctx.error(404, "RentalId Ma'lumotlar topilmadi");
    }
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return ctx.error(404, "UserId Ma'lumotlar topilmadi");
    }
    const payment = await Payment.create({
      rental_id,
      payment_type,
      paid_by,
      payment_date,
      remarks,
      user_id,
    });
    ctx.status = 201;
    ctx.body = JSON.stringify(payment, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const updatePayment = async (ctx) => {
  try {
    const payment = await Payment.findByPk(ctx.params.id);
    if (!payment)
      return ctx.error(
        404,
        `${ctx.params.id}-idga tegishli ma'lumotlar topilmadi`
      );

    const { rental_id, payment_type, paid_by, payment_date, remarks, user_id } =
      ctx.body;

    if (
      !rental_id ||
      !payment_type ||
      !paid_by ||
      !payment_date ||
      !remarks ||
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

    const newpayment = await Payment.update(
      {
        rental_id,
        payment_type,
        paid_by,
        payment_date,
        remarks,
        user_id,
      },
      {
        where: {
          id: ctx.params.id,
        },
      }
    );
    ctx.status = 200;
    ctx.body = JSON.stringify(newpayment, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const deletePayment = async (ctx) => {
  try {
    const payment = await Payment.findByPk(ctx.params.id);
    if (!payment) return ctx.error(404, "Ma'lumotlar topilmadi");

    await Payment.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.status = 200;
    ctx.body = {
      message: `Paymentdan ${ctx.params.id}-id ma'lumotlari o'chirildi`,
    };
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

module.exports = {
  getPayment,
  getPaymentById,
  addPayment,
  updatePayment,
  deletePayment,
};
