const {networkInterfaces} = require("os")

const getWhitelist = () => {
    let whitelist = ["http://localhost:3000"]

    const nets = networkInterfaces();

    whitelist = Object.keys(nets).reduce((tab, name) => {
        for (const net of nets[name]) {
            if (net.family === "IPv4") {
                tab.push(`http://${net.address}:3000`)
            }
        }
        return tab
    }, whitelist)

    return whitelist
}

module.exports = getWhitelist
