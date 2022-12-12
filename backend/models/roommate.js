const knex = require("../config/knex");
const USERS_TABLE = "users";
const HOUSE_TABLE = "house";

const addRoommate = async (person1, person2) => {
  //check if user 1 is already in a house
  let user1 = await knex.raw(
    `select * from house where "${person1}" in (email1,email2,email3,email4,email5,email6,email7,email8,email9,email10)`
  );
  //check if user 2 is already in a house
  let user2 = await knex.raw(
    `select * from house where "${person2}" in (email1,email2,email3,email4,email5,email6,email7,email8,email9,email10)`
  );
  //test case 1: if both users are already in a house
  if (user1[0].length && user2[0].length) {
    return "Unable, both have a house";
  }
  //test case 2: if user1 is in a house and user2 is NOT in a house
  if (user1[0].length) {
    house = user1[0][0];
    //test case 5: if house is full of roommates
    if (house.email10) return "Unable, house is full";
    //add user2 to house
    if (!house.email2)
      await knex.raw(
        `update house set email2 = "${person2}" where id=${house.id}`
      );
    else if (!house.email3)
      await knex.raw(
        `update house set email3 = "${person2}"  where id=${house.id}`
      );
    else if (!house.email4)
      await knex.raw(
        `update house set email4 = "${person2}" where id=${house.id}`
      );
    else if (!house.email5)
      await knex.raw(
        `update house set email5 = "${person2}" where id=${house.id}`
      );
    else if (!house.email6)
      await knex.raw(
        `update house set email6 = "${person2}" where id=${house.id}`
      );
    else if (!house.email7)
      await knex.raw(
        `update house set email7 = "${person2}" where id=${house.id}`
      );
    else if (!house.email8)
      await knex.raw(
        `update house set email8 = "${person2}" where id=${house.id}`
      );
    else if (!house.email9)
      await knex.raw(
        `update house set email9 = "${person2}" where id=${house.id}`
      );
    else if (!house.email10)
      await knex.raw(
        `update house set email10 = "${person2}" where id=${house.id}`
      );

    return "Added to house";
  }
  //test case 3: if user2 is in a house and user1 is NOT in a house
  if (user2[0].length) {
    house = user2[0][0];
    //test case 5: if house is full of roommates
    if (house.email10) return "Unable, house is full";
    //add user1 to house
    if (!house.email2)
      await knex.raw(
        `update house set email2 = "${person1}" where id=${house.id}`
      );
    else if (!house.email3)
      await knex.raw(
        `update house set email3 = "${person1}" where id=${house.id}`
      );
    else if (!house.email4)
      await knex.raw(
        `update house set email4 = "${person1}" where id=${house.id}`
      );
    else if (!house.email5)
      await knex.raw(
        `update house set email5 = "${person1}" where id=${house.id}`
      );
    else if (!house.email6)
      await knex.raw(
        `update house set email6 = "${person1}" where id=${house.id}`
      );
    else if (!house.email7)
      await knex.raw(
        `update house set email7 = "${person1}" where id=${house.id}`
      );
    else if (!house.email8)
      await knex.raw(
        `update house set email8 = "${person1}" where id=${house.id}`
      );
    else if (!house.email9)
      await knex.raw(
        `update house set email9 = "${person1}" where id=${house.id}`
      );
    else if (!house.email10)
      await knex.raw(
        `update house set email10 = "${person1}" where id=${house.id}`
      );

    return "Added to house";
  }
  //test case 4: if user1 and user2 are NOT in a house
  await knex.raw(
    `insert into house (email1,email2) values ("${person1}","${person2}")`
  );
  return "Created house";
};

const getRoommates = async (email) => {
  const house = await knex.raw(
    `select * from house where "${email}" in (email1,email2,email3,email4,email5,email6,email7,email8,email9,email10)`
  );

  if (house[0].length === 0) {
    return [];
  }

  const result = await knex(USERS_TABLE)
    .where({ email: house[0][0].email1 })
    .orWhere({ email: house[0][0].email2 })
    .orWhere({ email: house[0][0].email3 })
    .orWhere({ email: house[0][0].email4 })
    .orWhere({ email: house[0][0].email5 })
    .orWhere({ email: house[0][0].email6 })
    .orWhere({ email: house[0][0].email7 })
    .orWhere({ email: house[0][0].email8 })
    .orWhere({ email: house[0][0].email9 })
    .orWhere({ email: house[0][0].email10 });
  return result;
};

module.exports = {
  addRoommate,
  getRoommates,
};
