import { GiteaClient } from "../../mod.ts";

const gitea = new GiteaClient("http://localhost:3000", Deno.env.get("TOKEN")!);

const users = [
  {
    "email": "bruce@wayne.inc",
    "full_name": "Bruce Wayne",
    "login_name": "bruce",
    "must_change_password": false,
    "password": "s3cr3t45995968!!",
    "restricted": false,
    "username": "bruce",
    "visibility": "public",
  },
  {
    "email": "clark@kent.co",
    "full_name": "Clark Kent",
    "login_name": "clark",
    "must_change_password": false,
    "password": "s3cr3t82919327!!",
    "restricted": false,
    "username": "clark",
    "visibility": "public",
  },
  {
    "email": "diana@themyscira.org",
    "full_name": "Diana Prince",
    "login_name": "diana",
    "must_change_password": false,
    "password": "s3cr3t37482910!!",
    "restricted": false,
    "username": "diana",
    "visibility": "public",
  },
  {
    "email": "barry@speedforce.com",
    "full_name": "Barry Allen",
    "login_name": "barry",
    "must_change_password": false,
    "password": "s3cr3t10293847!!",
    "restricted": false,
    "username": "barry",
    "visibility": "public",
  },
  {
    "email": "arthur@atlantis.org",
    "full_name": "Arthur Curry",
    "login_name": "arthur",
    "must_change_password": false,
    "password": "s3cr3t56473829!!",
    "restricted": false,
    "username": "arthur",
    "visibility": "public",
  },
  {
    "email": "victor@cyborg.tech",
    "full_name": "Victor Stone",
    "login_name": "victor",
    "must_change_password": false,
    "password": "s3cr3t94857261!!",
    "restricted": false,
    "username": "victor",
    "visibility": "public",
  },
  {
    "email": "hal@greenlantern.com",
    "full_name": "Hal Jordan",
    "login_name": "hal",
    "must_change_password": false,
    "password": "s3cr3t58374629!!",
    "restricted": false,
    "username": "hal",
    "visibility": "public",
  },
  {
    "email": "oliver@queenindustries.com",
    "full_name": "Oliver Queen",
    "login_name": "oliver",
    "must_change_password": false,
    "password": "s3cr3t19283745!!",
    "restricted": false,
    "username": "oliver",
    "visibility": "public",
  },
  {
    "email": "kara@zorel.com",
    "full_name": "Kara Zor-El",
    "login_name": "kara",
    "must_change_password": false,
    "password": "s3cr3t65748392!!",
    "restricted": false,
    "username": "kara",
    "visibility": "public",
  },
  {
    "email": "dick@bludhaven.com",
    "full_name": "Dick Grayson",
    "login_name": "dick",
    "must_change_password": false,
    "password": "s3cr3t28374659!!",
    "restricted": false,
    "username": "dick",
    "visibility": "public",
  },
  {
    "email": "wally@speedforce.com",
    "full_name": "Wally West",
    "login_name": "wally",
    "must_change_password": false,
    "password": "s3cr3t19274638!!",
    "restricted": false,
    "username": "wally",
    "visibility": "public",
  },
  {
    "email": "john@martian.com",
    "full_name": "John Jones",
    "login_name": "john",
    "must_change_password": false,
    "password": "s3cr3t38475629!!",
    "restricted": false,
    "username": "john",
    "visibility": "public",
  },
  {
    "email": "shayera@hawkworld.com",
    "full_name": "Shayera Hol",
    "login_name": "shayera",
    "must_change_password": false,
    "password": "s3cr3t84736291!!",
    "restricted": false,
    "username": "shayera",
    "visibility": "public",
  },
  {
    "email": "barbara@oracle.com",
    "full_name": "Barbara Gordon",
    "login_name": "barbara",
    "must_change_password": false,
    "password": "s3cr3t28475639!!",
    "restricted": false,
    "username": "barbara",
    "visibility": "public",
  },
  {
    "email": "kyle@greenlantern.com",
    "full_name": "Kyle Rayner",
    "login_name": "kyle",
    "must_change_password": false,
    "password": "s3cr3t56473829!!",
    "restricted": false,
    "username": "kyle",
    "visibility": "public",
  },
  {
    "email": "donna@themyscira.org",
    "full_name": "Donna Troy",
    "login_name": "donna",
    "must_change_password": false,
    "password": "s3cr3t37482910!!",
    "restricted": false,
    "username": "donna",
    "visibility": "public",
  },
  {
    "email": "roy@arsenal.com",
    "full_name": "Roy Harper",
    "login_name": "roy",
    "must_change_password": false,
    "password": "s3cr3t94857261!!",
    "restricted": false,
    "username": "roy",
    "visibility": "public",
  },
  {
    "email": "zatanna@magic.com",
    "full_name": "Zatanna Zatara",
    "login_name": "zatanna",
    "must_change_password": false,
    "password": "s3cr3t29384756!!",
    "restricted": false,
    "username": "zatanna",
    "visibility": "public",
  },
  {
    "email": "arthur@aquaman.com",
    "full_name": "Arthur Curry",
    "login_name": "arthur",
    "must_change_password": false,
    "password": "s3cr3t18492756!!",
    "restricted": false,
    "username": "arthur",
    "visibility": "public",
  },
  {
    "email": "tim@robin.com",
    "full_name": "Tim Drake",
    "login_name": "tim",
    "must_change_password": false,
    "password": "s3cr3t38475692!!",
    "restricted": false,
    "username": "tim",
    "visibility": "public",
  },
];

users.forEach(async (user) => {
  console.log(`creating user ${user.full_name}`);
  const data = await gitea.admin.createUser(user);
  console.log(data);
});
