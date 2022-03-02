const { TelegramClient, Api } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input");


const authenticate = async () =>{
  const apiId = your_api_id;
  const apiHash = "your_api_hash";
  // fill this later with the value from session.save()
  const stringSession = new StringSession("");
  
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });

  // Authenticate using bot_token or your telegram account
  await client.start({
    // phoneNumber: async () => await input.text("Please enter your number: "),
    // password: async () => await input.text("Please enter your password: "),
    // phoneCode: async () => await input.text("Please enter the code you received: "),
    // onError: (err) => console.log(err),
    botAuthToken: "your_bot_token",
  });
  console.log("You should now be connected.");
  console.log("Session token: ", client.session.save());
  return client;
}

const command = async () => {
  const client = await authenticate();

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
};

command();
