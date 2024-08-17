import * as fs from "./fileUtils.js";

const DATA_FILE_NAME = "data.json";

export function addTask(taskDescription) {
    let data = fs.readFileSync(DATA_FILE_NAME);
    let taskId = getTaskCount(data);
    taskId++;
    data[taskId] = getNewTask(taskDescription);
    data["taskCount"] = taskId;
    fs.writeFileSync(DATA_FILE_NAME, data);
    console.log("Task added successfully (ID: "+ taskId+ ")");
    return taskId;
}

export function updateTask(taskId, task) {
    const data = fs.readFileSync(DATA_FILE_NAME);
    if(data[taskId]===undefined) {
        console.log("No task found with the taskId: "+ taskId);
        process.exit(1);
    }
    if(task.description!==undefined) data[taskId].description = task.description;
    if(task.status!==undefined) data[taskId].status = task.status;
    fs.writeFileSync(DATA_FILE_NAME, data);
}

export function deleteTask(taskId) {
    const data = fs.readFileSync(DATA_FILE_NAME);
    if(data[taskId]===undefined) {
        console.log("No task found with the taskId: "+ taskId);
        process.exit(1);
    }
    delete data[taskId];
    fs.writeFileSync(DATA_FILE_NAME, data);
}

export function getTasks(status) {
    const data = fs.readFileSync(DATA_FILE_NAME);
    delete data.taskCount;
    Object.keys(data).forEach(taskId => {
        if(status === null || data[taskId].status===status) {
            console.log("id: " + taskId + " description: " + data[taskId].description +
                " status: " + data[taskId].status + " createdDate: " + data[taskId].createdDate);
        }
    });
}


function getTaskCount(data) {
    let taskCount = 0;
    if(data.taskCount!==undefined) {
        taskCount = data.taskCount;
    }
    return taskCount;
}

function getNewTask(description) {
    return {
        description,
        status: "todo",
        createdDate: new Date(),
        updatedDate: new Date()
    };
}