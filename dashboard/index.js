let express = require('express')
let path = require('path')
let app = express()
const passport = require('passport');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
require('./config/passport.js')(passport);
const redis = require('redis');
const pub = redis.createClient(32771, 'docker-desktop');
var azure = require('azure-storage');
var blobService = azure.createBlobService();
const cookieParser = require('cookie-parser');
const { users, profiles, orgs, conversations, messages } = require('./models');
app.use(express.json());
authSecret = "ConnerRocks"
//app.use(express.json());
//configure app to serve static files from public folder
app.post('/api/getProfile', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.user.dataValues;
    profiles.findOne({
        where: {
            usersId: user.id
        },
        include: { model: orgs, as: 'organizations' }
    }).then((prof) => {
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

        var token = blobService.generateSharedAccessSignature("profilepics", `${prof.id}.png`, sharedAccessPolicy);
        prof.dataValues.picURI = blobService.getUrl("profilepics", `${prof.id}.png`, token);
        res.status(200).send(prof);
    })

});
app.post('/api/getOrg', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.user.dataValues;
    profiles.findOne({
        where: {
            usersId: user.id
        },
        include: { model: orgs, as: 'organizations' }
    }).then((prof) => {
        let org = prof.organizations.find(x => x.id == req.body.orgID);
        if (org) {
            org.getMembers({ include: { model: profiles, as: 'profiles', attributes: { exclude: ['settings', 'email', 'phone', 'DOB', 'createdAt', 'updatedAt', 'users_id'] } } }).then((members) => {
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
                members.forEach(element => {
                    element.dataValues.profiles.dataValues.profilepicuri = blobService.getUrl("profilepics", `${element.profiles.id}.png`);
                });
                console.log(members)
                org.dataValues.members = members;
                var token = blobService.generateSharedAccessSignature("covers", `${org.id}.png`, sharedAccessPolicy);
                org.dataValues.picURI = blobService.getUrl("covers", `${org.id}.png`, token);
                res.status(200).send(org);

            })

        } else {
            res.status(404).send('invalid org id');
        }
    })

});
app.post('/api/getProfilePicURI', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const user = req.user.dataValues;
    profiles.findOne({
        where: {
            usersId: user.id
        },
        include: { model: orgs, as: 'organizations' }
    }).then((prof) => {
        var startDate = new Date();
        var expiryDate = new Date(startDate);
        expiryDate.setMinutes(startDate.getMinutes() + 100);
        startDate.setMinutes(startDate.getMinutes() - 100);
        var sharedAccessPolicy = {
            AccessPolicy: {
                Permissions: azure.BlobUtilities.SharedAccessPermissions.WRITE,
                Start: startDate,
                Expiry: expiryDate
            }
        };

        var token = blobService.generateSharedAccessSignature("profilepics", `${prof.id}.png`, sharedAccessPolicy);
        res.status(200).send(blobService.getUrl("profilepics", `${prof.id}.png`, token));
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