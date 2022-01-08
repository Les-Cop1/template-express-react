module.exports = {
    deploy: {
        production: {
            key: "",
            user: "",
            host: [""],
            ssh_options: "StrictHostKeyChecking=no",
            ref: "origin/main",
            repo: "",
            path: "",
            "post-deploy": "yarn build && pm2 startOrRestart production.config.js && pm2 save",
            env: {
                PORT: "",
                NODE_ENV: "production",
                TZ:"",
                JWT_SECRET: "",

                MONGO_DATABASE: "",
                MONGO_USER: "",
                MONGO_PASSWORD: ""
            }
        },
        development: {
            key: "",
            user: "",
            host: [""],
            ssh_options: "StrictHostKeyChecking=no",
            ref: "origin/develop",
            repo: "",
            path: "",
            "post-deploy": "yarn build && pm2 startOrRestart development.config.js && pm2 save",
            env: {
                PORT: "",
                NODE_ENV: "development",
                TZ:"",
                JWT_SECRET: "",

                MONGO_DATABASE: "",
                MONGO_USER: "",
                MONGO_PASSWORD: ""
            }
        }
    }
};
