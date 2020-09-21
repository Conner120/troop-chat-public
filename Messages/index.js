let express = require('express')
let path = require('path')
let app = express()
const passport = require('passport');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
var azure = require('azure-storage');
var blobService = azure.createBlobService();


require('./config/passport.js')(passport);
const redis = require('redis');
const pub = redis.createClient(32771, 'docker-desktop');

const cookieParser = require('cookie-parser');
const { users, profiles, conversations, messages } = require('./models');
app.use(express.json());
authSecret = "ConnerRocks"
//app.use(express.json());
//configure app to serve static files from public folder
app.post('/api/getConversation', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.user.dataValues;
    const t = await conversations.findOne({
        where: {
            id: req.body.id
        },
        include: [{
            model: messages,
        }, { model: profiles, attributes: ['id', 'first', 'last'] }]
    })
    t.profiles = t.profiles.map(x => {
        var startDate = new Date();
        var expiryDate = new Date(startDate);
        expiryDate.setMinutes(startDate.getMinutes() + 100);
        startDate.setMinutes(startDate.getMinutes() - 100);
        var sharedAccessPolicy = {
            AccessPolicy: {
                Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
                Start: startDate,
                Expiry: expiryDate
            }
        };

        var token = blobService.generateSharedAccessSignature("profilepics", `${x.id}.png`, sharedAccessPolicy);
        x.dataValues.picURI = blobService.getUrl("profilepics", `${x.id}.png`, token);
        console.log(x.dataValues)
        return x.dataValues;
    })
    res.status(200).send(t);
});
app.post('/api/getMessages', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.user.dataValues;
    conversations.findOne({
        where: {
            id: req.body.id
        },
        include: [{ model: profiles, attributes: ['id', 'first', 'last'] }, {
            model: messages,


            order: [
                [conversations, 'updatedAt', 'DESC']
            ]
        }]
    }).then((conv) => {
        res.status(200).send(conv);
    });
});
app.post('/api/getAllConversations', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.user.dataValues;
    profiles.findOne({
        where: {
            usersId: user.id
        },
        include: { model: conversations, include: { model: profiles, attributes: ['id', 'first', 'last'] } }
    }).then((conv) => {
        let profiles = [];
        conv.conversations.forEach(co => {
            co.dataValues.createdAt = undefined;
            co.dataValues.settings = undefined;
            co.dataValues.profiles_conversations = undefined;
            co.profiles.forEach(pr => {
                pr.dataValues.profiles_conversations = undefined;
                profiles.push(pr.dataValues);
                pr.dataValues.first = undefined;
                pr.dataValues.last = undefined;
            });
        })
        conv.dataValues.contacts = uniqBy(profiles, JSON.stringify)
        res.status(200).send(conv);
    });
});
function uniqBy(a, key) {
    var seen = {};
    return a.filter(function (item) {
        var k = key(item);
        console.log(k);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
}
app.post('/api/createConversation', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.user.dataValues;
    const particapants = await profiles.findAll({
        where: {
            id: {
                [Sequelize.Op.in]: req.body.participants
            },
        },
        order: [
            ['DOB', 'ASC']
        ],
    })
    let conv = await conversations.create({
        title: req.body.title,
        orgId: req.body.orgId,
        settings: "{}"
    })
    let AdultCount = 0;
    var addusers = new Promise((resolve, reject) => {
        particapants.forEach(async (x, i, a) => {
            if (isYouth((Date.now() - x.DOB) / (365.25 * 24 * 60 * 60 * 1000))) {
                console.log("youth")
                let yp = false
                await x.getParents().then(async (Parents) => {
                    await Parents.forEach((p) => {
                        if (p.settings) {
                            const settings = JSON.parse(p.settings);
                            if (settings.ChildSettings.includeInAllChildComunications) {
                                console.log("Including Parent")
                                p.addConversation(conv)
                                yp = true
                            }
                        }
                    })
                    if ((AdultCount >= 2) | yp) {
                        x.addConversation(conv);
                    } else {
                        res.status(300).send(JSON.stringify({
                            youthProtection: false,
                        }));
                    }
                })
            } else {
                const Parents = await x.getParents();
                AdultCount += 1;
            }
            console.log(i)
            console.log(a.length)
            if (i >= a.length - 1) {
                resolve();
            }
        })
    })
    addusers.then(() => {
        res.status(200).send(conv)
    })


});
app.post('/api/newMessage', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let t = Date.now()
    const user = req.user.dataValues;
    console.log(req.body)
    conversations.findOne({
        where: {
            id: req.body.id
        },
        include: [{ model: profiles }],
    }).then((conv) => {
        const user = req.user.dataValues;
        const t = profiles.findOne({
            where: {
                usersId: user.id
            }
        }).then((Profile) => {
            if (conv.dataValues.profiles.find(x => (x.dataValues.id === Profile.id)) === null) {
                res.status(500).send("not a member of this conversation don't be tricky")
                return
            }
            messages.create({
                hasmedia: false,
                content: req.body.content,
            }).then((mesg) => {
                profiles.findOne({
                    where: {
                        usersId: user.id
                    },
                }).then((profile) => {
                    mesg.setProfile(profile).then((te) => {
                        conv.addMessages(mesg).then((tr) => {
                            mesg.update()
                            res.status(200).send(mesg)
                        })

                    })
                });
            });
        });
    })
});

getToken = function (headers) {
    console.log(headers);
    if (headers && headers.authorization) {
        // console.log(headers)
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
        return null;
    }
    return null;
};
var cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) token = req.cookies.jwt;
    return token;
};
app.listen(3000 || process.env.PORT, () => {
    console.log("Server listening on port 3000")
})