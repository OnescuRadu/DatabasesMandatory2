const {
    userController,
    categoryController,
    sellerController,
    propertyController
} = require("../controllers");
const faker = require("faker");
const { randAddr } = require("./common");
const manufacturerController = require("../controllers/manufacturerController");

const NUM_USERS = 10;
const categories = [
    {
        name: "Applicances",
        children: [
            {
                name: "Laundry",
                children: [
                    { name: "Washing machines" },
                    { name: "Washer dryers" },
                    { name: "Tumble dryers" },
                ],
            },
            {
                name: "Refrigeration",
                children: [
                    { name: "Fridge Freezers" },
                    { name: "Fridges" },
                    { name: "Freezers" },
                    { name: "Wine cooling" },
                ],
            },
            {
                name: "Floorcare",
                children: [
                    { name: "Vacuum Cleaners" },
                    { name: "Steam Cleaners" },
                    { name: "Carpet Cleaners" },
                    { name: "Surface cleaners" },
                    { name: "Vacuum Accessories" },
                ],
            },
            {
                name: "Cooking",
                children: [
                    { name: "Cookers" },
                    { name: "Ovens" },
                    { name: "Microwaves" },
                    { name: "Hobs" },
                    { name: "Hoods" },
                ],
            },
            {
                name: "Microwaves",
            },
            {
                name: "Dishwashers",
            },
            {
                name: "Coffee Machines",
            },
            {
                name: "Small Kitchen Appliances",
                children: [
                    { name: "Kettles" },
                    { name: "Toasters" },
                    { name: "Food mixers" },
                    { name: "Food processors" },
                    { name: "Juicers & Blenders" },
                    { name: "Other small appliances" },
                ],
            },
            {
                name: "Health & Beauty",
                children: [
                    { name: "Electric toothbrushes" },
                    { name: "Beauty and skin care" },
                    { name: "Men's grooming" },
                    { name: "Ladies' hair removal" },
                    { name: "Hair dryers" },
                    { name: "Hair stylers" },
                    { name: "Wellbeing" },
                ],
            },
            {
                name: "Fans, Heating, & Air Treatment",
                children: [
                    { name: "Air conditioning" },
                    { name: "Air purifiers" },
                    { name: "Dehumidifiers" },
                    { name: "Fans" },
                    { name: "Heaters" },
                ],
            },
            {
                name: "Ironing",
                children: [
                    { name: "Irons" },
                    { name: "Steam generator irons" },
                ],
            },
            {
                name: "Sewing Machines",
            },
        ],
    },
    {
        name: "TV & Audio",
        children: [
            { name: "Televisions" },
            {
                name: "TV accessories",
                children: [
                    { name: "TV wall brackets" },
                    { name: "TV stands" },
                    { name: "Remote controls" },
                    { name: "TV aerials" },
                    { name: "AV senders" },
                    { name: "Cleaning products" },
                    { name: "Cables and accessories" },
                ],
            },
            {
                name: "Digital and Smart TV",
                children: [{ name: "Set top boxes" }, { name: "Smart TV" }],
            },
            {
                name: "DVD, Blu-ray and home cinema",
                children: [
                    { name: "Home cinema systems" },
                    { name: "All soundbars" },
                    { name: "Soundstages" },
                    { name: "Blu-ray and DVD players" },
                    { name: "4K Ultra HD Blu-ray" },
                ],
            },
            { name: "Projectors" },
            {
                name: "Speakers & Hi-Fi systems",
                children: [{ name: "Speakers" }, { name: "Hi-Fi systems" }],
            },
            { name: "Audio accessories" },
            { name: "Headphones" },
            {
                name: "iPod, MP3, & CD Players",
                children: [
                    { name: "iPod Touch" },
                    { name: "MP3 & Multimedia Players" },
                    { name: "Personal CD Players" },
                ],
            },
            {
                name: "Radios",
                children: [{ name: "Radios" }, { name: "Boomboxes" }],
            },
            { name: "Turntables" },
            { name: "Dictaphones" },
        ],
    },
    {
        name: "Computing",
        children: [
            {
                name: "Laptops",
                children: [
                    { name: "Windows laptops" },
                    { name: "MacBook" },
                    { name: "Chromebooks" },
                    { name: "2in1 laptops" },
                    { name: "Gaming laptops" },
                ],
            },
            {
                name: "Tablets & eReaders",
                children: [
                    { name: "Apple tablets" },
                    { name: "Android tablets" },
                    { name: "Microsoft Surface" },
                    { name: "eReaders" },
                ],
            },
            {
                name: "Desktop PCs",
                children: [{ name: "Workstations" }, { name: "Gaming PCs" }],
            },
            { name: "PC Monitors" },
            { name: "Projectors" },
            {
                name: "Printers, scanners, and ink",
                children: [
                    { name: "Inkjet printers" },
                    { name: "Laser printers" },
                    { name: "Scanners" },
                    { name: "Printer cartridges" },
                    { name: "Paper" },
                ],
            },
            {
                name: "Computer accessories",
                children: [
                    { name: "Graphics tablets" },
                    { name: "Headsets and microphones" },
                    { name: "Keyboard" },
                    { name: "Mice" },
                    { name: "Mouse & Keyboard sets" },
                    { name: "Microsoft Surface accessories" },
                    { name: "PC speakers" },
                    { name: "Power and cables" },
                    { name: "Tablet accessories" },
                    { name: "Webcams" },
                ],
            },
            {
                name: "Networking",
                children: [
                    { name: "Wi-Fi systems" },
                    { name: "Network switches" },
                    { name: "Powerline" },
                    { name: "Routers" },
                    { name: "Wi-Fi range extenders" },
                    { name: "Wi-Fi adapters" },
                ],
            },
            {
                name: "Data storage",
                children: [
                    { name: "Cloud storage" },
                    { name: "External hard drives" },
                    { name: "Internal hard drives" },
                    { name: "Solid state hard drives" },
                    { name: "USB flash drives" },
                ],
            },
            {
                name: "Components & upgrades",
                children: [
                    { name: "CD, DVD, & Blu-ray drives" },
                    { name: "Computer memory" },
                    { name: "Graphics cards" },
                    { name: "Hard drive enclosures" },
                    { name: "Motherboards" },
                    { name: "PC fans and coolers" },
                    { name: "Power supplies" },
                    { name: "Processors" },
                    { name: "Computer cases" },
                ],
            },
            {
                name: "Software",
                children: [
                    { name: "Business & finance software" },
                    { name: "Creation & editing software" },
                    { name: "Eductional & reference software" },
                    { name: "Internet security & antivirus software" },
                    { name: "Microsoft office" },
                    { name: "Operating systems" },
                    { name: "PC optimisation software" },
                ],
            },
            {
                name: "Office supplies",
                children: [
                    { name: "Dictaphones" },
                    { name: "Labelling Machines" },
                    { name: "Laminators" },
                    { name: "Photo paper" },
                    { name: "Shredders" },
                ],
            },
            { name: "Laptop bags & cases" },
        ],
    },
    {
        name: "Gaming",
        children: [
            {
                name: "Console gaming",
                children: [
                    { name: "Playstation consoles, accessories, & games" },
                    { name: "Xbox consoles, accessories, & games" },
                    { name: "Nintendo consoles, accessories, & games" },
                    { name: "Digital downloads" },
                    { name: "Streaming equipment" },
                ],
            },
            {
                name: "PC gaming",
                children: [
                    { name: "Controllers & Joysticks" },
                    { name: "Headsets" },
                    { name: "Keyboards" },
                    { name: "Mice" },
                    { name: "Gaming furniture" },
                    { name: "Sound cards" },
                    { name: "PC games" },
                ],
            },
            { name: "Virtual reality" },
            { name: "Live gaming stores" },
            { name: "Broadband for gaming" },
        ],
    },
    {
        name: "Cameras",
        children: [
            {
                name: "Interchangable lens camers",
                children: [
                    { name: "DSLR camers" },
                    { name: "Lenses" },
                    { name: "Mirrorless camers" },
                ],
            },
            {
                name: "Compact & bridge cameras",
                children: [
                    { name: "Compact digital cameras" },
                    { name: "Bridge cameras" },
                    { name: "Instant cameras" },
                    { name: "Superzoom cameras" },
                    { name: "Tough cameras" },
                ],
            },
            {
                name: "Photography accessories",
                children: [
                    { name: "Bags & cases" },
                    { name: "Memory cards" },
                    { name: "Batteries & chargers" },
                    { name: "Flashguns & lightning" },
                    { name: "Selfie sticks" },
                    { name: "Tripods and supports" },
                    { name: "Camcorder accessories" },
                ],
            },
            {
                name: "Camcorders & drones",
                children: [
                    { name: "Traditional camcorders" },
                    { name: "360 camcorders" },
                    { name: "Action camcorders" },
                    { name: "Dash cams" },
                    { name: "Drones" },
                ],
            },
        ],
    },
    {
        name: "Phones",
        children: [
            {
                name: "Mobile phones",
                children: [
                    { name: "iPhones" },
                    { name: "Samsung phones" },
                    { name: "Google pixel" },
                    { name: "Huawei" },
                    { name: "Oppo" },
                    { name: "5G Mobile phones" },
                    { name: "Foldable & Flip phones" },
                ],
            },
            {
                name: "Mobile phone accessories",
                children: [
                    { name: "Cases" },
                    { name: "Chargers" },
                    { name: "Power banks" },
                    { name: "Sim cards" },
                ],
            },
            {
                name: "Home phones",
                children: [
                    { name: "Corded phones" },
                    { name: "Cordless phones" },
                ],
            },
            { name: "Sat nav", children: [{ name: "Sat nav accessories" }] },
        ],
    },
    {
        name: "Smart Tech",
        children: [
            {
                name: "Smart home systems",
                children: [
                    { name: "Home voice control" },
                    { name: "Security cameras & CCTV" },
                    { name: "Monitoring" },
                    { name: "Lighting" },
                    { name: "Heating" },
                ],
            },
            {
                name: "Smart watches & fitness",
                children: [
                    { name: "Smart watches" },
                    { name: "Fitness trackers" },
                    { name: "Smart fitness accessories" },
                    { name: "Smart health" },
                ],
            },
            { name: "Smart toys & gadgets" },
            {
                name: "Smart sound",
                children: [
                    { name: "Multi-room sound bars" },
                    { name: "Multi-room speakers" },
                    { name: "Voice control speakers" },
                ],
            },
        ],
    },
    {
        name: "Home & Outdoor",
        children: [
            { name: "Musical instruments" },
            {
                name: "Hobbies & toys",
                children: [
                    { name: "Arts & crafts" },
                    { name: "Binoculars" },
                    { name: "Telescopes" },
                    { name: "Microscopes" },
                ],
            },
            {
                name: "Garden & outdoors",
                children: [
                    { name: "Power tools" },
                    { name: "Barbeques" },
                    { name: "Camping" },
                ],
            },
            {
                name: "Home accessories",
                children: [
                    { name: "Lighting" },
                    { name: "Home cables & adaptors" },
                    { name: "Travel accessories" },
                    { name: "Batteries" },
                ],
            },
            {
                name: "Cooking and baking",
                children: [
                    { name: "Cooking" },
                    { name: "Baking" },
                    { name: "Food & kitchen prep" },
                    { name: "Food & drink storage" },
                ],
            },
            { name: "Office furniture" },
        ],
    },
];
const manufacturers = [
    "Waring",
    "Stencilled",
    "Investable",
    "Bedevilled",
    "Detoured",
    "Visionary",
    "Manufactory",
    "Shipyard",
    "Inforce",
    "Duplicator",
    "Controveries",
    "Streamlining",
    "Textile",
    "Worldsystem",
    "Firstdown",
    "Nonimmigrant",
    "Pushvend.com",
    "Supplyphase.com",
    "Interbatch.com",
    "Industrialcentre.com",
    "Texting",
    "Incude",
    "Managerial",
    "Redial",
    "Earrings",
    "Quantized",
    "Electrocute",
    "Interloping",
    "Exoticism",
    "Netcraft",
    "Manufactures",
    "Herculean",
    "Welding",
    "Fetishising",
    "Forging",
    "Telegraphy",
    "Export.ly",
    "Stockling.com",
    "Supplymeter.com",
    "Factorymerch.com",
    "Massmarket",
    "Exporting",
    "Postprocess",
    "Fueling",
    "Onedesign",
    "Fabrics",
    "Leovigild",
    "Airbased",
    "Footwear",
    "Observables",
    "Conglomerate",
    "Decrementing",
    "Tooling",
    "Allant",
    "Newport",
    "Shrinkage",
    "Factorytycoon.com",
    "Combustery.com",
    "Fuelingbusiness.com",
    "Primarycircuit.com",
    "Metroid",
    "Hitech",
    "Unbiassed",
    "Marketeer",
    "Exporter",
    "Dismantling",
    "Valueadded",
    "Noncompact",
    "Assemblies",
    "Rumsfield",
    "Videogaming",
    "Flamenco",
    "Refering",
    "Horticulture",
    "Sundial",
    "Glassblower",
    "Industryhustle.com",
    "Supplying.io",
    "Tradine.com",
    "Supplytactics.com",
    "Catering",
    "Catering",
    "Typecasting",
    "Hitech",
    "Drumstick",
    "Gangling",
    "Retailing",
    "Plastics",
    "Stagnancy",
    "Demandled",
    "Forging",
    "Mapmaking",
    "Bioplastic",
    "Cosmetics",
    "Drugtesting",
    "Servicing",
];
const properties = [
    { name: "Weight", type: "Number" },
    { name: "Length", type: "Number" },
    { name: "Width", type: "Number" },
    { name: "Height", type: "Number" },
    { name: "Length", type: "Number" },
    { name: "Processor", type: "String" },
    { name: "Processor Count", type: "Number" },
    { name: "Storage Capacity", type: "Number" },
    { name: "Storage Type", type: "String" },
    { name: "Memory", type: "Number" },
    { name: "Memory Type", type: "String" },
    { name: "Color", type: "String" },
    { name: "Graphics Card", type: "String" },
    { name: "Touchscreen", type: "Boolean" },
    { name: "Length", type: "Number" },
    { name: "Screen Resolution", type: "String" },
    { name: "Screen Size", type: "Number" },
    { name: "Length", type: "Number" },
    { name: "Wireless Connectivity", type: "String" },
    { name: "No. of USB2 Ports", type: "Number" },
    { name: "No. of USB3 Ports", type: "Number" },
    { name: "Battery Life (Hours)", type: "Number" },
    { name: "Focal Length", type: "Number" },
    { name: "Minimum Focal Length", type: "Number" },
    { name: "Maximum Focal Length", type: "Number" },
    { name: "Minimum Aperture Size", type: "Number" },
    { name: "Maximum Aperture Size", type: "Number" },
    { name: "Lens Type", type: "Number" },
]

