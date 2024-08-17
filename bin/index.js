#! /usr/bin/env node
import * as taskManager from "./taskManager.js";
const args = process.argv.slice(2);

switch(args[0]) {
    case "add":
        if(args.length < 2) {
            console.log("Empty description not accepted.");
            process.exit(1);
        }
        taskManager.addTask(args[1]);
        break;
    case "update":
        if(args.length < 3) {
            console.log("Provide both id and description to be updated.");
            process.exit(1);
        }
        taskManager.updateTask(args[1], {description: args[2]});
        break;
    case "delete":
        if(args.length < 2) {
            console.log("Required variable id not provided.");
            process.exit(1);
        }
        taskManager.deleteTask(args[1]);
        break;
    case "mark-in-progress":
        if(args.length < 2) {
            console.log("Required variable id not provided.");
            process.exit(1);
        }
        taskManager.updateTask(args[1], {status: "in-progress"});
        break;
    case "mark-done":
        if(args.length < 2) {
            console.log("Required variable id not provided.");
            process.exit(1);
        }
        taskManager.updateTask(args[1], {status: "done"});
        break;
    case "list":
        if(args.length === 1) {
            taskManager.getTasks(null);
        } else if(!["todo", "in-progress", "done"].includes(args[1])){
            console.log("Invalid status provided. Valid status: todo, in-progress and done.");
            process.exit(1);
        } else {
            taskManager.getTasks(args[1]);
        }
        break;
    case "help":
        displayHelp();
        break;
    default:
        console.log("Incorrect usage of the cli.");
        displayHelp();
}

function displayHelp() {
    console.log(`
    Usage: task-cli [options]

    Options:
      help                  Show help information
      add [desc]            Adds task with provided description
      update [id] [desc]    Updates the description of the task with corresponding id
      delete [id]           Deletes the task with the provided task id
  `);
}