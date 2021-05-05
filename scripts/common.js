const axios = require("axios");

// Used as:
// randNum(max)
// randNum(min, max)
module.exports.randNum = (firstArg, secondArg) => {
    let result;
    if (firstArg && !secondArg) {
        result = Math.random() * firstArg;
    } else if (firstArg && secondArg) {
        result = Math.random() * (secondArg - firstArg) + firstArg;
    } else {
        throw new Error("At least one argument must be supplied.");
    }

    return result;
};

module.exports.randInt = (firstArg, secondArg) => {
    if (firstArg && !secondArg) {
        return Math.floor(module.exports.randNum(firstArg));
    }
    if (firstArg && secondArg) {
        return Math.floor(module.exports.randNum(firstArg, secondArg));
    }
    throw new Error("At least one argument must be supplied.");
};

module.exports.randAddr = async (x, y) => {
    // The y logic is there to generate coordinates that fall somewhat
    // inside the geography of dk. With a simple rectangle based generation
    // too many coordonates fell in the sea, and some addresses
    const finalX = x || module.exports.randNum(8.3, 12.7);
    let finalY;
    if (y === undefined) {
        if (finalX < 9.5) {
            finalY = module.exports.randNum(55, 57.15);
        } else if (finalX < 10.5) {
            finalY = module.exports.randNum(54.9, 57.5);
        } else {
            finalY = module.exports.randNum(54.6, 56.1);
        }
    } else {
        finalY = y;
    }

    try {
        const result = await axios.get(
            `https://dawa.aws.dk/adgangsadresser/reverse?x=${finalX}&y=${finalY}`
        );
        return {
            text: result.data.adressebetegnelse,
            street: result.data.vejstykke.navn,
            number: result.data.husnr,
            city: result.data.postnummer.navn,
            zipCode: result.data.postnummer.nr,
        };
    } catch (err) {
        console.log(err);
        return null;
    }
};
