const invalidName = "";
const validName = "Paul";

const invalidMail1 = "test";
const invalidMail2 = "test";
const invalidMail3 = "test@";
const validMail = "test@test";

const nameRegex = new RegExp("^([a-zA-Z]){1,64}$");

if (!invalidName.match(nameRegex)) {
  console.log("invalidName don't Match...");
}
if (!validName.match(nameRegex)) {
  console.log("validName don't Match...");
}
