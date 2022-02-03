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
    "Who Wants To play Docker Quiz? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("HOW TO PLAY")} 
    I am a process on your computer.
    Please answer correctly else I will be ${chalk.bgRed("killed")}
    All the best...
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
    message:
      "Which markup language is used to write Docker configuration files?",
    choices: ["JSON", "YAML", "XML"],
  });
  return handleAnswer(answers.question_1 === "YAML");
}

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message:
      "Which of the following is not a container-based alternative to Docker?",
    choices: ["Kubernetes", "CoreOS' rkt", "Canonical's LXD"],
  });
  return handleAnswer(answers.question_2 === "Kubernetes");
}

async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "Does Docker allow us to run containers and build images?",
    choices: ["True", "False"],
  });
  return handleAnswer(answers.question_3 === "True");
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

    process.exit(1);
  }
}

function winner() {
  console.clear();
  figlet(`Congratulations , ${playerName} !`, (err, data) => {
    console.log(gradient.pastel.multiline(data) + "\n");

    console.log(chalk.green(`You just won!`));
    process.exit(0);
  });
}

console.clear();
await welcome();
await askName();
await question1();
await question2();
winner();
