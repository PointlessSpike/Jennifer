module.exports = {
    config: null,
    arguments: [],
    analyse: function (input, config) {
        this.config = config;

        let respond = false;
        let currentArgument = null;

        for (let configElementIndex in config.arguments) {
            let configElement = config.arguments[configElementIndex];

            let containsAllKeywords = true;
            for (let keywordIndex in configElement.keywords) {
                let keyword = configElement.keywords[keywordIndex];

                keywordArray = keyword.split("|");

                let keywordExists = false;

                for (let keywordPartIndex in keywordArray) {
                    let keywordPart = keywordArray[keywordPartIndex];

                    if (input.toUpperCase().indexOf(keywordPart.toUpperCase()) > -1) {
                        keywordExists = true;
                    }
                }

                if (!keywordExists) containsAllKeywords = false;
            }

            let argumentExists = false;

            for (let argumentIndex in this.arguments) {
                let currentArgument = this.arguments[argumentIndex];

                if (currentArgument.id == configElement.id) argumentExists = true;
            }

            if ((argumentExists && configElement.repeatable) || !argumentExists) {
                respond = true;
            }

            if (containsAllKeywords) {
                currentArgument = configElement;
            }
        }

        return {
            respond: respond,
            argument: currentArgument
        };
    },
    construct: function (analysis) {
        let response = "";

        for (let configElementIndex in this.config.arguments) {
            let configElement = this.config.arguments[configElementIndex];

            let currentArgument = analysis.argument;

            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            }

            if (currentArgument.id == configElement.id) {
                response = configElement.responses[getRandomInt(configElement.responses.length)];
            }
        }

        return response;
    }
}