const mongoose = require('mongoose');

const Day = require('../models/day').model;
const Reservation = require('../models/reservation').model;

export const reservation = async (req, res) => {
  try {
    Day.find({ date: req.body.date }, (err, days) => {
      if (!err) {
        if (days.length > 0) {
          let day = days[0];
          day.tables.forEach((table) => {
            if (table._id == req.body.table) {
              // The correct table is table
              table.reservation = new Reservation({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
              });
              table.isAvailable = false;
              day.save((err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Reserved');
                  res.status(200).send('Added Reservation');
                }
              });
            }
          });
        } else {
          console.log('Day not found');
        }
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};

export const availablity = async (req, res) => {
  try {
    console.log('request attempted');

    console.log(req.body);
    const dateTime = new Date(req.body.date);

    Day.find({ date: dateTime }, (err, docs) => {
      if (!err) {
        if (docs.length > 0) {
          // Record already exists
          console.log('Record exists. Sent docs.');
          res.status(200).send(docs[0]);
        } else {
          // Searched date does not exist and we need to create it
          const allTables = require('../data/allTables');
          const day = new Day({
            date: dateTime,
            tables: allTables,
          });
          day.save((err) => {
            if (err) {
              res.status(400).send('Error saving new date');
            } else {
              // Saved date and need to return all tables (because all are now available)
              console.log('Created new datetime. Here are the default docs');
              Day.find({ date: dateTime }, (err, docs) => {
                err ? res.sendStatus(400) : res.status(200).send(docs[0]);
              });
            }
          });
        }
      } else {
        res.status(400).send('Could not search for date');
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: error.message });
  }
};
