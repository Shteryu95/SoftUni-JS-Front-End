function solve(input) {
    const baristasNum = input.shift()
    const baristas = {}

    for (let i=0; i < baristasNum; i++){
        let[name, shift, coffee] = input.shift().split(' ')
        baristas[name] = {shift, coffee: coffee.split(',')}
    }

    let commandInfo = input.shift()

    while (commandInfo != 'Closed') {
        let command = commandInfo.split(' / ')[0]
        let baristaName = commandInfo.split(' / ')[1]

        switch (command) {
            case 'Prepare':
                let baristaShift = commandInfo.split(' / ')[2]
                let baristaCoffee = commandInfo.split(' / ')[3]

                if (baristas[baristaName].shift === baristaShift && baristas[baristaName].coffee.includes(baristaCoffee)) {
                    console.log(`${baristaName} has prepared a ${baristaCoffee} for you!`);
                }
                else {
                    console.log(`${baristaName} is not available to prepare a ${baristaCoffee}.`);
                }
                break;

            case 'Change Shift':
                let newShift = commandInfo.split(' / ')[2]
                baristas[baristaName].shift = newShift
                console.log(`${baristaName} has updated his shift to: ${newShift}`);
                break;

            case 'Learn':
                let newCoffee = commandInfo.split(' / ')[2]
                if (baristas[baristaName].coffee.includes(newCoffee)) {
                    console.log(`${baristaName} knows how to make ${newCoffee}.`);
                }
                else {
                    baristas[baristaName].coffee.push(newCoffee)
                    console.log(`${baristaName} has learned a new coffee type: ${newCoffee}.`);
                }
                break;
        }
        commandInfo = input.shift()
    }
    Object.keys(baristas).forEach((key) => {
        console.log(`Barista: ${key}, Shift: ${baristas[key].shift}, Drinks: ${baristas[key].coffee.join(', ')}`);
    })
}

solve([
    '3',
      'Alice day Espresso,Cappuccino',
      'Bob night Latte,Mocha',
      'Carol day Americano,Mocha',
      'Prepare / Alice / day / Espresso',
      'Change Shift / Bob / night',
      'Learn / Carol / Latte',
      'Learn / Bob / Latte',
      'Prepare / Bob / night / Latte',
      'Closed']
    )