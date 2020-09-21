let express = require('express')
let path = require('path')
let app = express()
const passport = require('passport');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
require('./config/passport.js')(passport);
const cookieParser = require('cookie-parser');
const { users, profiles } = require('./models');
app.use(express.json())
authSecret = "ConnerRocks"
    //app.use(express.json());
    //configure app to serve static files from public folder

app.post('/signup', async(req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ msg: 'Please pass username and password.' });
    } else {
        users
            .findOne({

                where: {
                    username: {
                        [Sequelize.Op.like]: req.body.username

                    }
                },
            }).then((user) => {
                let { role } = req.body;
                if (role == null) {
                    role = 0;
                }
                if (!user) {
                    users
                        .create({
                            username: req.body.username,
                            password: req.body.password,
                            role,
                        })
                        .then((user) => {
                            profiles
                                .create({
                                    username: req.body.username,
                                    first: req.body.first,
                                    last: req.body.last,
                                    usersId: user.id,
                                    DOB: req.body.DOB
                                })
                                .then((profile) => {
                                    const token = jwt.sign(JSON.parse(JSON.stringify(user)), authSecret, { expiresIn: 86400 * 30 });
                                    jwt.verify(token, authSecret, (erer, data) => {
                                        console.log(erer, data);
                                    });
                                    res.status(200).send({ user, profile, jwt: token })
                                })
                                .catch((error) => {
                                    res.status(400).send(error);
                                    console.log(error)
                                });
                        })
                        .catch((error) => {
                            res.status(400).send(error);
                        });
                } else {
                    res.status(404).send({ msg: 'username is taken' });
                }
            });
    }
});

getToken = function(headers) {
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
var cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) token = req.cookies.jwt;
    return token;
};
app.listen(3001 || process.env.PORT, () => {
    console.log("Server listening on port 3001")
})