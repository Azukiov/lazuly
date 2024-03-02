const djs = require('discord.js');
const log = require('../logger');
const db = require('../db');
const channel = require('../config/channels.json');

module.exports = {
    name: djs.Events.ClientReady,
    once: true,
    execute(client) {
        try {

            const status = [
                () => `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} membres`,
                () => `.gg/azukiov`,
                () => `twitch.tv/azukiov`,
                () => `Youtube Azukiov`
            ]
            let i = 0;
            setInterval(() => {
                client.user.setActivity(status[i](), { type: djs.ActivityType.Watching });
                i = ++i % status.length;
            }, 5e3);

            let channelMemberCount = client.channels.cache.get(channel.voice.memberCount);
            if (channelMemberCount === undefined) {
                log.error(`Channel with ID ${channel.voice.memberCount} not found`);
                return;
            } else {
                channelMemberCount.setName(`👥〃${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} membres`);
            }
            

        } catch (err) {
            log.error(err);
        }
    }
}