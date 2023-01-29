const UserGroup = require("../model/UserGroup");
const { koaError } = require("./error");

const getUserGroup = async (ctx) => {
  try {
    const group = await UserGroup.findAll();
    if (group.length == 0) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(group, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const getUserGroupById = async (ctx) => {
  try {
    const group = await UserGroup.findByPk(ctx.params.id);
    if (!group) return ctx.error(404, "Ma'lumotlar topilmadi");
    ctx.status = 200;
    ctx.body = JSON.stringify(group, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const addUserGroup = async (ctx) => {
  try {
    const {
      group_name,
      description,
      allow_add,
      allow_edit,
      allow_delete,
      allow_print,
      allow_import,
      allow_export,
    } = ctx.request.body;

    if (!group_name || !description) {
      return (ctx.body = { message: "Ma'lumotlarni to'liq kiriting!" });
    }

    const group = await UserGroup.create({
      group_name,
      description,
      allow_add,
      allow_edit,
      allow_delete,
      allow_print,
      allow_import,
      allow_export,
    });
    ctx.status = 201;
    ctx.body = JSON.stringify(group, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const updateUserGroup = async (ctx) => {
  try {
    const group = await UserGroup.findByPk(ctx.params.id);
    if (!group)
      return ctx.error(
        404,
        `${ctx.params.id}-idga tegishli ma'lumotlar topilmadi`
      );

    const {
      group_name,
      description,
      allow_add,
      allow_edit,
      allow_delete,
      allow_print,
      allow_import,
      allow_export,
    } = ctx.body;

    if (!group_name || !description) {
      return ctx.error(404, "Ma'lumotlarni to'liq kiriting'");
    }

    const newgroup = await UserGroup.update(
      {
        group_name,
        description,
        allow_add,
        allow_edit,
        allow_delete,
        allow_print,
        allow_import,
        allow_export,
      },
      {
        where: {
          id: ctx.params.id,
        },
      }
    );
    ctx.status = 200;
    ctx.body = JSON.stringify(newgroup, null, 4);
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

const deleteUserGroup = async (ctx) => {
  try {
    const group = await UserGroup.findByPk(ctx.params.id);
    if (!group) return ctx.error(404, "Ma'lumotlar topilmadi");

    await UserGroup.destroy({
      where: {
        id: ctx.params.id,
      },
    });
    ctx.status = 200;
    ctx.body = {
      message: `UserGroupdan ${ctx.params.id}-id ma'lumotlari o'chirildi`,
    };
  } catch (error) {
    console.log(error);
    ctx.body = { message: "Serverda xatolik" };
  }
};

module.exports = {
  getUserGroup,
  getUserGroupById,
  addUserGroup,
  updateUserGroup,
  deleteUserGroup,
};
