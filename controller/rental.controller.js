const Rental = require("../model/Rental");
const { koaError } = require("./error");
const bikeInfo = require("../model/BikeInfo");
const Client = require("../model/Client");
const User = require("../model/User");

const getRental = async (ctx) => {
  try {
    const rental = await Rental.findAll();
    if (rental.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(rental, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const getRentalById = async (ctx) => {
  try {
    const rental = await Rental.findByPk(ctx.params.id);
    if (!rental) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(rental, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const addRental = async (ctx) => {
  try {
    const {
      bike_id,
      client_id,
      rental_start_date,
      rental_end_date,
      total_amount,
      payment_status,
      rental_status,
      remarks,
      user_id,
    } = ctx.request.body;

    if (
      !bike_id ||
      !client_id ||
      !rental_start_date ||
      !rental_end_date ||
      !total_amount ||
      !remarks ||
      !user_id
    ) {
      return (ctx.body = { message: "Ma'lumotlarni to'liq kiriting!" });
    }
    const client = await Client.findOne({ where: { id: client_id } });
    if (!client) {
      return ctx.error(404, "Client Ma'lumotlar topilmadi");
    }
    const bike = await bikeInfo.findOne({ where: { id: bike_id } });
    if (!bike) {
      return ctx.error(404, "BikeId Ma'lumotlar topilmadi");
    }
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return ctx.error(404, "UserId Ma'lumotlar topilmadi");
    }
    const rental = await Rental.create({
      bike_id,
      client_id,
      rental_start_date,
      rental_end_date,
      total_amount,
      payment_status,
      rental_status,
      remarks,
      user_id,
    });
    ctx.status = 201;
    ctx.body = rental;
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const updateRental = async (ctx) => {
  try {
    const rental = await Rental.findByPk(ctx.params.id);
    if (!rental)
      return (ctx.body = koaError(
        404,
        `${ctx.params.id}-idga tegishli ma'lumotlar topilmadi`
      ));

    const {
      bike_id,
      client_id,
      rental_start_date,
      rental_end_date,
      total_amount,
      payment_status,
      rental_status,
      remarks,
      user_id,
    } = ctx.body;

    if (
      !bike_id ||
      !client_id ||
      !rental_start_date ||
      !rental_end_date ||
      !total_amount ||
      !payment_status ||
      !user_id
    ) {
      return ctx.error(404, "Ma'lumotlarni to'liq kiriting'");
    }

    const client = await Client.findOne({ where: { id: client_id } });
    if (!category) {
      return ctx.error(404, " Client Ma'lumotlar topilmadi");
    }
    const bike = await bikeInfo.findOne({ where: { id: bike_id } });
    if (!bike) {
      return ctx.error(404, "BikeId Ma'lumotlar topilmadi");
    }
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return ctx.error(404, "Userid Ma'lumotlar topilmadi");
    }

    const newrental = await Rental.update(
      {
        bike_id,
        client_id,
        rental_start_date,
        rental_end_date,
        total_amount,
        payment_status,
        rental_status,
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
    ctx.body = JSON.stringify(newrental, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const deleteRental = async (ctx) => {
  try {
    const rental = await Rental.findByPk(ctx.params.id);
    if (!rental) return ctx.error(404, "Ma'lumotlar topilmadi");

    await Rental.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.status = 200;
    ctx.body = {
      message: `Rentaldan ${ctx.params.id}-id ma'lumotlari o'chirildi`,
    };
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

module.exports = {
  getRental,
  getRentalById,
  addRental,
  updateRental,
  deleteRental,
};
