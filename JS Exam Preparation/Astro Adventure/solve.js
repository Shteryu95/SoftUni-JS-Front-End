function solve(input) {
    const astroNum = input.shift()
    const astronauts = {}

    for (let i=0; i < astroNum; i++) {
        const currentAstro = input.shift()
        let [name, oxygen, reserve] = currentAstro.split(' ')
        astronauts[name] = {oxygen, reserve}
    }

    let commandInput = input.shift()

    while (commandInput != 'End') {
        let [command, astrName, amount] = commandInput.split(' - ')

        switch (command) {
            case 'Explore':
                let currentAmount = astronauts[astrName].reserve
                if (Number(currentAmount) < Number(amount)) {
                    console.log(`${astrName} does not have enough energy to explore!`);
                    break
                }
                let reserveLeft = astronauts[astrName].reserve -= Number(amount)
                console.log(`${astrName} has successfully explored a new area and now has ${reserveLeft} energy!`);
                break;

            case 'Refuel':
                let currentAstroAmount = astronauts[astrName].reserve
                let refuelReserve = Number(currentAstroAmount) + Number(amount)

                if (refuelReserve > 200) {
                    refuelReserve = 200
                }
                astronauts[astrName].reserve = refuelReserve
                let refuelDifference = refuelReserve - currentAstroAmount
                
                console.log(`${astrName} refueled their energy by ${refuelDifference}!`);
                break;

            case 'Breathe':
                let currentAstroOxygen = astronauts[astrName].oxygen
                let refuelOxygen = Number(currentAstroOxygen) + Number(amount)

                if (refuelOxygen > 100) {
                    refuelOxygen = 100
                }
                astronauts[astrName].oxygen = refuelOxygen
                let refuelOxygenDifference = refuelOxygen - currentAstroOxygen
                console.log(`${astrName} took a breath and recovered ${refuelOxygenDifference} oxygen!`);
                break;
        }

        commandInput = input.shift()
    }

    Object.entries(astronauts).forEach(astro => {
        console.log(`Astronaut: ${astro[0]}, Oxygen: ${astro[1].oxygen}, Energy: ${astro[1].reserve}`);
    })
}

solve([    '4',
'Alice 60 100',
'Bob 40 80',
'Charlie 70 150',
'Dave 80 180',
'Explore - Bob - 60',
'Refuel - Alice - 30',
'Breathe - Charlie - 50',
'Refuel - Dave - 40',
'Explore - Bob - 40',
'Breathe - Charlie - 30',
'Explore - Alice - 40',
'End']
)