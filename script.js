var readline = require("readline");
var fs = require("fs");
//for crime OVER $500
var over$500 = new Array(16).fill(0);
//for crime under $500
var under$500 = new Array(16).fill(0);
//year
var year = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016];
//assault_arrested
var arrested = new Array(16).fill(0);
//assault_not_arrested
var notArrested = new Array(16).fill(0);
//json file
var json1 = [];
var json2 = [];
//creating readline interface
const rl = readline.createInterface({
	input: fs.createReadStream('../csv/crimedata.csv')
});
rl.on('line', function(line) {
	let data = line.split(new RegExp(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
	switch (data[6]) {
		case 'OVER $500':
			for (let index = 0, year = 2001; index < 16, year < 2017; index++, year++) {
				//upgrade the counter for every year found respectively
				if (data[17] == year) {
					over$500[index]++;
					break;
				}
			}
			break;
		case '$500 AND UNDER':
			for (let index = 0, year = 2001; index < 16, year < 2017; index++, year++) {
				//upgrade the counter for every year found respectively
				if (data[17] == year) {
					under$500[index]++;
					break;
				}
			}
	}

	if (data[5] == 'ASSAULT') {
		if (data[8] == 'true') {
			for (let index = 0, year = 2001; index < 16, year < 2017; index++, year++) {
				//upgrade the counter for every year found respectively
				if (data[17] == year) {
					arrested[index]++;
					break;
				}
			}
		} else if (data[8] == 'false') {
			for (let index = 0, year = 2001; index < 16, year < 2017; index++, year++) {
				//upgrade the counter for every year found respectively
				if (data[17] == year) {
					notArrested[index]++;
					break;
				}
			}
		}
	}
});

rl.on('close', function() {
	for (let i = 0; i < 16; i++) {
		//creating a temp object to store the counter's data
		let temp = {};
		temp.year = year[i];
		temp.over$500 = over$500[i];
		temp.under$500 = under$500[i];
		temp.total = over$500[i] + under$500[i];
		json1.push(temp);
	}
	for (let j = 0; j < 16; j++) {
		//creating a temp object to store the counter's data
		let temp = {};
		temp.year = year[j];
		temp.arrested = arrested[j];
		temp.notArrested = notArrested[j];
		json2.push(temp);
	}
	createFile(json1, '/workspace/courses/javascript_assignment/crime1.json');
	createFile(json2, '/workspace/courses/javascript_assignment/crime2.json');
});


function createFile(content, name) {
	fs.writeFile(name, JSON.stringify(content), function(err) {
		if (err) {
			console.log('ERROR !!! ' + err);
		} else {
			console.log('File created succussfully!!!');
		}
	});
}