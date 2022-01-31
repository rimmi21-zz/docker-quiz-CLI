#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import gradient from "gradient-string";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Are you a winner?");
  await sleep();
  rainbowTitle.stop();

  console.log(`${chalk.bgBlueBright("Are you ready to?")}`);
}
await welcome();

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answers.player_name;
}
await askName();

async function question1() {
  const answers = await inquirer.prompt({
    name: "question 1",
    type: "input",
    message: "What was Harry Potter's mother's name?",
    choices: ["Albus Potter", "James Potter", "Severus Snape"],
  });
  return handleAnswer(answers.question1);
}
