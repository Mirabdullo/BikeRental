const Category = require("../model/BikeCategory");
const { koaError } = require("./error");

const getCategory = async (ctx) => {
  try {
    const category = await Category.findAll();
    if (category.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(category, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const getCategoryById = async (ctx) => {
  try {
    const id = ctx.params.id;
    const category = await Category.findByPk(id);
    if (!category) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(category, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const addCategory = async (ctx) => {
  try {
    const { category_name, description } = ctx.request.body;

    if (!category_name || !description) {
      return (ctx.body = { message: "Ma'lumotlarni to'liq kiriting!" });
    }

    const category = await Category.create({
      category_name,
      description,
    });
    ctx.status = 201;
    ctx.body = JSON.stringify(category, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const updateCategory = async (ctx) => {
  try {
    const category = await Category.findByPk(ctx.params.id);
    if (!category)
      return (ctx.body = koaError(
        404,
        `${ctx.params.id}-idga tegishli ma'lumotlar topilmadi`
      ));

    const { category_name, description } = ctx.body;

    if (!category_name || !description) {
      return ctx.error(404, "Ma'lumotlarni to'liq kiriting'");
    }

    const newcategory = await Category.update(
      {
        category_name,
        description,
      },
      {
        where: {
          id: ctx.params.id,
        },
      }
    );
    ctx.status = 200;
    ctx.body = JSON.stringify(newcategory, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const deleteCategory = async (ctx) => {
  try {
    const category = await Category.findByPk(ctx.params.id);
    if (!category) return ctx.error(404, "Ma'lumotlar topilmadi");

    await Category.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.status = 200;
    ctx.body = {
      message: `Categorydan ${ctx.params.id}-id ma'lumotlari o'chirildi`,
    };
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

module.exports = {
  getCategory,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
