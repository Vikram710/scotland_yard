const express = require('express');
const mongoose = require('mongoose');

const Models = require('../models/Model')

const Room = Models.Room;
const Player = Models.Player;
const Ticket = Models.Ticket;
const Game = Models.Game;
const Move = Models.Move;
const Position = Models.Position;

function asyncCodeLoop (callback) {
    room_code = String(Math.round(Math.random()*1000000));
    room_code = room_code.substring(0,3) + " " + room_code.substring(3,6);
    var query = Room.findOne({'room_code': room_code });
    console.log("calculated random : ",room_code);
    query.exec(function(err,room){
        if(err) {
            callback("-1");
        }
        if(room!=undefined) {
            asyncCodeLoop(callback);
        }
        else{
        callback(room_code);
        }
    });
}
const createRoom = (req, res) => {
    console.log("create room post api");

    asyncCodeLoop(function(room_code){
        console.log("room_code",room_code);

        if(room_code=="-1")
        return res.status(500).json({success:false,error:err});

        const player = new Player({
            name : req.body.name,
        });
        player.save()
            .then(player_save =>  {
                const room = new Room({
                    room_code: room_code,
                    active: true,
                    owner: player_save._id
                });
                room.save()
                    .then(room_save => {
                        Player.updateOne({'_id': player_save._id},{'room_id': room_save._id})
                        .then(player1 => {
                            const game = new Game({
                                room_id: room_save._id
                            });
                            game.save()
                                .then(game_save => res.status(200).json({success:true,room_id: room_save._id,creator_id: player_save._id,room_code:room_code}))
                                .catch(err =>{
                                    return res.status(500).json({success:false,error:err});
                                });
                        })
                        .catch(err =>{
                            return res.status(500).json({success:false,error:err});
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({success:false,error:err});
                    });
            })
            .catch(err => {
                console.log("Error: ",err);
                return res.status(500).json({success:false,error:err});
            });
    });
   
    
};
const joinRoom = (req, res) => {
    console.log("join room post api");
    Room.findOne({'room_code': req.params.code})
        .then(room => {
            if(room==undefined)
            return res.status(200).json({success:false,error: "Room code not found"});
            
            const player = new Player({
                name : req.body.name,
                room_id: room.room_id
            });

            player.save()
                .then(player => {
                    return res.status(200).json({success: true,room_id: room.room_id,player_id: player._id});
                })
                .catch(err => {
                    console.log("Error: ",err);
                    return res.status(500).json({success:false,error:err});
                });
        })
        .catch(err =>{
            return res.status(500).json({success:false,error: err});
        });
};

module.exports = {
    createRoom,
    joinRoom
};
