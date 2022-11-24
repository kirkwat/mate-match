const knex = require("../database/knex");
const HOUSE_TABLE = "house";

const addRoommate = async (person1, person2) => {
  let ppl = await knex.raw(
    `select * from house where "${person1}" in (email1, email2,email3,email4,email5,email6)`
  );
  let ppl2 = await knex.raw(
    `select * from house where "${person2}" in (email1, email2,email3,email4,email5,email6)`
  );

  if (ppl[0].length > 0 && ppl2[0].length > 0) {
    return "Unable, both have a house";
  }

  if (ppl[0].length > 0) {
    ppl = ppl[0][0];
    if (!ppl.email2)
      await knex.raw(
        `update house set email2 = "${person2}" where id=${ppl.id}`
      );
    else if (!ppl.email3)
      await knex.raw(
        `update house set email3 = "${person2}"  where id=${ppl.id}`
      );
    else if (!ppl.email4)
      await knex.raw(
        `update house set email4 = "${person2}" where id=${ppl.id}`
      );
    else if (!ppl.email5)
      await knex.raw(
        `update house set email5 = "${person2}" where id=${ppl.id}`
      );
    else if (!ppl.email6)
      await knex.raw(
        `update house set email6 = "${person2}" where id=${ppl.id}`
      );

    return "Added to house";
  }

  if (ppl2[0].length > 0) {
    ppl2 = ppl2[0][0];
    console.log("eoaueoaueoa", ppl2, "eu,aoueoae");
    if (!ppl2.email2)
      await knex.raw(
        `update house set email2 = "${person1}" where id=${ppl2.id}`
      );
    else if (!ppl2.email3)
      await knex.raw(
        `update house set email3 = "${person1}" where id=${ppl2.id}`
      );
    else if (!ppl2.email4)
      await knex.raw(
        `update house set email4 = "${person1}" where id=${ppl2.id}`
      );
    else if (!ppl2.email5)
      await knex.raw(
        `update house set email5 = "${person1}" where id=${ppl2.id}`
      );
    else if (!ppl2.email6)
      await knex.raw(
        `update house set email6 = "${person1}" where id=${ppl2.id}`
      );

    return "Added to house";
  }

  await knex.raw(
    `insert into house (email1,email2) values ("${person1}","${person2}")`
  );
  return "Created house";
};

module.exports = {
  addRoommate,
};
