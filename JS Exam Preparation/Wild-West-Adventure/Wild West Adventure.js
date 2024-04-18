function solve(input) {
    let playersNum = input.shift()
    let players = {}

    for (let i=0; i < Number(playersNum); i++) {
        let player = input.shift()
        let [name, health, bullets] = player.split(' ')
        players[name] = {health, bullets}
    }

    let commandInfo = input.shift()

    while (commandInfo != "Ride Off Into Sunset") {
        let command = commandInfo.split(' - ')[0]
        let playerName = commandInfo.split(' - ')[1]

        switch (command) {
            case 'FireShot':
                let target = commandInfo.split(' - ')[2]

                if (players[playerName].bullets < 1) {
                    console.log(`${playerName} doesn't have enough bullets to shoot at ${target}!`);
                    break
                }
                players[playerName].bullets -= 1
                console.log(`${playerName} has successfully hit ${target} and now has ${players[playerName].bullets} bullets!`);

                break;

            case 'TakeHit':
                let damage = Number(commandInfo.split(' - ')[2])
                let attacker = commandInfo.split(' - ')[3]

                if (players[playerName].health <= damage) {
                    delete players[playerName]
                    console.log(`${playerName} was gunned down by ${attacker}!`);
                    break
                }
                players[playerName].health -= damage
                console.log(`${playerName} took a hit for ${damage} HP from ${attacker} and now has ${players[playerName].health} HP!`);

                break;

            case 'Reload':
                let currentBullets = Number(players[playerName].bullets)
                if (currentBullets >= 6) {
                    console.log(`${playerName}'s pistol is fully loaded!`);
                    break
                }
                let difference = 6 - currentBullets
                players[playerName].bullets = 6
                console.log(`${playerName} reloaded ${difference} bullets!`);
                break;

            case 'PatchUp':
                let amount = Number(commandInfo.split(' - ')[2])

                if (players[playerName].health === 100) {
                    console.log(`${playerName} is in full health!`);
                    break
                }

                let currentHealth = players[playerName].health + amount
                if (currentHealth > 100) {
                    let hpDifference = 100 - players[playerName].health
                    players[playerName].health = 100
                    console.log(`${playerName} patched up and recovered ${hpDifference} HP!`);
                }
                else {
                    players[playerName].health += amount
                    console.log(`${playerName} patched up and recovered ${amount} HP!`);
                }

                
                break;
        }

        commandInfo = input.shift()
    }

    if (players) {
        Object.entries(players).forEach(element => {
            console.log(`${element[0]}\n HP: ${element[1].health}\n Bullets: ${element[1].bullets}`)
        })
    }
}

solve((["2",
"Gus 100 0",
"Walt 100 6",
"TakeHit - Gus - 100 - Bandit",
"TakeHit - Walt - 100 - Bandit",
"Ride Off Into Sunset"]))
