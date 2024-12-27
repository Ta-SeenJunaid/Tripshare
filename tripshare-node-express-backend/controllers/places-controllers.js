const uuid = require("uuid/v4");

const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "id1",
    title: "Gutkauf",
    description: "Good place for grocery",
    imageUrl:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    address: "Homburger Landstraße 58, 60435 Frankfurt am Main",
    location: {
      lat: 50.1442198,
      lng: 8.6948312,
    },
    creator: "u1",
  },
  {
    id: "id2",
    title: "Gutkauf1",
    description: "Good place for grocery",
    imageUrl:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    address: "Homburger Landstraße 58, 60435 Frankfurt am Main",
    location: {
      lat: 50.1442198,
      lng: 8.6948312,
    },
    creator: "u2",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    return next(
      new HttpError(
        "Sorry!!!, Could not find a place for the provided id.",
        404
      )
    );
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const userPlaces = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });
  if (userPlaces.length === 0) {
    return next(
      new HttpError(
        "Sorry!!!, Could not find a place for the provided user id.",
        404
      )
    );
  }
  res.json({ userPlaces });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
