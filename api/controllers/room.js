import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import {createError} from '../utils/error.js';

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId
    const room = new Room(req.body);
    try{
        const savedRoom = await  room.save();
        try {
           await Hotel.findByIdAndUpdate(hotelId,
             {$push: {rooms: savedRoom._id}}); 
        }
        catch(error){
            next(error)
        }
        res.status(201).json(savedRoom);
    }catch(error){
        next(error)
    }   
};

export const updateRoom = async (req, res, next) => {
    try{
        const room = await Room.findByIdAndUpdate(req.params.id,
             req.body, {new: true});
        if(!room){
            throw createError(404, 'Room not found');
        }
        res.status(200).json(room);
    }
    catch(error){
        next(error)
    }
}

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try{
        try {
            await Hotel.findByIdAndDelete(hotelId,
              {$pull: {rooms: req.params.id}}); 
         }
         catch(error){
             next(error)
         }
        const room = await Room.findByIdAndDelete( req.params.id);
        if(!room){
            throw createError(404, 'Room not found');
        }
        res.status(204).json();
    }catch(error){
        next(error)
    }
}


export const getRoom = async (req, res, next) => {
    try{
        const room = await Room.findById(req.params.id);
        if(!room){
            throw createError(404, 'Room not found');
        }
        res.status(200).json(room);
    }catch(error){
        next(error)
    }
}

export const getRooms = async (req, res, next) => {
    try{
        const rooms = await Room.find();
        res.status(200).json(rooms);
    }catch(error){
        next(error)
    }
}