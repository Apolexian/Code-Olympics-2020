// this should be typescript lel
// import express from 'express'
// import twilio from 'twilio'

const express = require('express')
const twilio = require('twilio')
const http = require('http')
const fetch = require('node-fetch')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const VoiceResponse = twilio.twiml.VoiceResponse

var accountSid = process.env.accountSid; // Your Account SID from www.twilio.com/console
var authToken = process.env.authToken;   // Your Auth Token from www.twilio.com/console

var client = twilio(accountSid, authToken);
http
    .createServer(async (req, res) => {
        // Create TwiML response
        const twiml = new VoiceResponse();

        let result = await fetch('http://demo.twilio.com/docs/voice.xml');

        res.writeHead(200, { 'Content-Type': 'text/xml' });
        // res.end(twiml.toString());
        res.end(await result.text())
    })
    .listen(1337, '127.0.0.1');

console.log('TwiML server running at http://127.0.0.1:1337/');