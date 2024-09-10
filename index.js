const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'Moha_Bot', // Replace with your bot's username
    password: 'oauth:htsq6bycwae89r08fhat86weq3xw06' // Replace with your bot's OAuth token
  },
  channels: [
    'MohaRBLX' // Replace with the channel you want to join
  ]
};

// Create a client with the provided options
const client = new tmi.Client(opts);

// Connect to Twitch
client.connect();

// List of greetings
const greetings = ['hello', 'hi', 'hey', 'greetings', 'sup', 'what\'s up'];

// Listen for messages in chat
client.on('message', (channel, tags, message, self) => {
  // Ignore messages from the bot itself
  if (self) return;

  const command = message.toLowerCase();

  // Check if the message contains a greeting
  if (greetings.some(greeting => command.includes(greeting))) {
    client.say(channel, `Hey @${tags.username}! Welcome to the stream!`);
  }

  // !roblox command
  if (command === '!roblox') {
    client.say(channel, `@${tags.username}, here's the link to my Roblox profile: https://www.roblox.com/users/7311243796/profile`);
  }

  // !socials command (only Twitter and Discord)
  if (command === '!socials') {
    client.say(channel, `@${tags.username}, follow me on Twitter: https://twitter.com/moharblx | Join my Discord: https://discord.gg/gjf2jbedhs`);
  }
});

// Listen for subscription events
client.on('subscription', (channel, username, methods, message, userstate) => {
  client.say(channel, `Thank you for subscribing, @${username}! Enjoy the emotes and perks! 🎉`);
});

// Listen for resubscription events
client.on('resub', (channel, username, months, message, userstate, methods) => {
  client.say(channel, `Thank you @${username} for resubscribing for ${months} months! You're awesome! 💖`);
});

// Listen for subgift events
client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
  client.say(channel, `Thank you @${username} for gifting a sub to @${recipient}! 🎁 You're so generous!`);
});

// Listen for community sub events (when multiple subs are gifted at once)
client.on('submysterygift', (channel, username, numbOfSubs, methods, userstate) => {
  client.say(channel, `Wow @${username}, thank you for gifting ${numbOfSubs} subs to the community! 🎉`);
});

// Timer message every 15 minutes
setInterval(() => {
  client.say('MohaRBLX', 'Don\'t forget to follow the channel and join the Discord! https://discord.gg/gjf2jbedhs');
}, 15 * 60 * 1000); // 15 minutes in milliseconds

// Vercel serverless function handler
module.exports = (req, res) => {
  res.send('Twitch bot is running.');
};
