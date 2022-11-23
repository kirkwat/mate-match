const knex = require('../database/knex');
const USERS_TABLE = 'users';
const PREFERENCES_TABLE = 'preferences';

const fetchMatches = async (email) => {

    //get user
    const userQuery = knex(USERS_TABLE).where({ email: email });
    const user = await userQuery;

    //get a list of people that match the user's desired gender and city
    var matches;
    if (user[0].desired_gender == "Either"){
        const matchesQuery = knex.select('email').from(USERS_TABLE).where({ city: user[0].city });
        matches = await matchesQuery;
    } else {
        const matchesQuery = knex.select('email').from(USERS_TABLE).where(
        { gender: user[0].desired_gender } && { city: user[0].city });
        matches = await matchesQuery;
    }

    //get the user's preferences
    const userPrefQuery = knex(PREFERENCES_TABLE).where({ email: user[0].email });
    origPref = await userPrefQuery;

    //create an array of preferences
    const matchesPref  = [];

    //add the user's preferences
    matchesPref.push(origPref);

    //add the matches' preferences
    for (const match of matches){
        if (user[0].email != match.email){
            const prefQuery = knex(PREFERENCES_TABLE).where({ email: match.email });
            matchPref = await prefQuery;
            //console.log(matchPref);
            matchesPref.push(matchPref);
        }
    }

    //parse the preferences into an array of number values based on the relatedness of answers
    //list of answers and their associated values found here:
    //https://docs.google.com/spreadsheets/d/177mDgET-sa2-NLeWm5a2Jxwri0BIY03eAWz5kB9gqTU/edit?usp=sharing
    const parsedPref = parsePreferences(matchesPref);

    //sort the parsed preference list by correlation to the user
    const sortedList = [];

    for (const person of parsedPref){
        //ensure the person is not the user themself
        if (parsedPref[0] != person){

            //calculate the correlation between the person's preferences and the user's
            var cor = correlation(parsedPref[0].valArray, person.valArray);

            //ensure the returned correlation value is a valid number
            if (!isNaN(cor))
                sortedList.push({email: person.email, value: cor})
        }
    }

    //sort the list by correlation value
    sortedList.sort((a, b) => a.value - b.value);

    //use the sorted emails to create a sorted list of matches to be returned
    const finalSortedUserList = [];
    for (const person of sortedList){
        const finalQuery = knex(USERS_TABLE).where({ email: person.email });
        const user = await finalQuery;
        finalSortedUserList.push(user[0]);
    }

    //returns a JSON object with sorted matches
    return finalSortedUserList;
}

function parsePreferences(matchesPref){
    //parse the preferences into an array of number values based on the relatedness of answers
    //list of answers and their associated values found here:
    //https://docs.google.com/spreadsheets/d/177mDgET-sa2-NLeWm5a2Jxwri0BIY03eAWz5kB9gqTU/edit?usp=sharing
    
    const parsedPref  = [];

    //all answers 1-4 except for smoking, which is weighted more and thus is worth 5, 7, or 9
    let hashMap = new Map([
        ["Do Everything Together", 1],["Friend", 2],["Coexist", 3],
        ["Morning Seeking Morning", 1],["Morning Seeking Both", 2],["Night Seeking Both", 3],["Night Seeking Night", 4],
        ["Once Per Week", 1],["Three Per Week", 2],["Five Per Weeks", 3],["Every Day", 4],
        ["Hang Out", 1], ["Relax", 2], ["Study", 3], ["Rarely Use Space", 4],
        ["Quiet", 1], ["Some Noise", 2], ["Any Noise", 3], ["Much Noise", 4],
        ["Smoke Daily", 5], ["Smoke Occasionally", 7], ["No Smoke", 9],
        ["Very Clean", 1], ["Clean", 2], ["Indifferent", 3], ["Messy", 4],
        ["Cold", 1], ["Fairly Cold", 2], ["Fairly Warm", 3], ["Warm", 4],
        ["Share Everything", 1], ["Share Occasionally", 2], ["No Share", 3],
        ["Have Pet", 1], ["Fine With Pet", 2], ["No Pet", 3]
    ]);

    //loop through preferences of all matches
    for (const outerArray of matchesPref){
        for (const person of outerArray){

            //create an individual's array of associated answer values
            const individualParsedPref  = [];

            //loop through all attributes
            for (const attribute in person){

                //search for the answer in the hashMap
                if (hashMap.has(person[attribute])){

                    //if it exists, push its associated value
                    individualParsedPref.push(hashMap.get(person[attribute]));

                } else if (attribute != 'email') individualParsedPref.push(0); //if not, push 0  
            }
            //push an object with the individual's email and their parsed preference array `valArray`
            parsedPref.push({email: person.email, valArray: individualParsedPref});
        }
    }

    //return array of all parsed preference objects
    return parsedPref;
}
 
function correlation(arrX, arrY) {
    //calculate the correlation between the person's preferences and the user's
    //uses the standard formula for correlation coefficient
    //code sources:
    //https://stackoverflow.com/questions/28428365/how-to-find-correlation-between-two-integer-arrays-in-java
    //https://www.geeksforgeeks.org/program-find-correlation-coefficient/
 
    if (arrX.length != arrY.length || arrX.length < 1) return NaN;
 
    let sumX = 0.0;
    let sumY = 0.0;
    let sumXY = 0.0;
    let squareSumX = 0.0;
    let squareSumY = 0.0;
 
    let n = arrX.length;
 
    for (let i = 0; i < n; i++){
       let x = arrX[i];
       let y = arrY[i];
 
       sumX += x;
       sumY += y;
       squareSumX += x * x;
       squareSumY += y * y;
       sumXY += x * y;
    }
 
    //covariation
    let cov = sumXY / n - sumX * sumY / n / n;
    //standard error of x
    let sigmax = Math.sqrt(squareSumX / n -  sumX * sumX / n / n);
    //standard error of y
    let sigmay = Math.sqrt(squareSumY / n -  sumY * sumY / n / n);
 
    //correlation is just a normalized covariation
    return cov / sigmax / sigmay;
}
 
module.exports = {
   fetchMatches
}
