import { createRequire } from 'module';
import { promises as fs } from 'fs';
const require = createRequire(import.meta.url);
const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');

const token =
  '389a35ce910852e1d98eef5589e4b5c239378b38171973fb6ee2fca59495667b';
const apiKey = '803b3f5cbb8e033ce69e114c370cad70';

app.use(cors());
app.get('/board', async (req, res) => {
  const { data } = await axios(
    `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`
  );
});

const addCard = async (listId, name) => {
  const newCard = await fetch(
    `https://api.trello.com/1/cards?key=${apiKey}&token=${token}&idList=${listId}&name=${name}&pos=bottom`,
    {
      method: 'POST',
    }
  );
  const parsedCard = await newCard.json();
  return parsedCard;
};

const addList = async (boardId, name) => {
  const newList = await fetch(
    `https://api.trello.com/1/lists?key=${apiKey}&token=${token}&name=${name}&idBoard=${boardId}&pos=bottom`,
    {
      method: 'POST',
    }
  );
  const parsedList = await newList.json();
  return parsedList;
};

const addBoard = async (name) => {
  const newBoard = await fetch(
    `https://api.trello.com/1/boards/?key=${apiKey}&token=${token}&name=${name}`,
    {
      method: 'POST',
    }
  );
  const parsedBoard = await newBoard.json();
  return parsedBoard;
};
