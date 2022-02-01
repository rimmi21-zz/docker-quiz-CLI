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
  const rainbowTitle = chalkAnimation.rainbow(
    "Who Wants To play Harry Potter Trivia? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    If you get any question wrong I will be ${chalk.bgRed("killed")}
    So get all the questions right...
  `);
}

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

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message: "What was Harry Potter's father's name?",
    choices: ["Albus Potter", "James Potter", "Severus Snape"],
  });
  return handleAnswer(answers.question_1 == "James Potter");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "What was Ron Weasly's sister's name?",
    choices: ["Ginny", "Rowena", "Luna"],
  });
  return handleAnswer(answers.question_2 == "Ginny");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking Answer...");
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Awesome! You nailed it!! ${playerName} You've answered correctly 🥳`,
    });
  } else {
    spinner.error({ text: `You lost ${playerName} 😑 ` });
  }
  process.exit(1);
}
console.clear();
await welcome();
await askName();
await question1();
