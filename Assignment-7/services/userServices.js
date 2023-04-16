const { hash, compare } = require('bcrypt');
const { sign } = require("jsonwebtoken");
const { writeFileSync } = require('fs');
require("dotenv").config();

const signUpService = async (userData, body) => {
    let hashedPassword;
    hashedPassword = await hash(body.password, parseInt(process.env.SALTROUNDS));
    const userDetails = {
        "userId": body.userId,
        "userName": body.userName,
        "password": hashedPassword
    }
    userData.push(userDetails);
    writeFileSync('./assets/users.json', JSON.stringify(userData));
    return {
        "status": 290,
        "data": userDetails,
        "message": "Successfully Registered."
    };
}

const loginService = async (userData, body) => {
    let status, message;
    let responseData = null;
    let index = -1;
    index = userData.findIndex(user => user.userId === body.userId);
    if(index !== -1) {
        if(body.userName == userData[index].userName && await compare(body.password, userData[index].password)) {
            const token = sign(userData[index], process.env.JWTSECRETKEY, { expiresIn: "24h" });
            status = 290;
            responseData = token;
            message = "The login was successful!";
        } else {
            status = 404;
            message = "Wrong Username or Password!";   
        }
    } else {
        status = 409;
        message = "User not found!";
    }

    return {
        "status": status,
        "data": responseData,
        "message": message
    };
}

module.exports = {
    signUpService,
    loginService
};