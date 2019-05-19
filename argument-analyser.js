let config = null;
let arguments = [];
let analyse = function (input, config) {
    this.config = config;

    let respond = false;

    for (let configElementIndex in config.arguments) {
        let configElement = config[configElementIndex];

        let containsAllKeywords = true;
        for (let keyword in configElement.keywords) {
            if (!input.contains(keyword)) {
                containsAllKeywords = false;
            }
        }

        let argumentExists = false;

        for (let argumentIndex in this.arguments) {
            let currentArgument = this.arguments[argumentIndex];

            if (currentArgument.id == configElement.id) argumentExists = true;
        }

        if (argumentExists && configElement.repeatable) {
            response = true;
        }

        this.arguments.push(configElement);
    }

    return {
        respond: respond
    };
};
let construct = function (analysis) {
    let response = "";

    for (let configElementIndex in this.config.arguments) {
        let configElement = config[configElementIndex];

        for (let argumentIndex in this.arguments) {
            let currentArgument = this.arguments[argumentIndex];

            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }

            if (currentArgument.id == configElement.id) response = configElement.responses[Math.random(configElement.responses)];
        }
    }
};