function createUsers() {
    const promises = [];

    for (let i = 0; i < NUM_USERS; i += 1) {
        promises.push(
            userController.createUser(
                {
                    email: faker.internet.email(),
                    password: "1234",
                    role: "Manager",
                },
                true
            )
        );
    }

    return Promise.all(promises).then((users) => users.map((u) => u.id));
}

async function createCategory(category, parentId) {
    const newCat = await categoryController.createCategory({
        name: category.name,
        parentId: parentId ? parentId : null,
    });
    if (category.children && category.children.length > 0) {
        newCat.children = [];
        category.children.forEach(async (childCat) => {
            const child = await createCategory(childCat, newCat.id)
            newCat.children.push(child);
        });
    }
    return newCat;
}

async function createSeller(ownerId) {
    return sellerController.createSeller({
        name: faker.company.companyName(),
        legalName: `${faker.company.companyName()} ${faker.company.companySuffix()}`,
        cvr: String(
            faker.datatype.number(9999999) + 10000000 * faker.datatype.number(9)
        ),
        phoneNumber: faker.phone.phoneNumber(),
        ownerId,
        address: await randAddr(),
    });
}

if (require.main === module) {
    createUsers().then((userIds) => {
        for (let i = 0; i < userIds.length; i += 1) {
            randAddr().then((address) => {
                userController
                    .updateUserProfile(userIds[i], {
                        firstName: faker.name.firstName(),
                        lastName: faker.name.lastName(),
                        dateOfBirth: faker.date.past(60),
                        address,
                    })
                    .then((user) =>
                        console.log("Successfully created user:", user)
                    );
            });
        }

        const promises = [];
        userIds.forEach((userId) => {
            promises.push(createSeller(userId));
            if (Math.random() < 0.2) {
                promises.push(createSeller(userId));
            }
        });
        Promise.all(promises).then((sellers) =>
            console.log("Successfully created sellers:", sellers)
        );
    });

    const promises = [];
    categories.forEach((cat) => promises.push(createCategory(cat)));
    Promise.all(promises).then((cats) =>
        console.log("Successfully created categories:", cats)
    );

    const manuPromises = [];
    manufacturers.forEach((manufacturer) =>
        manuPromises.push(manufacturerController.createManufacturer({
            name: manufacturer
        }))
    );
    Promise.all(manuPromises).then((manu) =>
        console.log("Successfully created manufacturers:", manu)
    );

    const propPromises = [];
    properties.forEach((property) =>
        propPromises.push(propertyController.createProperty(property))
    );
    Promise.all(propPromises).then(props =>
        console.log("Successfully created properties:", props)
    );
}
