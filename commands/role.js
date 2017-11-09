exports.run = (client, message, args) => {
    // We have spaces so let's just remove !role from the message
    let requestedRole = String(message.content).replace(`${client.config.prefix}role`, "").toLowerCase().trim();

    // Let's make sure this is an approved role, we don't want them adding themselves as an admin!
    if (client.config.roles.indexOf(requestedRole) > -1) {
        let role = client.getRoleByName(message.guild.id, requestedRole);
        if (role) {
            if (message.member.roles.has(role.id)) {
                message.member.removeRole(role);
                message.channel.sendMessage(`${message.author}, you were removed from the requested role.`)
                    .then(function(msg) {
                        msg.delete(15000);
                    })
                    .catch(console.error);
            }
            else {
                message.member.addRole(role);
                message.channel.sendMessage(`${message.author}, you were added to the requested role.`)
                    .then(function(msg) {
                        msg.delete(15000);
                    })
                    .catch(console.error);
            }
        } else {
            message.channel.sendMessage("That role couldn't be located.")
                .then(function(msg) {
                    msg.delete(15000);
                })
                .catch(console.error);
        }
    } else {
        message.channel.sendMessage("That role isn't permitted.")
            .then(function(msg) {
                msg.delete(15000);
            })
            .catch(console.error);
    }

    // Finally, let's keep things neat and remove their message.
    message.delete();
}
