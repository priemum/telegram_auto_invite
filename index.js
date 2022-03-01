const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm i input

const apiId = 113;
const apiHash = "hash";
const stringSession = new StringSession("");
// fill this later with the value from session.save()

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    // phoneNumber: async () => await input.text("Please enter your number: "),
    // password: async () => await input.text("Please enter your password: "),
    // phoneCode: async () => await input.text("Please enter the code you received: "),
    //   onError: (err) => console.log(err),
    botAuthToken: "your_bot_token",
  });
  console.log("You should now be connected.");
  console.log(client.session.save()); // Save this string to avoid logging in again

  //Get all recent user in another group chat
  let result = await client.invoke(
    new Api.channels.GetParticipants({
      channel: "channel_id",
      filter: new Api.ChannelParticipantsRecent({}),
      offset: 1,
      limit: 10,
      hash: 0,
    })
  );

  //Extract array of user id
  var users = result.participants.map((e) => e.userId.value);

  //Invite them to another group
  var response = await client.invoke(
    new Api.channels.InviteToChannel({
      channel: "another_channel_id",
      users: users,
    })
  );
  console.log(response);
})();
