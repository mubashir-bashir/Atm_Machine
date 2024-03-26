#!/usr/bin/env node

import inquirer  from "inquirer";
import chalk from "chalk";
import chalkAnimation, { rainbow } from "chalk-animation"

async function main(){
    let balance = 100000
    let answers = await inquirer.prompt([
    {
        type: "number",
        name: "userPin",
        message: "Please Enter your PIN "
    },
    {
        type: "list",
        name: 'transactPreferences',
        message: "How would you like to proceed?",
        choices: ["Check Balance", "Make a Transaction"],
    },
    {
        type: "list",
        name: "transactType",
        message: "Select withdrawal method:",
        choices: ["Fast Cash","Withdrawals"],
        when(answers){
            return answers.transactPreferences === "Make a Transaction"
        }
    },
    {
        type: "list",
        name: "amount",
        message: "Choose an amount for Fast Cash withdrawal:",
        choices: ["1000", "5000", "1000","20000"],
        when(answers){
            return answers.transactType=== "Fast Cash"
        }
    },
    {
        type: "number",
        name: "amount",
        message: "Enter the amount to withdraw:",
        when(answers){
            return answers.transactType=== "Withdrawals"
        }
    },
    ])

    if(answers.transactPreferences === "Check Balance"){
        console.log("Your current account balance is: ", chalk.bgGreen(balance))
    }
    else if(answers.amount>balance){
        console.log(chalk.red(`
        Sorry, you do not have sufficient funds to complete this transaction.
        `
        ))
    }
    else{
        function sleep(){
            return new Promise ((resolve,reject)=>{
                setTimeout(resolve,2000);
            })
        }
        const currentDateTime = new Date();
        const currentDate = currentDateTime.toLocaleDateString();
        const currentTime = currentDateTime.toLocaleTimeString();
        
        
        let remBalance = balance - answers.amount
        let ani = chalkAnimation.rainbow(`
        Withdrawal successful. Please take your cash.
        Your remaining balance is ${remBalance}. 
        Transaction date: ${currentDate} ${currentTime}
        `
            )
            await sleep()
            ani.stop()           
    }
}


async function anotherTrans() {
    let newtrans =true
    while(newtrans){
        await main()
        let again = await inquirer.prompt({
            type: "confirm",
            name: "confirm",
            message: "Would you like to perform another transaction?"
        })

        newtrans = again.confirm
    }

    console.log(chalk.yellow(`
    Thank you for using our ATM. Have a great day!
    `))
    
}

anotherTrans()